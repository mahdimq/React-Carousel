import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

// SMOKE TEST FOR CAROUSEL COMPONENT
it('renders Carousel Component without crashing', function () {
	render(<Carousel />);
});

// SNAPSHOT TEST
it('should match the snapshot', function () {
	const { asFragment } = render(<Carousel />);
	expect(asFragment()).toMatchSnapshot();
});

// TEST RIGHT ARROW
it('works when you click on the right arrow', function () {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect the first image to show, but not the second
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();
});

// TEST LEFT ARROW
it('works when you click on the left arrow', function () {
	const { queryByTestId, queryByAltText } = render(<Carousel />);
	// move forward in the carousel
	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();

	// move backward in the carousel
	const leftArrow = queryByTestId('left-arrow');
	fireEvent.click(leftArrow);

	// expect the first image to show, but not the second
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
});

it('hides and shows arrows appropriately', function () {
	const { queryByTestId } = render(<Carousel />);
	const rightArrow = queryByTestId('right-arrow');
	let leftArrow = queryByTestId('left-arrow');

	// expect the left arrow to be missing, but the right button to be present.
	expect(leftArrow).toBe(null);
	expect(rightArrow).toBeInTheDocument();

	// move forward, expect both arrow to exist
	fireEvent.click(rightArrow);
	leftArrow = queryByTestId('left-arrow');

	expect(leftArrow).toBeInTheDocument();
	expect(rightArrow).toBeInTheDocument();

	// move forward again, expect only the right arrow to be missing
	fireEvent.click(rightArrow);

	expect(leftArrow).toBeInTheDocument();
	expect(rightArrow).not.toBeInTheDocument();
});
