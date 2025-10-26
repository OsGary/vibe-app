import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Test Setup', () => {
  it('should render a simple component', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should have testing library configured', () => {
    const { container } = render(<div data-testid="test">Test</div>);
    expect(container.querySelector('[data-testid="test"]')).toBeInTheDocument();
  });

  it('should have jsdom environment', () => {
    expect(window).toBeDefined();
    expect(document).toBeDefined();
  });
});

