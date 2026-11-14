import { useState } from 'react';
import type { FormEvent } from 'react';
import type { SearchParams } from '../types';
import { NEIGHBOURHOODS } from '../data';
import { nightsBetween } from '../types';

interface Props {
  initial: SearchParams;
  onSearch: (params: SearchParams) => void;
}

export default function SearchForm({ initial, onSearch }: Props) {
  const [neighbourhood, setNeighbourhood] = useState(initial.neighbourhood);
  const [checkIn, setCheckIn] = useState(initial.checkIn);
  const [checkOut, setCheckOut] = useState(initial.checkOut);
  const [guests, setGuests] = useState(initial.guests);
  const [rooms, setRooms] = useState(initial.rooms);
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setError('Please pick check-in and check-out dates.');
      return;
    }
    if (nightsBetween(checkIn, checkOut) < 1) {
      setError('Check-out must be after check-in.');
      return;
    }
    if (guests < 1 || guests > 10) {
      setError('Guests must be between 1 and 10.');
      return;
    }
    if (rooms < 1 || rooms > 4) {
      setError('Rooms must be between 1 and 4.');
      return;
    }
    if (guests > rooms * 5) {
      setError('Too many guests for that many rooms — add another room.');
      return;
    }
    setError('');
    onSearch({ neighbourhood, checkIn, checkOut, guests, rooms });
  }

  return (
    <>
      <section className="hero">
        <img className="hero-img" src="/images/hero.jpg" alt="" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-in">
          <p className="kicker">Ottawa · Five stays, one city</p>
          <h2>
            Find your <em>stay</em> in Ottawa
          </h2>
          <p className="hero-sub">
            Five hand-picked stays across the city, from downtown luxury to a
            quiet garden inn. No account, no card, just a look around.
          </p>
          <p className="stars" aria-hidden="true">
            ★★★★★
          </p>
        </div>
      </section>
      <div className="search-shell">
        <form className="search-form" onSubmit={handleSubmit}>
        <label>
          Where in Ottawa?
          <select
            value={neighbourhood}
            onChange={(e) => setNeighbourhood(e.target.value)}
          >
            {NEIGHBOURHOODS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </label>
        <label>
          Check-in
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>
        <label>
          Check-out
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>
        <label>
          Guests
          <input
            type="number"
            min={1}
            max={10}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </label>
        <label>
          Rooms
          <input
            type="number"
            min={1}
            max={4}
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
          />
        </label>
        <button className="btn-primary search-btn" type="submit">
          Search hotels
        </button>
        </form>
        {error !== '' && <p className="error">{error}</p>}
      </div>
    </>
  );
}
