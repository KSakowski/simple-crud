import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SortIcon from './SortIcon';

describe('SortIcon', () => {
  it('renders an icon', () => {
    const { container } = render(<SortIcon field="name" sort="id,asc" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders different icons for asc and desc', () => {
    const { container: asc } = render(<SortIcon field="name" sort="name,asc" />);
    const { container: desc } = render(<SortIcon field="name" sort="name,desc" />);
    expect(asc.querySelector('svg')?.outerHTML).not.toBe(desc.querySelector('svg')?.outerHTML);
  });

  it('renders different icon when field is sorted vs not sorted', () => {
    const { container: sorted } = render(<SortIcon field="name" sort="name,asc" />);
    const { container: neutral } = render(<SortIcon field="name" sort="id,asc" />);
    expect(sorted.querySelector('svg')?.outerHTML).not.toBe(neutral.querySelector('svg')?.outerHTML);
  });

  it('renders same neutral icon regardless of other field sort direction', () => {
    const { container: c1 } = render(<SortIcon field="id" sort="name,asc" />);
    const { container: c2 } = render(<SortIcon field="id" sort="name,desc" />);
    expect(c1.querySelector('svg')?.outerHTML).toBe(c2.querySelector('svg')?.outerHTML);
  });
});
