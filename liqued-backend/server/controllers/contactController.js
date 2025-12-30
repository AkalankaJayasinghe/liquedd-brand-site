const db = require('../config/database');

const contactController = {
  // Submit contact form
  submitContact: async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validate input
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
      }

      // Insert contact message into database
      const [result] = await db.execute(
        'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject || 'No Subject', message]
      );

      res.status(201).json({
        message: 'Contact message sent successfully',
        messageId: result.insertId
      });
    } catch (error) {
      console.error('Submit contact error:', error);
      res.status(500).json({ error: 'Server error submitting contact form' });
    }
  },

  // Get all contact messages (admin only)
  getAllMessages: async (req, res) => {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM contact_messages ORDER BY created_at DESC'
      );

      res.json({ messages: rows });
    } catch (error) {
      console.error('Get messages error:', error);
      res.status(500).json({ error: 'Server error fetching messages' });
    }
  },

  // Get single message by ID (admin only)
  getMessageById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const [rows] = await db.execute(
        'SELECT * FROM contact_messages WHERE id = ?',
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Message not found' });
      }

      res.json({ message: rows[0] });
    } catch (error) {
      console.error('Get message error:', error);
      res.status(500).json({ error: 'Server error fetching message' });
    }
  },

  // Mark message as read (admin only)
  markAsRead: async (req, res) => {
    try {
      const { id } = req.params;

      const [result] = await db.execute(
        'UPDATE contact_messages SET is_read = 1 WHERE id = ?',
        [id]
      );

      if (result.affectedRows > 0) {
        res.json({ message: 'Message marked as read' });
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      console.error('Mark as read error:', error);
      res.status(500).json({ error: 'Server error updating message' });
    }
  },

  // Delete message (admin only)
  deleteMessage: async (req, res) => {
    try {
      const { id } = req.params;

      const [result] = await db.execute(
        'DELETE FROM contact_messages WHERE id = ?',
        [id]
      );

      if (result.affectedRows > 0) {
        res.json({ message: 'Message deleted successfully' });
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      console.error('Delete message error:', error);
      res.status(500).json({ error: 'Server error deleting message' });
    }
  }
};

module.exports = contactController;
