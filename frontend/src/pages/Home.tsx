import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
} from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random/?chocolate,cake)',
          height: '400px',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Welcome to Sweet Shop
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Discover our delicious homemade chocolates and cakes
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="/products"
                size="large"
              >
                Shop Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Container>
        <Typography variant="h4" gutterBottom align="center">
          Featured Categories
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Chocolates</Typography>
              <Button component={RouterLink} to="/products?category=chocolates">
                View All
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Cakes</Typography>
              <Button component={RouterLink} to="/products?category=cakes">
                View All
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Seasonal Specials</Typography>
              <Button component={RouterLink} to="/products?category=seasonal">
                View All
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;