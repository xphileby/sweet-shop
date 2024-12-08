import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

interface Feedback {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/feedback`);
      setFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/feedback/${id}/read`);
      fetchFeedback();
    } catch (error) {
      console.error('Error marking feedback as read:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/feedback/${id}`);
        fetchFeedback();
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  const handleOpen = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeedback(null);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Feedback Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedback.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.is_read ? 'Read' : 'Unread'}
                    color={item.is_read ? 'default' : 'primary'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpen(item)}
                    color="primary"
                    title="View"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {!item.is_read && (
                    <IconButton
                      onClick={() => handleMarkAsRead(item.id)}
                      color="primary"
                      title="Mark as read"
                    >
                      <MarkEmailReadIcon />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    color="error"
                    title="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Feedback Details</DialogTitle>
        <DialogContent>
          {selectedFeedback && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                From: {selectedFeedback.name}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Email: {selectedFeedback.email}
              </Typography>
              {selectedFeedback.phone && (
                <Typography variant="subtitle2" gutterBottom>
                  Phone: {selectedFeedback.phone}
                </Typography>
              )}
              <Typography variant="subtitle2" gutterBottom>
                Date: {new Date(selectedFeedback.created_at).toLocaleString()}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Message:
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {selectedFeedback.message}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {selectedFeedback && !selectedFeedback.is_read && (
            <Button
              onClick={() => {
                handleMarkAsRead(selectedFeedback.id);
                handleClose();
              }}
              color="primary"
            >
              Mark as Read
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedbackManagement;