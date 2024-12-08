import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  TextField,
} from '@mui/material';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${slug}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (!product) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3}>
        <Grid container spacing={4} sx={{ p: 4 }}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image_url || 'https://source.unsplash.com/random/?chocolate'}
              alt={product.name}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Stock: {product.stock} available
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <TextField
                  type="number"
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                  InputProps={{ inputProps: { min: 1, max: product.stock } }}
                  size="small"
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetail;