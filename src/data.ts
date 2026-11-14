import type { Hotel, SearchParams } from './types';

/** Fictional Ottawa hotels. Mock data only — no real hotels, no live availability. */

export const NEIGHBOURHOODS: string[] = [
  'Anywhere in Ottawa',
  'Downtown',
  'ByWard Market',
  'Centretown',
  'The Glebe',
  'Kanata',
];

export const HOTELS: Hotel[] = [
  {
    id: 'rideau-grand',
    name: 'Rideau Grand Hotel',
    neighbourhood: 'Downtown',
    stars: 5,
    rating: 4.8,
    reviewCount: 1243,
    description:
      'Classic luxury steps from Parliament Hill, with river views and a rooftop terrace.',
    amenities: ['Free Wi-Fi', 'Breakfast included', 'Pool', 'Spa', 'Valet parking', 'Restaurant'],
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #3b6ea5 55%, #7fb0d8 100%)',
    rooms: [
      {
        id: 'rideau-standard',
        type: 'Standard',
        name: 'Standard City Room',
        pricePerNight: 189,
        maxGuests: 2,
        sizeSqm: 28,
        beds: '1 queen bed',
        amenities: ['Free Wi-Fi', 'TV', 'Coffee maker', 'Work desk'],
      },
      {
        id: 'rideau-deluxe',
        type: 'Deluxe',
        name: 'Deluxe River View Room',
        pricePerNight: 269,
        maxGuests: 3,
        sizeSqm: 38,
        beds: '1 king bed',
        amenities: ['Free Wi-Fi', 'River view', 'Mini fridge', 'Breakfast included'],
      },
      {
        id: 'rideau-suite',
        type: 'Suite',
        name: 'Parliament Suite',
        pricePerNight: 429,
        maxGuests: 4,
        sizeSqm: 62,
        beds: '1 king bed + sofa bed',
        amenities: ['Free Wi-Fi', 'Separate living room', 'Soaking tub', 'Breakfast included', 'Lounge access'],
      },
    ],
  },
  {
    id: 'market-house',
    name: 'Market House Hotel',
    neighbourhood: 'ByWard Market',
    stars: 4,
    rating: 4.6,
    reviewCount: 856,
    description:
      'A boutique stay in the heart of the ByWard Market, surrounded by cafés and galleries.',
    amenities: ['Free Wi-Fi', 'Breakfast included', 'Pet friendly', 'Bar', 'Free parking'],
    gradient: 'linear-gradient(135deg, #5b2a3a 0%, #a04a5e 55%, #d98a8a 100%)',
    rooms: [
      {
        id: 'market-standard',
        type: 'Standard',
        name: 'Standard Market Room',
        pricePerNight: 149,
        maxGuests: 2,
        sizeSqm: 24,
        beds: '1 queen bed',
        amenities: ['Free Wi-Fi', 'TV', 'Coffee maker'],
      },
      {
        id: 'market-deluxe',
        type: 'Deluxe',
        name: 'Deluxe Courtyard Room',
        pricePerNight: 209,
        maxGuests: 3,
        sizeSqm: 34,
        beds: '1 king bed',
        amenities: ['Free Wi-Fi', 'Courtyard view', 'Mini fridge', 'Breakfast included'],
      },
      {
        id: 'market-suite',
        type: 'Suite',
        name: 'Market Loft Suite',
        pricePerNight: 329,
        maxGuests: 4,
        sizeSqm: 55,
        beds: '1 king bed + sofa bed',
        amenities: ['Free Wi-Fi', 'Loft layout', 'Kitchenette', 'Breakfast included'],
      },
    ],
  },
  {
    id: 'elgin-court',
    name: 'Elgin Court Hotel',
    neighbourhood: 'Centretown',
    stars: 4,
    rating: 4.4,
    reviewCount: 612,
    description:
      'Comfortable and central on Elgin Street — an easy walk to downtown and the Canal.',
    amenities: ['Free Wi-Fi', 'Pool', 'Fitness centre', 'Free parking', 'Restaurant'],
    gradient: 'linear-gradient(135deg, #14532d 0%, #2f7d4f 55%, #7cc79b 100%)',
    rooms: [
      {
        id: 'elgin-standard',
        type: 'Standard',
        name: 'Standard Room',
        pricePerNight: 129,
        maxGuests: 2,
        sizeSqm: 26,
        beds: '1 queen bed',
        amenities: ['Free Wi-Fi', 'TV', 'Coffee maker'],
      },
      {
        id: 'elgin-deluxe',
        type: 'Deluxe',
        name: 'Deluxe Canal View Room',
        pricePerNight: 179,
        maxGuests: 3,
        sizeSqm: 33,
        beds: '1 king bed',
        amenities: ['Free Wi-Fi', 'Canal view', 'Mini fridge'],
      },
      {
        id: 'elgin-suite',
        type: 'Suite',
        name: 'Elgin Family Suite',
        pricePerNight: 269,
        maxGuests: 5,
        sizeSqm: 58,
        beds: '2 queen beds',
        amenities: ['Free Wi-Fi', 'Two bedrooms', 'Kitchenette', 'Breakfast included'],
      },
    ],
  },
  {
    id: 'glebe-gardens',
    name: 'Glebe Gardens Inn',
    neighbourhood: 'The Glebe',
    stars: 3,
    rating: 4.5,
    reviewCount: 438,
    description:
      'A quiet, garden-side inn near Lansdowne Park — a calm base with a neighbourhood feel.',
    amenities: ['Free Wi-Fi', 'Breakfast included', 'Garden terrace', 'Free parking'],
    gradient: 'linear-gradient(135deg, #7c4a1e 0%, #b97f3e 55%, #e0b070 100%)',
    rooms: [
      {
        id: 'glebe-standard',
        type: 'Standard',
        name: 'Standard Garden Room',
        pricePerNight: 109,
        maxGuests: 2,
        sizeSqm: 22,
        beds: '1 queen bed',
        amenities: ['Free Wi-Fi', 'TV', 'Garden view'],
      },
      {
        id: 'glebe-deluxe',
        type: 'Deluxe',
        name: 'Deluxe Garden Room',
        pricePerNight: 149,
        maxGuests: 2,
        sizeSqm: 30,
        beds: '1 king bed',
        amenities: ['Free Wi-Fi', 'Garden terrace access', 'Mini fridge', 'Breakfast included'],
      },
      {
        id: 'glebe-suite',
        type: 'Suite',
        name: 'Lansdowne Suite',
        pricePerNight: 219,
        maxGuests: 4,
        sizeSqm: 48,
        beds: '1 king bed + sofa bed',
        amenities: ['Free Wi-Fi', 'Separate living room', 'Breakfast included'],
      },
    ],
  },
  {
    id: 'kanata-lakeside',
    name: 'Kanata Lakeside Hotel',
    neighbourhood: 'Kanata',
    stars: 3,
    rating: 4.2,
    reviewCount: 301,
    description:
      'Affordable comfort in Kanata with free parking — a practical base for west-end stays.',
    amenities: ['Free Wi-Fi', 'Free parking', 'Pool', 'Fitness centre'],
    gradient: 'linear-gradient(135deg, #0f4c5c 0%, #2a7f8f 55%, #7cc4cf 100%)',
    rooms: [
      {
        id: 'kanata-standard',
        type: 'Standard',
        name: 'Standard Room',
        pricePerNight: 99,
        maxGuests: 2,
        sizeSqm: 24,
        beds: '1 queen bed',
        amenities: ['Free Wi-Fi', 'TV', 'Coffee maker'],
      },
      {
        id: 'kanata-deluxe',
        type: 'Deluxe',
        name: 'Deluxe Lake View Room',
        pricePerNight: 139,
        maxGuests: 3,
        sizeSqm: 32,
        beds: '1 king bed',
        amenities: ['Free Wi-Fi', 'Lake view', 'Mini fridge'],
      },
      {
        id: 'kanata-suite',
        type: 'Suite',
        name: 'Kanata Family Suite',
        pricePerNight: 199,
        maxGuests: 5,
        sizeSqm: 54,
        beds: '2 queen beds',
        amenities: ['Free Wi-Fi', 'Two bedrooms', 'Kitchenette'],
      },
    ],
  },
];

/**
 * A hotel matches the search when it is in the chosen neighbourhood (or the
 * search is anywhere) and at least one of its room types can hold the guests
 * assigned to a single room (guests split evenly across the requested rooms).
 */
export function filterHotels(params: SearchParams): Hotel[] {
  const perRoomGuests = Math.ceil(params.guests / params.rooms);
  return HOTELS.filter((hotel) => {
    const inArea =
      params.neighbourhood === 'Anywhere in Ottawa' ||
      hotel.neighbourhood === params.neighbourhood;
    if (!inArea) return false;
    return hotel.rooms.some((room) => room.maxGuests >= perRoomGuests);
  });
}

/** Cheapest nightly rate for a hotel, used on the results list. */
export function lowestPrice(hotel: Hotel): number {
  return Math.min(...hotel.rooms.map((room) => room.pricePerNight));
}
