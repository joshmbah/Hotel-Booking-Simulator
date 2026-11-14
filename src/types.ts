/** Typed models for Grand Hotel. Front-end only — no backend, no accounts, no payments. */

export interface Room {
  id: string;
  type: 'Standard' | 'Deluxe' | 'Suite';
  name: string;
  pricePerNight: number; // CAD
  maxGuests: number;
  sizeSqm: number;
  amenities: string[];
  beds: string;
}

export interface Hotel {
  id: string;
  name: string;
  neighbourhood: string;
  stars: number; // 1–5
  rating: number; // guest rating out of 5
  reviewCount: number;
  description: string;
  amenities: string[];
  rooms: Room[];
  /** Photo for the hotel (from the demo's photo set, in public/images). */
  image: string;
}

export interface SearchParams {
  neighbourhood: string; // 'Anywhere in Ottawa' or a neighbourhood name
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: number;
  rooms: number;
}

export type CarType = 'Compact' | 'SUV' | 'Luxury';

export interface CarRental {
  carType: CarType;
  dailyRate: number; // CAD
}

export interface Booking {
  hotel: Hotel;
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  guestName: string;
  guestEmail: string;
  specialRequests: string;
  carRental: CarRental | null;
  reference: string; // mock reference, e.g. HB-4821
}

export interface PriceBreakdown {
  nights: number;
  roomSubtotal: number;
  carSubtotal: number;
  tax: number;
  total: number;
}

export const TAX_RATE = 0.13; // Ontario HST

export const CAR_RENTAL_RATES: Record<CarType, number> = {
  Compact: 45,
  SUV: 75,
  Luxury: 120,
};

export function nightsBetween(checkIn: string, checkOut: string): number {
  const start = new Date(`${checkIn}T12:00:00`);
  const end = new Date(`${checkOut}T12:00:00`);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((end.getTime() - start.getTime()) / msPerDay);
}

export function formatMoney(amount: number): string {
  return amount.toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });
}

export function buildPriceBreakdown(booking: Booking): PriceBreakdown {
  const nights = nightsBetween(booking.checkIn, booking.checkOut);
  const roomSubtotal = booking.room.pricePerNight * nights * booking.rooms;
  const carSubtotal = booking.carRental
    ? booking.carRental.dailyRate * nights
    : 0;
  const tax = (roomSubtotal + carSubtotal) * TAX_RATE;
  return {
    nights,
    roomSubtotal,
    carSubtotal,
    tax,
    total: roomSubtotal + carSubtotal + tax,
  };
}

export function makeReference(): string {
  return `HB-${Math.floor(1000 + Math.random() * 9000)}`;
}
