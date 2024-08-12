import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (isLoading || !message.trim()) return;
    setIsLoading(true);
    await onSendMessage(message);
    setMessage('');
    setIsLoading(false);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            },
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: 'white',
            padding: '12px 18px',
          },
          '& .MuiInputPlaceholder-root': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
        }}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={isLoading}
        sx={{
          backgroundColor: '#FF4081',
          '&:hover': {
            backgroundColor: '#E91E63',
          },
          width: '45px',
          height: '45px',
        }}
      >
        {isLoading ? <CircularProgress size={22} color="inherit" /> : <SendIcon />}
      </IconButton>
    </Box>
  );
}
