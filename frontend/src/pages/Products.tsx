import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const drawerWidth = 240;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '64px',
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemText primary="Categories" primaryTypographyProps={{ variant: 'h6' }} />
            </ListItem>
            <Divider />
            {categories.map((category) => (
              <ListItem
                button
                key={category.id}
                component={RouterLink}
                to={`/products?category=${category.slug}`}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px` }}
      >
        <Container>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image_url || 'https://source.unsplash.com/random/?chocolate'}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description.substring(0, 100)}...
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={RouterLink}
                      to={`/products/${product.slug}`}
                    >
                      View Details
                    </Button>
                    <Button size="small" color="primary">
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Products;