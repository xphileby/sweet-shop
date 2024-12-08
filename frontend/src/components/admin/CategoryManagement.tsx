import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  description: string;
  parent_id: number | null;
}

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parent_id: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleOpen = (category?: Category) => {
    if (category) {
      setSelectedCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        parent_id: category.parent_id?.toString() || '',
      });
    } else {
      setSelectedCategory(null);
      setFormData({
        name: '',
        description: '',
        parent_id: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = {
        ...formData,
        parent_id: formData.parent_id ? parseInt(formData.parent_id) : null,
      };

      if (selectedCategory) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/categories/${selectedCategory.id}`,
          data
        );
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/categories`, data);
      }

      handleClose();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Category Management</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Parent Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  {categories.find((c) => c.id === category.parent_id)?.name || '-'}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(category)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(category.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedCategory ? 'Edit Category' : 'Add Category'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Parent Category</InputLabel>
              <Select
                name="parent_id"
                value={formData.parent_id}
                onChange={handleChange}
                label="Parent Category"
              >
                <MenuItem value="">None</MenuItem>
                {categories
                  .filter((c) => c.id !== selectedCategory?.id)
                  .map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;