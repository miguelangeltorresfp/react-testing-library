import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Joke from '../joke';

it('Joke component receives props and then renders text', () => {
  // Renders Joke component with some text prop.
  const { getByTestId } = render(<Joke text="The funniest joke this year." />);

  // screen.debug();

  // Expects Joke component to render correct text.
  expect(getByTestId('joke-text')).toHaveTextContent(
    'The funniest joke this year.'
  );
});
