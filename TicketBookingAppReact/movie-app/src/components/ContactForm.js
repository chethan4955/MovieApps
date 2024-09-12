import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Importing Formik components
import * as Yup from 'yup'; // Yup for validation schema
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap for styling

// Define the validation schema using Yup
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Name must be at least 4 characters') // Name must be at least 4 characters
    .matches(/^[a-zA-Z\s]+$/, 'Name must not contain numbers or special characters') // Regex to ensure no numbers or special characters
    .required('Name is required'), // Name is required
  email: Yup.string()
    .email('Invalid email') // Valid email format check
    .required('Email is required'), // Email is required
  subject: Yup.string()
    .max(50, 'Subject cannot exceed 50 characters'), // Subject is optional but cannot exceed 50 characters
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters') // Message must be at least 10 characters
    .required('Message is required'), // Message is required
});

const ContactForm = () => {
  return (
    <div className="container">
      <h1>Contact Us</h1>
      {/* Formik component to manage form state and validation */}
      <Formik
        initialValues={{ name: '', email: '', subject: '', message: '' }} // Initial values of the form fields
        validationSchema={ContactSchema} // Validation schema for form fields
        onSubmit={(values, { resetForm }) => {
          console.log(values); // Log the form values when the form is submitted
          alert('Form Submitted Successfully!'); // Display a success message
          resetForm(); // Reset the form after submission
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Formik Field component for the "Name" input */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <Field type="text" name="name" className="form-control" /> {/* Field is used for input with binding */}
              <ErrorMessage name="name" component="div" className="text-danger" /> {/* Error message if validation fails */}
            </div>

            {/* Formik Field component for the "Email" input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" /> {/* Error message for email */}
            </div>

            {/* Formik Field component for the "Subject" input */}
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <Field type="text" name="subject" className="form-control" />
              <ErrorMessage name="subject" component="div" className="text-danger" /> {/* Error message for subject */}
            </div>

            {/* Formik Field component for the "Message" textarea */}
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <Field as="textarea" name="message" className="form-control" rows="3" /> {/* "as" is used for textarea */}
              <ErrorMessage name="message" component="div" className="text-danger" /> {/* Error message for message */}
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'} {/* Disable the button while submitting */}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
