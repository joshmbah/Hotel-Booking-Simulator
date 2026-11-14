import { useState } from 'react';
import type { Booking, Hotel, Room, SearchParams } from './types';
import { filterHotels } from './data';
import { isoDate } from './dates';
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';
import HotelRooms from './components/HotelRooms';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import './styles.css';

type Screen = 'search' | 'results' | 'rooms' | 'booking' | 'confirmation';

const STEPS: { id: Screen; label: string }[] = [
  { id: 'search', label: 'Search' },
  { id: 'results', label: 'Results' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'booking', label: 'Booking' },
  { id: 'confirmation', label: 'Confirmation' },
];

function defaultSearch(): SearchParams {
  return {
    neighbourhood: 'Anywhere in Ottawa',
    checkIn: isoDate(7),
    checkOut: isoDate(9),
    guests: 2,
    rooms: 1,
  };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('search');
  const [params, setParams] = useState<SearchParams>(defaultSearch);
  const [results, setResults] = useState<Hotel[]>([]);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);

  const activeStep = STEPS.findIndex((step) => step.id === screen);

  function handleSearch(next: SearchParams): void {
    setParams(next);
    setResults(filterHotels(next));
    setHotel(null);
    setRoom(null);
    setBooking(null);
    setScreen('results');
  }

  function handleSelectHotel(selected: Hotel): void {
    setHotel(selected);
    setScreen('rooms');
  }

  function handleSelectRoom(selected: Room): void {
    setRoom(selected);
    setScreen('booking');
  }

  function handleConfirm(next: Booking): void {
    setBooking(next);
    setScreen('confirmation');
  }

  function handleStartOver(): void {
    setParams(defaultSearch());
    setResults([]);
    setHotel(null);
    setRoom(null);
    setBooking(null);
    setScreen('search');
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-inner">
          <button
            type="button"
            className="brand"
            onClick={handleStartOver}
            aria-label="Grand Hotel — back to search"
          >
            Grand <span>Hotel</span>
            <small>Ottawa</small>
          </button>
          <p className="header-note">Demo booking — no real stays, no charges</p>
        </div>
        <nav className="steps" aria-label="Booking progress">
          <ol>
            {STEPS.map((step, index) => (
              <li
                key={step.id}
                className={
                  index < activeStep
                    ? 'done'
                    : index === activeStep
                      ? 'active'
                      : ''
                }
                aria-current={index === activeStep ? 'step' : undefined}
              >
                <span className="step-number">{index + 1}</span>
                {step.label}
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <main className="container">
        {screen === 'search' && (
          <SearchForm initial={params} onSearch={handleSearch} />
        )}
        {screen === 'results' && (
          <ResultsList
            hotels={results}
            params={params}
            onSelectHotel={handleSelectHotel}
            onModifySearch={() => setScreen('search')}
          />
        )}
        {screen === 'rooms' && hotel !== null && (
          <HotelRooms
            hotel={hotel}
            params={params}
            onSelectRoom={handleSelectRoom}
            onBack={() => setScreen('results')}
          />
        )}
        {screen === 'booking' && hotel !== null && room !== null && (
          <BookingForm
            hotel={hotel}
            room={room}
            params={params}
            onConfirm={handleConfirm}
            onBack={() => setScreen('rooms')}
          />
        )}
        {screen === 'confirmation' && booking !== null && (
          <Confirmation booking={booking} onStartOver={handleStartOver} />
        )}
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            Grand Hotel is a front-end demo built with React + TypeScript. All
            hotels, prices and bookings are fictional mock data — nothing here
            is a real reservation.
          </p>
        </div>
      </footer>
    </div>
  );
}
