import { render, screen, fireEvent } from '@testing-library/react';
import { MobileNavigation } from '../MobileNavigation';

// Mock del hook
jest.mock('../../hooks/useDeviceType', () => ({
  useDeviceType: () => ({ isMobile: true })
}));

describe('MobileNavigation', () => {
  it('should render mobile navigation when on mobile device', () => {
    render(
      <MobileNavigation
        activeTab="dashboard"
        setActiveTab={jest.fn()}
        criticalItems={0}
        shoppingItems={5}
      />
    );

    expect(screen.getByRole('button', { name: /menú/i })).toBeInTheDocument();
  });

  it('should open drawer when menu button is clicked', () => {
    render(
      <MobileNavigation
        activeTab="dashboard"
        setActiveTab={jest.fn()}
        criticalItems={0}
        shoppingItems={5}
      />
    );

    const menuButton = screen.getByRole('button', { name: /menú/i });
    fireEvent.click(menuButton);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Inventario')).toBeInTheDocument();
  });

  it('should show shopping badge when there are shopping items', () => {
    render(
      <MobileNavigation
        activeTab="dashboard"
        setActiveTab={jest.fn()}
        criticalItems={0}
        shoppingItems={3}
      />
    );

    const menuButton = screen.getByRole('button', { name: /menú/i });
    fireEvent.click(menuButton);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should call setActiveTab when a tab is clicked', () => {
    const mockSetActiveTab = jest.fn();
    
    render(
      <MobileNavigation
        activeTab="dashboard"
        setActiveTab={mockSetActiveTab}
        criticalItems={0}
        shoppingItems={0}
      />
    );

    const menuButton = screen.getByRole('button', { name: /menú/i });
    fireEvent.click(menuButton);

    const inventoryTab = screen.getByText('Inventario');
    fireEvent.click(inventoryTab);

    expect(mockSetActiveTab).toHaveBeenCalledWith('inventory');
  });
});
