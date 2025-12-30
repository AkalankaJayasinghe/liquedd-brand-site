// Contact service for handling contact form submissions
class ContactService {
  constructor() {
    this.baseURL = '/api';
  }

  // Simulate API delay
  async delay(ms = 800) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Submit contact form
  async submitContactForm(formData) {
    try {
      // Validate required fields
      this.validateContactForm(formData);

      // Map frontend field names to backend field names
      const requestData = {
        name: formData.fullName || formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      };

      const response = await fetch(`${this.baseURL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to send message`);
      }

      return {
        success: true,
        message: data.message || 'Thank you for your message! We\'ll get back to you within 24 hours.',
        submissionId: data.messageId
      };
    } catch (error) {
      console.error('Contact form error:', error);
      throw new Error(error.message || 'Failed to send message. Please try again.');
    }
  }

  // Validate contact form data
  validateContactForm(formData) {
    const errors = [];

    if (!formData.fullName?.trim()) {
      errors.push('Full name is required');
    }

    if (!formData.email?.trim()) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!formData.subject?.trim()) {
      errors.push('Subject is required');
    }

    if (!formData.message?.trim()) {
      errors.push('Message is required');
    } else if (formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    if (errors.length > 0) {
      throw new Error(errors.join('. '));
    }
  }

  // Email validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Get contact information
  async getContactInfo() {
    await this.delay(200);

    // In production: await fetch(`${this.baseURL}/contact/info`)
    
    return {
      company: 'Liquedd',
      address: {
        street: '123 Beverage Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      phone: '+1 (555) 123-4567',
      email: 'contact@liquedd.com',
      businessHours: {
        weekdays: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      social: {
        facebook: 'https://facebook.com/liquedd',
        instagram: 'https://instagram.com/liquedd',
        twitter: 'https://twitter.com/liquedd',
        linkedin: 'https://linkedin.com/company/liquedd'
      }
    };
  }

  // Subscribe to newsletter
  async subscribeToNewsletter(email) {
    await this.delay(600);

    try {
      // Validate email
      if (!this.isValidEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      // In production: await fetch(`${this.baseURL}/newsletter/subscribe`, { ... })
      
      console.log('Newsletter subscription:', email);
      
      return {
        success: true,
        message: 'Successfully subscribed to our newsletter!'
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to subscribe to newsletter');
    }
  }

  // Report a problem or feedback
  async reportFeedback(feedbackData) {
    await this.delay(700);

    try {
      // In production: await fetch(`${this.baseURL}/feedback`, { ... })
      
      console.log('Feedback reported:', feedbackData);
      
      return {
        success: true,
        message: 'Thank you for your feedback!',
        ticketId: `feedback_${Date.now()}`
      };
    } catch (error) {
      throw new Error('Failed to submit feedback: ' + error.message);
    }
  }
}

// Create and export a singleton instance
export const contactService = new ContactService();
export default ContactService;