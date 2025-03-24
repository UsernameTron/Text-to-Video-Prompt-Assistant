import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EnhancedPrompt from './EnhancedPrompt';

describe('EnhancedPrompt Component', () => {
  const samplePrompt = 'A city skyline at sunset, aerial shot, golden hour lighting';

  test('renders with placeholder when no prompt is provided', () => {
    render(<EnhancedPrompt />);
    
    expect(screen.getByText('Your enhanced prompt will appear here')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /copy/i })).not.toBeInTheDocument();
  });

  test('renders with the provided enhanced prompt', () => {
    render(<EnhancedPrompt enhancedPrompt={samplePrompt} />);
    
    expect(screen.getByText(samplePrompt)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  test('clicking copy button copies text to clipboard and shows confirmation', async () => {
    render(<EnhancedPrompt enhancedPrompt={samplePrompt} />);
    
    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(samplePrompt);
    expect(await screen.findByText('Copied!')).toBeInTheDocument();
    
    // Wait for confirmation message to disappear
    await waitFor(() => {
      expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
    }, { timeout: 2500 });
  });

  test('handles clipboard errors', async () => {
    // Mock clipboard.writeText to reject
    navigator.clipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));
    
    render(<EnhancedPrompt enhancedPrompt={samplePrompt} />);
    
    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);
    
    expect(await screen.findByText('Failed to copy')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    
    // Wait for error message to disappear
    await waitFor(() => {
      expect(screen.queryByText('Failed to copy')).not.toBeInTheDocument();
    }, { timeout: 2500 });
  });
});