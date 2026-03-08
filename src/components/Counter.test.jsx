import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Counter } from './Counter';

describe('Composant Counter', () => {

  it('doit initialiser le compteur à 0', () => {
    render(<Counter />);
    const countElement = screen.getByTestId('count-value');
    expect(countElement.textContent).toBe('0');
  });

  it('doit incrémenter la valeur lors du clic sur le bouton', () => {
    render(<Counter />);
    const button = screen.getByRole('button', { name: /incrémenter/i });
    const countElement = screen.getByTestId('count-value');
    fireEvent.click(button);
    expect(countElement.textContent).toBe('1');
  });

});