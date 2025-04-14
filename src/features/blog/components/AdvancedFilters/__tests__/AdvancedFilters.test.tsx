import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate, useSearchParams } from 'react-router-dom';
import { AdvancedFilters } from '..';

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn()
}));

describe('AdvancedFilters', () => {
  const mockNavigate = jest.fn();
  const mockSetSearchParams = jest.fn();
  const defaultSearchParams = new URLSearchParams();
  
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSearchParams as jest.Mock).mockReturnValue([defaultSearchParams, mockSetSearchParams]);
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    return render(
      <MemoryRouter>
        <AdvancedFilters {...props} />
      </MemoryRouter>
    );
  };

  describe('Rendering', () => {
    it('renders the advanced filters button', () => {
      renderComponent();
      expect(screen.getByText('Advanced Filters')).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
      renderComponent({ className: 'custom-class' });
      expect(screen.getByText('Advanced Filters').closest('div')).toHaveClass('custom-class');
    });

    it('toggles filter panel visibility when button is clicked', () => {
      renderComponent();
      
      expect(screen.queryByText('Date Range')).not.toBeInTheDocument();
      
      fireEvent.click(screen.getByText('Advanced Filters'));
      expect(screen.getByText('Date Range')).toBeInTheDocument();
      
      fireEvent.click(screen.getByText('Advanced Filters'));
      expect(screen.queryByText('Date Range')).not.toBeInTheDocument();
    });
  });

  describe('Date Filter Functionality', () => {
    it('initializes with URL params when available', () => {
      const searchParams = new URLSearchParams('startDate=2025-04-01&endDate=2025-04-14');
      (useSearchParams as jest.Mock).mockReturnValue([searchParams, mockSetSearchParams]);
      
      renderComponent();
      fireEvent.click(screen.getByText('Advanced Filters'));
      
      expect(screen.getByLabelText('From')).toHaveValue('2025-04-01');
      expect(screen.getByLabelText('To')).toHaveValue('2025-04-14');
    });

    it('updates date filter values when inputs change', async () => {
      renderComponent();
      fireEvent.click(screen.getByText('Advanced Filters'));

      fireEvent.change(screen.getByLabelText('From'), {
        target: { value: '2025-04-01' }
      });
      fireEvent.change(screen.getByLabelText('To'), {
        target: { value: '2025-04-14' }
      });

      expect(screen.getByLabelText('From')).toHaveValue('2025-04-01');
      expect(screen.getByLabelText('To')).toHaveValue('2025-04-14');
    });

    it('enforces end date to be after start date', () => {
      renderComponent();
      fireEvent.click(screen.getByText('Advanced Filters'));

      const startDate = '2025-04-01';
      fireEvent.change(screen.getByLabelText('From'), {
        target: { value: startDate }
      });

      expect(screen.getByLabelText('To')).toHaveAttribute('min', startDate);
    });
  });

  describe('Filter Actions', () => {
    it('applies filters and updates URL when Apply Filters is clicked', async () => {
      renderComponent();
      fireEvent.click(screen.getByText('Advanced Filters'));

      fireEvent.change(screen.getByLabelText('From'), {
        target: { value: '2025-04-01' }
      });
      fireEvent.change(screen.getByLabelText('To'), {
        target: { value: '2025-04-14' }
      });

      fireEvent.click(screen.getByText('Apply Filters'));

      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: '/blog/search',
        search: 'startDate=2025-04-01&endDate=2025-04-14'
      });
    });

    it('removes date params when dates are cleared', () => {
      const searchParams = new URLSearchParams('startDate=2025-04-01&endDate=2025-04-14');
      (useSearchParams as jest.Mock).mockReturnValue([searchParams, mockSetSearchParams]);
      
      renderComponent();
      fireEvent.click(screen.getByText('Advanced Filters'));

      fireEvent.change(screen.getByLabelText('From'), {
        target: { value: '' }
      });
      fireEvent.change(screen.getByLabelText('To'), {
        target: { value: '' }
      });

      fireEvent.click(screen.getByText('Apply Filters'));

      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: '/blog/search',
        search: ''
      });
    });

    it('resets filters when Reset button is clicked', () => {
      const searchParams = new URLSearchParams('startDate=2025-04-01&endDate=2025-04-14');
      (useSearchParams as jest.Mock).mockReturnValue([searchParams, mockSetSearchParams]);
      
      renderComponent();
      fireEvent.click(screen.getByText('Advanced Filters'));
      fireEvent.click(screen.getByText('Reset'));

      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: '/blog/search',
        search: ''
      });

      expect(screen.getByLabelText('From')).toHaveValue('');
      expect(screen.getByLabelText('To')).toHaveValue('');
    });
  });
});