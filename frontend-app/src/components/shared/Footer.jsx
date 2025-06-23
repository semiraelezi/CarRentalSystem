// Footer.js
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#1565c0', color: '#fff', py: 6, mt: 8 }} component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              CarRentalSystem
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Premium car rental services in Macedonia. Reliable, affordable, and convenient.
            </Typography>
            <Box>
              <IconButton href="#" sx={{ color: '#fff' }} aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: '#fff' }} aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: '#fff' }} aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: '#fff' }} aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" underline="hover" sx={{ color: '#fff', mb: 1 }}>
                Home
              </Link>
              <Link href="/rent" underline="hover" sx={{ color: '#fff', mb: 1 }}>
                Rent a Car
              </Link>
              <Link href="/about" underline="hover" sx={{ color: '#fff', mb: 1 }}>
                About Us
              </Link>
              
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Address: 123 Main Street, Skopje, Macedonia
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +389 70 123 456
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: info@carrentalsystem.com
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4, fontSize: 14, opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} CarRentalSystem. All rights reserved.
        </Box>
      </Container>
    </Box>
  );
}
