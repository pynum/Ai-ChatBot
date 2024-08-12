import { Box, Grow, Paper, Typography } from '@mui/material';
import MarkdownRenderer from './MarkdownRenderer';
import { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function ChatMessage({ message }) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  return (
    <Grow in={inView} timeout={500}>
      <Box
        display="flex"
        justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
        mb={2}
        alignItems="flex-end"
      >
        {message.role === 'assistant' && (
          <SmartToyIcon sx={{ color: '#FF4081', mr: 1, mb: 1 }} />
        )}
        <Paper
          elevation={3}
          sx={{
            maxWidth: '75%',
            padding: '14px 18px',
            borderRadius: '18px',
            backgroundColor: message.role === 'assistant' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(76, 175, 80, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: message.role === 'assistant' ? 'rgba(33, 150, 243, 0.3)' : 'rgba(76, 175, 80, 0.3)',
          }}
        >
          <Typography
            component="div"
            sx={{
              color: 'white',
              '& a': {
                color: '#4caf50',
                textDecoration: 'underline',
              },
            }}
          >
            <MarkdownRenderer>{message.content}</MarkdownRenderer>
          </Typography>
        </Paper>
        {message.role === 'user' && (
          <PersonIcon sx={{ color: '#4caf50', ml: 1, mb: 1 }} />
        )}
      </Box>
    </Grow>
  );
}
