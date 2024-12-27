import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Submitted',
    enum: ['Submitted', 'Contacted', 'In Progress', 'Resolved'],
  },
  adminResponse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminResponse',
  },
});

export const Contact = mongoose.model('Contact', contactSchema);











const adminResponseSchema = new mongoose.Schema({
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
  },
  response: {
    type: String,
  },
  receiveNotifications: {
    type: Boolean,
    default: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const AdminResponse = mongoose.model('AdminResponse', adminResponseSchema);
