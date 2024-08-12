'use client';
import { Box, Stack, Typography, Fade, Zoom, Container, IconButton, Select, MenuItem } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import TypingIndicator from '../components/TypingIndicator';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('');
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        if (!language) {
          setMessages([
            {
              role: 'assistant',
              content: "Welcome! Please select your preferred language.",
            },
          ]);
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const updatedMessages = [
      ...messages,
      { role: 'user', content: message },
    ];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      let assistantMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantMessage += new TextDecoder().decode(value);
      }

      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: assistantMessage },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: `I'm sorry, but I encountered an error: ${error.message}. Please try again later.` },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setMessages([
      {
        role: 'assistant',
        content: `Great! I'll communicate in ${event.target.value}. How can I help you today?`,
      },
    ]);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Fade in={true} timeout={800}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: '#1F1B24',
          overflow: 'hidden',
        }}
      >
        <Zoom in={true} timeout={600}>
          <Container maxWidth="lg" sx={{ height: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
              height="100%"
              width="100%"
              borderRadius={6}
              boxShadow="0 10px 30px rgba(0,0,0,0.3)"
              overflow="hidden"
              sx={{
                backdropFilter: 'blur(15px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent light overlay
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Stack
                direction="column"
                height="100%"
                p={4}
                spacing={3}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                  <Box display="flex" alignItems="center">
                    <SupportAgentIcon sx={{ fontSize: 42, color: '#FF4081', mr: 2 }} />
                    <Typography variant="h4" color="#FFFFFF" fontWeight="bold">
                      Support Bot
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    {!language && (
                      <Select
                        value={language}
                        onChange={handleLanguageChange}
                        displayEmpty
                        sx={{ mr: 2, color: '#FFFFFF', '& .MuiSelect-icon': { color: '#FF4081' } }}
                      >
                        <MenuItem value="" disabled>Select Language</MenuItem>
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="Spanish">Spanish</MenuItem>
                        <MenuItem value="French">French</MenuItem>
                      </Select>
                    )}
                    <IconButton onClick={handleLogout} sx={{ color: '#FF4081' }}>
                      <LogoutIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Stack
                  direction="column"
                  spacing={3}
                  flexGrow={1}
                  sx={{
                    overflowY: 'auto',
                    pr: 1,
                    pl: 1,
                  }}
                >
                  {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </Stack>
                <ChatInput onSendMessage={handleSendMessage} />
              </Stack>
            </Box>
          </Container>
        </Zoom>
      </Box>
    </Fade>
  );
}
