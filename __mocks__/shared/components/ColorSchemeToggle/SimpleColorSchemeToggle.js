import React from 'react';

// Mock para SimpleColorSchemeToggle
export const SimpleColorSchemeToggle = () =>
  React.createElement(
    'div',
    {
      'data-testid': 'color-scheme-toggle',
      'data-mock': 'simple-color-scheme-toggle',
    },
    React.createElement(
      'button',
      {
        type: 'button',
        'aria-label': 'Toggle color scheme',
      },
      'Simple Toggle'
    )
  );
