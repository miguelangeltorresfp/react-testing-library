import axios from 'axios';
import React from 'react';
import Joke from './joke';

export default function JobsGenerator() {
  const [joke, setJoke] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const loadJoke = async () => {
    setLoading(true);

    const {
      data: {
        value: { joke },
      },
    } = await axios.get('https://api.icndb.com/jokes/random');
    setJoke(joke);

    setLoading(false);
  };
  return (
    <React.Fragment>
      {!joke && !loading && <div>You haven't loaded any joke yet!</div>}
      {loading && <div>Loading . . .</div>}
      {joke && !loading && <Joke text={joke} />}

      <button onClick={loadJoke} type="button">
        Load a random joke
      </button>
    </React.Fragment>
  );
}
