import React from 'react';

// Mock para ColorSchemeToggle - versión Switch
export const ColorSchemeToggle = () =>
  React.createElement(
    'div',
    {
      'data-testid': 'color-scheme-toggle',
      'data-mock': 'color-scheme-toggle',
    },
    React.createElement(
      'button',
      {
        type: 'button',
        'aria-label': 'Toggle color scheme',
      },
      'Toggle Theme'
    )
  );

// Mock para SimpleColorSchemeToggle - versión ActionIcon
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
      'Toggle Theme'
    )
  );
