import type { Hotel, Room, SearchParams } from '../types';
import { formatMoney, nightsBetween } from '../types';
import { ROOM_IMAGE } from '../data';
import { prettyDate } from '../dates';

interface Props {
  hotel: Hotel;
  params: SearchParams;
  onSelectRoom: (room: Room) => void;
  onBack: () => void;
}

export default function HotelRooms({ hotel, params, onSelectRoom, onBack }: Props) {
  const nights = nightsBetween(params.checkIn, params.checkOut);
  const perRoomGuests = Math.ceil(params.guests / params.rooms);

  return (
    <section>
      <button className="btn-ghost" type="button" onClick={onBack}>
        ← Back to results
      </button>

      <img className="hotel-banner" src={hotel.image} alt="" />

      <div className="hotel-detail-head">
        <div>
          <h2>{hotel.name}</h2>
          <p className="muted">
            {hotel.neighbourhood} · {'★'.repeat(hotel.stars)}
            {'☆'.repeat(5 - hotel.stars)} · ★ {hotel.rating.toFixed(1)} (
            {hotel.reviewCount} reviews)
          </p>
          <p>{hotel.description}</p>
        </div>
        <p className="muted">
          {prettyDate(params.checkIn)} → {prettyDate(params.checkOut)} ·{' '}
          {nights} {nights === 1 ? 'night' : 'nights'} · {params.guests}{' '}
          {params.guests === 1 ? 'guest' : 'guests'}
        </p>
      </div>

      <h3>Choose your room</h3>
      <ul className="room-list">
        {hotel.rooms.map((room) => {
          const fits = room.maxGuests >= perRoomGuests;
          const total = room.pricePerNight * nights * params.rooms;
          return (
            <li key={room.id} className="room-card">
              <img
                className="room-photo"
                src={ROOM_IMAGE[room.type]}
                alt=""
                loading="lazy"
              />
              <div className="room-main">
                <div className="room-top">
                  <h4>
                    {room.type} — {room.name}
                  </h4>
                  <span className="room-type">{room.type}</span>
                </div>
                <p className="muted">
                  {room.beds} · {room.sizeSqm} m² · sleeps {room.maxGuests}
                </p>
                <ul className="chips">
                  {room.amenities.map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                  ))}
                </ul>
                {!fits && (
                  <p className="warning">
                    This room sleeps {room.maxGuests} — too small for{' '}
                    {perRoomGuests}{' '}
                    {perRoomGuests === 1 ? 'guest' : 'guests'} per room.
                  </p>
                )}
              </div>
              <div className="room-foot">
                <p className="price">
                  <strong>{formatMoney(room.pricePerNight)}</strong>
                  <span className="muted"> / night</span>
                  <br />
                  <span className="muted">
                    {formatMoney(total)} total for {nights}{' '}
                    {nights === 1 ? 'night' : 'nights'}
                    {params.rooms > 1 ? ` × ${params.rooms} rooms` : ''}
                  </span>
                </p>
                <button
                  className="btn-primary"
                  type="button"
                  disabled={!fits}
                  onClick={() => onSelectRoom(room)}
                >
                  {fits ? 'Select this room' : 'Too small for your party'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
