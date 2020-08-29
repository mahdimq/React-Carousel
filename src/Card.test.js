import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

// SMOKE TEST FOR CARD COMPONENT
it('renders Card Component without crashing', function () {
	render(<Card />);
});

// SNAPSHOT TEST
it('should match the snapshot', function () {
	const { asFragment } = render(<Card />);
	expect(asFragment()).toMatchSnapshot();
});
