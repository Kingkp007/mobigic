import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import Signup from './Signup'; // Import the Signup component

describe('Signup Component', () => {
  it('renders email and password input fields', () => {
    const { getByLabelText } = render(<Signup />);
    expect(getByLabelText('Email address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('displays validation error when submitting empty form', async () => {
    const { getByText } = render(<Signup />);
    fireEvent.click(getByText('Sign in'));
    await waitFor(() => {
      expect(getByText('Validation failed: input must be a valid email')).toBeInTheDocument();
      expect(getByText('Validation failed: input must be longer than or equal to 6 characters')).toBeInTheDocument();
    });
  });

  it('displays validation error when submitting invalid email', async () => {
    const { getByLabelText, getByText } = render(<Signup />);
    fireEvent.change(getByLabelText('Email address'), { target: { value: 'invalid-email' } });
    fireEvent.click(getByText('Sign in'));
    await waitFor(() => {
      expect(getByText('Validation failed: input must be a valid email')).toBeInTheDocument();
    });
  });

  it('displays validation error when submitting invalid password', async () => {
    const { getByLabelText, getByText } = render(<Signup />);
    fireEvent.change(getByLabelText('Password'), { target: { value: 'short' } });
    fireEvent.click(getByText('Sign in'));
    await waitFor(() => {
      expect(getByText('Validation failed: input must be longer than or equal to 6 characters')).toBeInTheDocument();
    });
  });

});
