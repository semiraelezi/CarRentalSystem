import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
  useTheme,
  Paper,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TimelineIcon from '@mui/icons-material/Timeline';

export default function AboutUs() {
  const theme = useTheme();

  return (
    <Box sx={{ background: '#f5f8fd', minHeight: '100vh', pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #1565c0 60%, #1976d2 100%)',
          color: '#fff',
          py: { xs: 6, md: 10 },
          mb: 6,
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          boxShadow: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.8rem' },
              letterSpacing: 1,
            }}
          >
            Discover CarRental Macedonia
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              opacity: 0.9,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
            }}
          >
            Leading the way in premium car rental services across Macedonia since 2015. Modern fleet, local expertise, and a passion for journeys.
          </Typography>
        </Container>
      </Box>

      {/* Company History Timeline */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, background: '#e3f0fb' }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <TimelineIcon color="primary" fontSize="large" />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1565c0' }}>
              Our Journey
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ color: '#1976d2', fontWeight: 600 }}>
                2015
              </Typography>
              <Typography variant="body2">
                Founded in Skopje with a handful of vehicles and a vision to make travel in Macedonia easy and enjoyable.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ color: '#1976d2', fontWeight: 600 }}>
                2018
              </Typography>
              <Typography variant="body2">
                Expanded our fleet and opened branches in Ohrid and Bitola, serving tourists and locals nationwide.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ color: '#1976d2', fontWeight: 600 }}>
                2023
              </Typography>
              <Typography variant="body2">
                Introduced online booking, eco-friendly vehicles, and 24/7 multilingual support for a seamless experience.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Values Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: '#1565c0',
            mb: 3,
            textAlign: 'center',
            letterSpacing: 1,
          }}
        >
          What Sets Us Apart
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                textAlign: 'center',
                py: 4,
                px: 2,
                background: '#fff',
                height: '100%',
              }}
            >
              <Avatar sx={{ bgcolor: '#1565c0', width: 56, height: 56, mb: 2, mx: 'auto' }}>
                <DirectionsCarIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Modern Fleet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                From city compacts to luxury SUVs, all our vehicles are new, clean, and regularly serviced.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                textAlign: 'center',
                py: 4,
                px: 2,
                background: '#fff',
                height: '100%',
              }}
            >
              <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56, mb: 2, mx: 'auto' }}>
                <EmojiEventsIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Transparent Pricing
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No hidden fees. Clear, upfront rates and flexible rental options for every budget.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                textAlign: 'center',
                py: 4,
                px: 2,
                background: '#fff',
                height: '100%',
              }}
            >
              <Avatar sx={{ bgcolor: '#2196f3', width: 56, height: 56, mb: 2, mx: 'auto' }}>
                <SupportAgentIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Local Experts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our team knows Macedonia. Get travel tips, route advice, and 24/7 support in your language.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Closing Statement */}
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            background: '#1565c0',
            color: '#fff',
            borderRadius: 3,
            py: 4,
            px: { xs: 2, md: 6 },
            textAlign: 'center',
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Thank you for choosing CarRental Macedonia!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.95 }}>
            Whether it’s a business trip, family vacation, or weekend adventure, we’re here to make your journey smooth, safe, and memorable.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
