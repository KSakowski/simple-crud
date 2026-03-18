import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import DeleteItemDialog from './DeleteItemDialog';

describe('DeleteItemDialog', () => {
  it('renders trash icon button', () => {
    render(<DeleteItemDialog itemName="Test" onConfirm={vi.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens dialog with item name on trigger click', async () => {
    render(<DeleteItemDialog itemName="My Item" onConfirm={vi.fn()} />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Delete item\?/i)).toBeInTheDocument();
    expect(screen.getByText(/My Item/)).toBeInTheDocument();
  });

  it('calls onConfirm when Delete is clicked', async () => {
    const onConfirm = vi.fn();
    render(<DeleteItemDialog itemName="My Item" onConfirm={onConfirm} />);
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('does not call onConfirm when Cancel is clicked', async () => {
    const onConfirm = vi.fn();
    render(<DeleteItemDialog itemName="My Item" onConfirm={onConfirm} />);
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
