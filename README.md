# Hotel Booking Website

A hotel booking front end built with React and TypeScript (Vite). Search five fictional Ottawa hotels, pick a room, fill in the booking form, and get a confirmation with a reference code and a downloadable confirmation file.

Scope, stated plainly: this is a front end demo. There is no backend. No accounts, no payments, no real bookings. Every hotel, price and availability result is mock data that lives in `src/data.ts`, and the site says so where it matters.

## Live demo

[hotel-booking-simulator.vercel.app](https://hotel-booking-simulator.vercel.app), deployed on Vercel from this repo. Every push to main redeploys it.

## What it does

- Search by dates, guests and rooms, with a neighbourhood search in the code version
- A rooms view for each hotel: Standard, Deluxe and Suite, with prices and amenities
- A booking form with custom validation: a message per field and a summary of what is wrong
- An optional car rental add on
- One pricing function behind every screen, so the room card, the summary and the confirmation always agree: nightly rate times nights, plus add ons, plus 13% HST
- A confirmation with a reference code and a file the browser generates for you to download

## Tech

- **React:** the flow is components (search, results, rooms, booking, confirmation) passing your picks down as props, with state updating the screens live
- **TypeScript:** the shapes of a Hotel, a Room and a Booking are typed, so a wrong field fails the build instead of producing a wrong price
- **Vite:** the dev server while building, and the build step that produces the deployable static site
- **Plain CSS:** one hand written stylesheet, `styles.css`. No framework, no preprocessor

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build it

```bash
npm run build
```

This type-checks the project (`tsc`) and produces a static site in `dist/`. Preview the production build with `npm run preview`.

## Project structure

```
src/
  main.tsx            Entry point
  App.tsx             Screen state machine (search, results, rooms, booking, confirmation)
  types.ts            Typed models: Hotel, Room, SearchParams, Booking, and the price math
  data.ts             Mock data: 5 fictional Ottawa hotels, room types, search filter
  dates.ts            Date helpers
  components/
    SearchForm.tsx    Destination, dates, guests, rooms, plus validation
    ResultsList.tsx   Filtered hotel list with nightly prices
    HotelRooms.tsx    A hotel's Standard, Deluxe and Suite rooms
    BookingForm.tsx   Guest details, dates, car rental add on, live price summary
    Confirmation.tsx  Booking summary, price breakdown, reference code
  styles.css          Single plain CSS stylesheet. Hotel and room visuals are photos (public/images)
```

## The original version (2018)

This project started in 2018 as a school project in PHP and MySQL, called Grand Hotel. That version was a full stack site: guest accounts with login, a real MySQL database with four tables, and a booking engine that saved requests, with an optional car rental. It was assigned as a two person project. My partner never showed up, so I built all of it myself.

The 2018 code is not in this repo and is not published. It stored passwords in plain text and its queries were open to SQL injection. It was a first project, it taught me a lot, and it stays private. This repo is the rebuild.

A muted recording of that 2018 site running is here though: [hotel-booking-2018-demo.mp4](hotel-booking-2018-demo.mp4), about three minutes, so you can see what it did.
