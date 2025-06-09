import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom"
import { Initial } from './initial';

describe('Test Initial Componente', () => { 
    test('Initial component renders correctly', async () => {
        // // Arrange

        // // Act
        render(<Initial />);
        const hElement = screen.getByRole('heading', { name: /Vite/ });
        const counterElement = screen.getByRole('button', { name: 'count is 0' });
        // // Assert
        expect(hElement).toBeInTheDocument();
        expect(counterElement).toBeInTheDocument();
        await counterElement.click();
        expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
    });
 })
