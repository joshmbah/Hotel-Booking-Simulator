import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Booking, CarType, Hotel, Room, SearchParams } from '../types';
import {
  CAR_RENTAL_RATES,
  TAX_RATE,
  buildPriceBreakdown,
  formatMoney,
  makeReference,
  nightsBetween,
} from '../types';
import { prettyDate } from '../dates';

interface Props {
  hotel: Hotel;
  room: Room;
  params: SearchParams;
  onConfirm: (booking: Booking) => void;
  onBack: () => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingForm({ hotel, room, params, onConfirm, onBack }: Props) {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [checkIn, setCheckIn] = useState(params.checkIn);
  const [checkOut, setCheckOut] = useState(params.checkOut);
  const [guests, setGuests] = useState(params.guests);
  const [specialRequests, setSpecialRequests] = useState('');
  const [addCar, setAddCar] = useState(false);
  const [carType, setCarType] = useState<CarType>('Compact');
  const [errors, setErrors] = useState<string[]>([]);

  const preview: Booking = {
    hotel,
    room,
    checkIn,
    checkOut,
    guests,
    rooms: params.rooms,
    guestName,
    guestEmail,
    specialRequests,
    carRental: addCar
      ? { carType, dailyRate: CAR_RENTAL_RATES[carType] }
      : null,
    reference: '',
  };
  const nights = nightsBetween(checkIn, checkOut);
  const breakdown =
    nights >= 1 ? buildPriceBreakdown(preview) : null;

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const problems: string[] = [];
    if (guestName.trim() === '') {
      problems.push('Please enter the guest name.');
    }
    if (!EMAIL_PATTERN.test(guestEmail.trim())) {
      problems.push('Please enter a valid email address.');
    }
    if (!checkIn || !checkOut || nightsBetween(checkIn, checkOut) < 1) {
      problems.push('Check-out must be after check-in.');
    }
    if (guests < 1 || guests > room.maxGuests * params.rooms) {
      problems.push(
        `This room sleeps ${room.maxGuests} per room — at most ${room.maxGuests * params.rooms} guests for ${params.rooms} ${params.rooms === 1 ? 'room' : 'rooms'}.`,
      );
    }
    setErrors(problems);
    if (problems.length > 0) return;

    onConfirm({ ...preview, reference: makeReference() });
  }

  return (
    <section>
      <button className="btn-ghost" type="button" onClick={onBack}>
        ← Back to rooms
      </button>

      <h2>Book your stay</h2>
      <p className="muted">
        {hotel.name} · {room.type} — {room.name} ·{' '}
        {formatMoney(room.pricePerNight)} / night
      </p>

      <div className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <ul className="error-list">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          <label>
            Guest name
            <input
              type="text"
              value={guestName}
              placeholder="e.g. Alex Morgan"
              onChange={(e) => setGuestName(e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={guestEmail}
              placeholder="you@example.com"
              onChange={(e) => setGuestEmail(e.target.value)}
            />
          </label>

          <div className="form-row">
            <label>
              Check-in
              <input
                type="date"
                value={checkIn}
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
          </div>

          <label>
            Guests
            <input
              type="number"
              min={1}
              max={room.maxGuests * params.rooms}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </label>

          <label>
            Special requests <span className="muted">(optional)</span>
            <textarea
              value={specialRequests}
              rows={3}
              placeholder="Early check-in, extra towels, quiet floor…"
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </label>

          <fieldset className="car-addon">
            <legend>Car rental add-on</legend>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={addCar}
                onChange={(e) => setAddCar(e.target.checked)}
              />
              Add a rental car for the trip
            </label>
            {addCar && (
              <label>
                Car type
                <select
                  value={carType}
                  onChange={(e) => setCarType(e.target.value as CarType)}
                >
                  {(Object.keys(CAR_RENTAL_RATES) as CarType[]).map((type) => (
                    <option key={type} value={type}>
                      {type} — {formatMoney(CAR_RENTAL_RATES[type])} / day
                    </option>
                  ))}
                </select>
              </label>
            )}
          </fieldset>

          <p className="muted small">
            No card details, no sign-in — this is a front-end demo, so nothing
            is charged and no real booking is made.
          </p>

          <button className="btn-primary" type="submit">
            Confirm booking
          </button>
        </form>

        <aside className="price-summary">
          <h3>Price summary</h3>
          {breakdown === null ? (
            <p className="error">Pick valid dates to see the price.</p>
          ) : (
            <dl>
              <div>
                <dt>
                  {room.type} × {nights} {nights === 1 ? 'night' : 'nights'}
                  {params.rooms > 1 ? ` × ${params.rooms} rooms` : ''}
                </dt>
                <dd>{formatMoney(breakdown.roomSubtotal)}</dd>
              </div>
              {preview.carRental !== null && (
                <div>
                  <dt>
                    Car rental ({preview.carRental.carType}) × {nights}{' '}
                    {nights === 1 ? 'day' : 'days'}
                  </dt>
                  <dd>{formatMoney(breakdown.carSubtotal)}</dd>
                </div>
              )}
              <div>
                <dt>Taxes (HST {Math.round(TAX_RATE * 100)}%)</dt>
                <dd>{formatMoney(breakdown.tax)}</dd>
              </div>
              <div className="total-row">
                <dt>Total</dt>
                <dd>{formatMoney(breakdown.total)}</dd>
              </div>
            </dl>
          )}
          <p className="muted small">
            {prettyDate(checkIn)} → {prettyDate(checkOut)}
          </p>
        </aside>
      </div>
    </section>
  );
}
