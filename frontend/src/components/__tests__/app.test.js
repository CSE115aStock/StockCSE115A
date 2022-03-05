import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import App from '../App';

/**
 */
test('App Renders', async () => {
  render(<App />);
});
