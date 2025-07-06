const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Google OAuth fields
  googleId: { 
    type: String, 
    sparse: true,
    unique: true 
  },
  
  // Regular authentication fields
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String,
    minlength: 6
  },
  name: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  avatar: String,
  
  // Additional user fields
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    },
    notifications: {
      type: Boolean,
      default: true
    }
  }
}, { 
  timestamps: true 
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });

// Virtual for checking if user has password
userSchema.virtual('hasPassword').get(function() {
  return !!this.password;
});

// Method to get public profile (without sensitive data)
userSchema.methods.toPublicJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.googleId;
  return user;
};

module.exports = mongoose.model('User', userSchema);
