import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

const Cart = () => {
  const [cartItems] = React.useState<CartItem[]>([]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" align="center">
          Your cart is empty
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
                    {item.name}
                  </Box>
                </TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton size="small">
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                    <IconButton size="small">
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="h6">Total</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">${calculateTotal().toFixed(2)}</Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" size="large">
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;