'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Snackbar, IconButton, InputAdornment, CircularProgress, Card, CardContent, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom dark theme
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h5: {
      fontSize: '1.6rem',
      color: '#E0E0E0',
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
    },
  },
  palette: {
    primary: {
      main: '#BB86FC',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push('/chat');
      }, 2000);
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: 'linear-gradient(135deg, #333 0%, #000 100%)',
        }}
      >
        <Card 
          sx={{ 
            width: '100%', 
            maxWidth: 400, 
            backgroundColor: 'rgba(30, 30, 30, 0.85)', 
            borderRadius: '12px', 
            padding: 3 
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              🚀 Login
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#E0E0E0',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#BB86FC',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff sx={{ color: '#BB86FC' }} /> : <Visibility sx={{ color: '#BB86FC' }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#E0E0E0',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#BB86FC',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  backgroundColor: '#BB86FC', 
                  color: '#121212', 
                  '&:hover': { backgroundColor: '#AA76FC' } 
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Login '}
              </Button>
              <Typography variant="body2" align="center" color="rgba(255, 255, 255, 0.7)">
                Don&apos;t have an account?{' '}
                <Button color="primary" onClick={() => router.push('/signup')}>
                  Sign Up
                </Button>
              </Typography>
            </form>
          </CardContent>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message="Login successful! Redirecting..."
          />
        </Card>
      </Box>
    </ThemeProvider>
  );
}
