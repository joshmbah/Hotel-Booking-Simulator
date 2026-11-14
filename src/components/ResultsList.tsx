import type { Hotel, SearchParams } from '../types';
import { formatMoney, nightsBetween } from '../types';
import { lowestPrice } from '../data';
import { prettyDate } from '../dates';

interface Props {
  hotels: Hotel[];
  params: SearchParams;
  onSelectHotel: (hotel: Hotel) => void;
  onModifySearch: () => void;
}

export default function ResultsList({ hotels, params, onSelectHotel, onModifySearch }: Props) {
  const nights = nightsBetween(params.checkIn, params.checkOut);

  return (
    <section>
      <div className="results-header">
        <div>
          <h2>
            {hotels.length} {hotels.length === 1 ? 'stay' : 'stays'} in{' '}
            {params.neighbourhood === 'Anywhere in Ottawa'
              ? 'Ottawa'
              : params.neighbourhood}
          </h2>
          <p className="muted">
            {prettyDate(params.checkIn)} → {prettyDate(params.checkOut)} ·{' '}
            {nights} {nights === 1 ? 'night' : 'nights'} · {params.guests}{' '}
            {params.guests === 1 ? 'guest' : 'guests'} · {params.rooms}{' '}
            {params.rooms === 1 ? 'room' : 'rooms'}
          </p>
        </div>
        <button className="btn-ghost" type="button" onClick={onModifySearch}>
          Modify search
        </button>
      </div>

      {hotels.length === 0 ? (
        <p className="empty">
          No stays match that search. Try fewer guests, more rooms, or a
          different neighbourhood.
        </p>
      ) : (
        <ul className="hotel-list">
          {hotels.map((hotel) => (
            <li key={hotel.id} className="hotel-card">
              <div
                className="hotel-visual"
                style={{ background: hotel.gradient }}
                aria-hidden="true"
              >
                <span className="hotel-visual-label">{hotel.name}</span>
              </div>
              <div className="hotel-body">
                <div className="hotel-top">
                  <h3>{hotel.name}</h3>
                  <span className="stars" aria-label={`${hotel.stars} star hotel`}>
                    {'★'.repeat(hotel.stars)}
                    {'☆'.repeat(5 - hotel.stars)}
                  </span>
                </div>
                <p className="muted">
                  {hotel.neighbourhood} · ★ {hotel.rating.toFixed(1)} (
                  {hotel.reviewCount} reviews)
                </p>
                <p>{hotel.description}</p>
                <ul className="chips">
                  {hotel.amenities.map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                  ))}
                </ul>
                <div className="hotel-foot">
                  <p className="price">
                    <strong>{formatMoney(lowestPrice(hotel))}</strong>
                    <span className="muted"> / night</span>
                  </p>
                  <button
                    className="btn-primary"
                    type="button"
                    onClick={() => onSelectHotel(hotel)}
                  >
                    View rooms
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
