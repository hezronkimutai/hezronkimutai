import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterTag, FilterTags } from '..';

describe('FilterTag Components', () => {
  describe('FilterTag', () => {
    const mockOnRemove = jest.fn();
    const defaultProps = {
      label: 'Test Tag',
      onRemove: mockOnRemove
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('renders with required props', () => {
      render(<FilterTag {...defaultProps} />);
      
      expect(screen.getByText('Test Tag')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        'Remove Test Tag filter'
      );
    });

    it('applies custom className', () => {
      render(<FilterTag {...defaultProps} className="custom-class" />);
      
      const container = screen.getByText('Test Tag').closest('div');
      expect(container).toHaveClass('custom-class');
    });

    it('calls onRemove when remove button is clicked', () => {
      render(<FilterTag {...defaultProps} />);
      
      fireEvent.click(screen.getByRole('button'));
      expect(mockOnRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('FilterTags', () => {
    const mockOnRemove = jest.fn();
    const defaultProps = {
      tags: [
        { label: 'Tag 1', value: 'tag1' },
        { label: 'Tag 2', value: 'tag2' }
      ],
      onRemove: mockOnRemove
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('renders multiple tags', () => {
      render(<FilterTags {...defaultProps} />);
      
      expect(screen.getByText('Tag 1')).toBeInTheDocument();
      expect(screen.getByText('Tag 2')).toBeInTheDocument();
      expect(screen.getByText('Clear all')).toBeInTheDocument();
    });

    it('does not render when tags array is empty', () => {
      const { container } = render(<FilterTags tags={[]} onRemove={mockOnRemove} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('applies custom className', () => {
      render(<FilterTags {...defaultProps} className="custom-class" />);
      
      const container = screen.getByText('Tag 1').closest('.flex');
      expect(container).toHaveClass('custom-class');
    });

    it('calls onRemove with correct value when removing single tag', () => {
      render(<FilterTags {...defaultProps} />);
      
      // Click first tag's remove button
      fireEvent.click(screen.getAllByRole('button')[0]);
      expect(mockOnRemove).toHaveBeenCalledWith('tag1');
    });

    it('calls onRemove for each tag when clicking clear all', () => {
      render(<FilterTags {...defaultProps} />);
      
      fireEvent.click(screen.getByText('Clear all'));
      
      expect(mockOnRemove).toHaveBeenCalledTimes(2);
      expect(mockOnRemove).toHaveBeenCalledWith('tag1');
      expect(mockOnRemove).toHaveBeenCalledWith('tag2');
    });

    it('does not show clear all button with single tag', () => {
      render(
        <FilterTags
          tags={[{ label: 'Single Tag', value: 'single' }]}
          onRemove={mockOnRemove}
        />
      );
      
      expect(screen.queryByText('Clear all')).not.toBeInTheDocument();
    });

    describe('Accessibility', () => {
      it('has accessible remove buttons', () => {
        render(<FilterTags {...defaultProps} />);
        
        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toHaveAttribute('aria-label', 'Remove Tag 1 filter');
        expect(buttons[1]).toHaveAttribute('aria-label', 'Remove Tag 2 filter');
      });

      it('has accessible clear all button', () => {
        render(<FilterTags {...defaultProps} />);
        
        const clearButton = screen.getByRole('button', { name: 'Clear all' });
        expect(clearButton).toHaveClass('text-gray-500');
      });
    });
  });
});