import Link from 'next/link';
import {
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';

export default function About() {
  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Typography
          variant='h2'
          component='h1'
          gutterBottom
        >
          About Us
        </Typography>
        <Typography
          variant='h5'
          color='text.secondary'
          paragraph
        >
          This is the about page of our
          application.
        </Typography>
        <Button
          component={Link}
          href='/'
          variant='contained'
          size='large'
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
