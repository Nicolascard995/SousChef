import '@testing-library/jest-dom';

// Mock de matchMedia para tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock de touch events
Object.defineProperty(window, 'ontouchstart', {
  writable: true,
  value: null,
});

// Mock de innerWidth para tests móviles
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 375,
});

// Mock de navigator.onLine
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true,
});
