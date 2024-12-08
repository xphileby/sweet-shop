import React from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import MessageIcon from '@mui/icons-material/Message';
import ProductManagement from '../components/admin/ProductManagement';
import CategoryManagement from '../components/admin/CategoryManagement';
import FeedbackManagement from '../components/admin/FeedbackManagement';

const Admin = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Admin Dashboard
            </Typography>
            <List>
              <ListItem button component={RouterLink} to="/admin/products">
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>
              <ListItem button component={RouterLink} to="/admin/categories">
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
              <ListItem button component={RouterLink} to="/admin/feedback">
                <ListItemIcon>
                  <MessageIcon />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2 }}>
            <Routes>
              <Route path="products" element={<ProductManagement />} />
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="feedback" element={<FeedbackManagement />} />
              <Route
                path="/"
                element={
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h5" gutterBottom>
                      Welcome to Admin Dashboard
                    </Typography>
                    <Typography>
                      Select a section from the menu to manage your shop.
                    </Typography>
                  </Box>
                }
              />
            </Routes>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;