import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

const defaultProps = {
  page: 1,
  totalPages: 5,
  totalElements: 50,
  onPageChange: vi.fn(),
};

describe('Pagination', () => {
  it('displays current page and totals', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Page 2 of 5 (50 total)')).toBeInTheDocument();
  });

  it('calls onPageChange with previous page on Previous click', async () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onPageChange).toHaveBeenCalledWith(0);
  });

  it('calls onPageChange with next page on Next click', async () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables Previous button on first page', () => {
    render(<Pagination {...defaultProps} page={0} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    render(<Pagination {...defaultProps} page={4} totalPages={5} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('both buttons enabled on middle page', () => {
    render(<Pagination {...defaultProps} page={2} totalPages={5} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
  });
});
