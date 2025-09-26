import { render, screen, userEvent } from '@/test-utils';
import { ColorSchemeToggle } from './ColorSchemeToggle';

// Mock the useMantineColorScheme hook
const mockSetColorScheme = jest.fn();
jest.mock('@mantine/core', () => ({
  ...jest.requireActual('@mantine/core'),
  useMantineColorScheme: () => ({
    setColorScheme: mockSetColorScheme,
  }),
}));

describe('ColorSchemeToggle component', () => {
  beforeEach(() => {
    mockSetColorScheme.mockClear();
  });

  it('renders all theme toggle buttons', () => {
    render(<ColorSchemeToggle />);

    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Auto')).toBeInTheDocument();
  });

  it('has correct button structure', () => {
    render(<ColorSchemeToggle />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('calls setColorScheme with light when Light button is clicked', async () => {
    const user = userEvent.setup();
    render(<ColorSchemeToggle />);

    const lightButton = screen.getByText('Light');
    await user.click(lightButton);

    expect(mockSetColorScheme).toHaveBeenCalledWith('light');
  });

  it('calls setColorScheme with dark when Dark button is clicked', async () => {
    const user = userEvent.setup();
    render(<ColorSchemeToggle />);

    const darkButton = screen.getByText('Dark');
    await user.click(darkButton);

    expect(mockSetColorScheme).toHaveBeenCalledWith('dark');
  });

  it('calls setColorScheme with auto when Auto button is clicked', async () => {
    const user = userEvent.setup();
    render(<ColorSchemeToggle />);

    const autoButton = screen.getByText('Auto');
    await user.click(autoButton);

    expect(mockSetColorScheme).toHaveBeenCalledWith('auto');
  });
});
