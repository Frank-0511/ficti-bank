import React from 'react';

// Mock para next/dynamic que evita problemas con componentes dinámicos en tests
const dynamic = (importFunc, options = {}) => {
  const MockComponent = (props) => {
    // Si tiene ssr: false, renderizar un mock simple
    if (options.ssr === false) {
      return React.createElement(
        'div',
        {
          'data-testid': 'color-scheme-toggle',
          'data-mock': 'dynamic-component',
        },
        React.createElement('button', { type: 'button' }, 'Toggle Theme')
      );
    }

    // Para otros casos, intentar renderizar el loading component si existe
    if (options.loading) {
      return options.loading();
    }

    // Fallback genérico
    return React.createElement('div', { 'data-testid': 'dynamic-mock' }, 'Dynamic Component Mock');
  };

  MockComponent.displayName = 'DynamicMock';
  return MockComponent;
};

export default dynamic;
