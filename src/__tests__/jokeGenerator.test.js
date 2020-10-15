import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import * as axios from 'axios';
import MockAxios from 'axios-mock-adapter';

import JokeGenerator from '../jokeGenerator';

const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });
afterAll(() => mock.restore());

it('"JokeGenerator" component fetches a random joke and renders it', async () => {
  // Mocking response for axios.get(RANDOM_JOKE_URL) request
  mock.onGet().replyOnce(200, {
    value: {
      joke: 'Really funny joke!',
    },
  });

  // Renders Joke component with some text prop.
  const { getByText } = render(<JokeGenerator />);

  screen.debug();

  // Checking if a default text is being displayed when no joke has been loaded yet
  expect(getByText(/You haven't loaded any joke yet/)).toBeInTheDocument();

  // Simulating a button click in the browser
  userEvent.click(getByText('Load a random joke'));

  // Checking if the default text is no longer displayed.
  expect(
    screen.queryByText("You haven't loaded any joke yet!")
  ).not.toBeInTheDocument();

  // Checking if 'Loading...' is visible in the DOM.
  expect(screen.queryByText(/Loading/)).toBeInTheDocument();

  // https://testing-library.com/docs/dom-testing-library/api-async#waitfor
  await waitFor(() => {
    expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
  });

  screen.debug();

  // Checking if joke is being displayed.
  expect(screen.queryByTestId('joke-text')).toBeInTheDocument();
});
