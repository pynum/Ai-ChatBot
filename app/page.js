'use client';
import { Box, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Custom dark and modern theme
const theme = createTheme({
  typography: {
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      color: '#ffffff',
      textShadow: '4px 4px 8px rgba(0,0,0,0.7)',
    },
    h5: {
      fontSize: '1.5rem',
      color: '#B0B0B0',
      textShadow: '2px 2px 6px rgba(0,0,0,0.5)',
    },
  },
  palette: {
    primary: {
      main: '#FF6F61',
    },
    secondary: {
      main: '#FF9A8B',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

export default function LandingPage() {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)', 
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: '-100vw', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
            >
              <Card 
                sx={{ 
                  padding: 4, 
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)', 
                  backgroundColor: 'rgba(30, 30, 30, 0.85)', 
                  borderRadius: '20px',
                }}
              >
                <CardContent>
                  <Typography variant="h1" align="center" gutterBottom>
                    AI Customer Support
                  </Typography>
                  <Typography variant="h5" align="center" gutterBottom>
                    Welcome to Our App
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      backgroundColor: '#FF6F61', 
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor: '#FF8566',
                      },
                    }}
                    onClick={() => router.push('/login')}
                  >
                    LOGIN
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{
                      borderColor: '#FF6F61',
                      color: '#FF6F61',
                      '&:hover': {
                        borderColor: '#FF8566',
                        color: '#FF8566',
                      },
                    }}
                    onClick={() => router.push('/signup')}
                  >
                    SIGN UP
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
