import type { Booking } from '../types';
import { TAX_RATE, buildPriceBreakdown, formatMoney } from '../types';
import { prettyDate } from '../dates';

interface Props {
  booking: Booking;
  onStartOver: () => void;
}

export default function Confirmation({ booking, onStartOver }: Props) {
  const breakdown = buildPriceBreakdown(booking);

  return (
    <section className="confirmation">
      <div className="confirmation-badge" aria-hidden="true">
        ✓
      </div>
      <h2>You're booked in!</h2>
      <p>
        Thanks, {booking.guestName} — your stay at {booking.hotel.name} is
        confirmed. A confirmation email would go to {booking.guestEmail} (this
        is a demo, so no email is actually sent).
      </p>

      <p className="reference">
        Booking reference <strong>{booking.reference}</strong>
      </p>

      <dl className="summary-grid">
        <div>
          <dt>Hotel</dt>
          <dd>
            {booking.hotel.name} · {booking.hotel.neighbourhood}
          </dd>
        </div>
        <div>
          <dt>Room</dt>
          <dd>
            {booking.room.type} — {booking.room.name} ({booking.room.beds})
          </dd>
        </div>
        <div>
          <dt>Dates</dt>
          <dd>
            {prettyDate(booking.checkIn)} → {prettyDate(booking.checkOut)} ·{' '}
            {breakdown.nights} {breakdown.nights === 1 ? 'night' : 'nights'}
          </dd>
        </div>
        <div>
          <dt>Guests</dt>
          <dd>
            {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'} ·{' '}
            {booking.rooms} {booking.rooms === 1 ? 'room' : 'rooms'}
          </dd>
        </div>
        {booking.specialRequests.trim() !== '' && (
          <div>
            <dt>Special requests</dt>
            <dd>{booking.specialRequests}</dd>
          </div>
        )}
        {booking.carRental !== null && (
          <div>
            <dt>Car rental</dt>
            <dd>
              {booking.carRental.carType} —{' '}
              {formatMoney(booking.carRental.dailyRate)} / day
            </dd>
          </div>
        )}
      </dl>

      <h3>Price breakdown</h3>
      <dl className="price-summary price-summary--wide">
        <div>
          <dt>
            Room × {breakdown.nights}{' '}
            {breakdown.nights === 1 ? 'night' : 'nights'}
            {booking.rooms > 1 ? ` × ${booking.rooms} rooms` : ''}
          </dt>
          <dd>{formatMoney(breakdown.roomSubtotal)}</dd>
        </div>
        {booking.carRental !== null && (
          <div>
            <dt>
              Car rental ({booking.carRental.carType}) × {breakdown.nights}{' '}
              {breakdown.nights === 1 ? 'day' : 'days'}
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

      <p className="muted small">
        Demo booking — no payment was taken and no real reservation exists.
      </p>

      <button className="btn-primary" type="button" onClick={onStartOver}>
        Book another stay
      </button>
    </section>
  );
}
