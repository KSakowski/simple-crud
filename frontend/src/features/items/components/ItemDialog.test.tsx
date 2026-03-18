import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import ItemDialog from './ItemDialog';

const noop = () => {};

describe('ItemDialog — create mode', () => {
  it('renders "New Item" title', () => {
    renderWithProviders(<ItemDialog open={true} onOpenChange={noop} item={null} />);
    expect(screen.getByText('New Item')).toBeInTheDocument();
  });

  it('shows "Create" submit button', () => {
    renderWithProviders(<ItemDialog open={true} onOpenChange={noop} item={null} />);
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  it('blocks submit and shows error when name is empty', async () => {
    renderWithProviders(<ItemDialog open={true} onOpenChange={noop} item={null} />);
    await userEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
  });

  it('submits successfully with valid data', async () => {
    renderWithProviders(<ItemDialog open={true} onOpenChange={noop} item={null} />);
    await userEvent.type(screen.getByPlaceholderText('Item name'), 'New item');
    await userEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() => expect(screen.queryByText('Name is required')).not.toBeInTheDocument());
  });
});

describe('ItemDialog — edit mode', () => {
  const item = { id: 1, name: 'Existing', description: 'Old desc' };

  it('renders "Edit Item" title', () => {
    renderWithProviders(<ItemDialog open={true} onOpenChange={noop} item={item} />);
    expect(screen.getByText('Edit Item')).toBeInTheDocument();
  });

  it('pre-fills form with item data', () => {
    renderWithProviders(<ItemDialog open={true} onOpenChange={noop} item={item} />);
    expect(screen.getByDisplayValue('Existing')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Old desc')).toBeInTheDocument();
  });

  it('shows "Update" submit button', () => {
    renderWithProviders(<ItemDialog open={true} onOpenChange={noop} item={item} />);
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });
});
