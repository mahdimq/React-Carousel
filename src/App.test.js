import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Write a smoke test for App Component
it('renders without crashing', function () {
	render(<App />);
});
