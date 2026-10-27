# Flight Booking Portal — Angular 22

A small, beginner-friendly flight booking assignment built with **Angular 22**, standalone components, Reactive Forms, Angular Signals, routing, services, and local mock flight data. It demonstrates the main flight-booking journey without connecting to a real airline or payment provider.

## 1. What this project does

1. Search for sample flights using origin, destination, and departure date.
2. Optionally mark the search as a round trip and enter a return date.
3. Display matching mock flights as reusable flight cards.
4. Filter results by **airline** and **departure-time slot** (morning, afternoon, evening).
5. Sort results by **price (lowest to highest / highest to lowest)** or **duration (shortest / longest)**.
6. Select a flight and enter passenger/contact details on the booking page. Passenger count is collected here, not on the search page.
7. Show a booking confirmation with a generated reference.
8. Validate form entries and protect booking/confirmation routes when required information is missing.

All prices and flights are sample data. This is a frontend demonstration: it does not make real reservations, charge a card, or persist bookings after the page is refreshed.

## 2. Requirements and tools

- Node.js version supported by the installed Angular CLI (use a current LTS release).
- npm, installed with Node.js.
- Angular CLI 22 (the project uses Angular 22 packages).
- A code editor such as Visual Studio Code.

Check your local versions:

```bash
node --version
npm --version
```

## 3. Run the application

Open a terminal in the project root—the directory containing `package.json`—and run:

```bash
npm install
npm start
```

Open the local URL printed by Angular CLI in the terminal (normally `http://localhost:4200`). To create a production build, run:

```bash
npm run build
```

To run the unit tests, run:

```bash
npm test
```

If the package manager reports a Node.js/Angular compatibility error, use a Node.js release supported by Angular 22 and then repeat the install.

## 4. How to try the booking flow

1. On the **Search** page, choose a source, destination, and departure date. The source and destination must differ.
2. Optionally select **Round trip** and provide a return date that is not earlier than the departure date.
3. Select **Search flights**.
4. On **Results**, use the airline checkboxes and departure-time checkboxes to narrow the results. Use the sort dropdown to order by price or duration in either direction.
5. Select a flight card to open **Booking**.
6. Enter the passenger's name, email, phone number, and passenger count, then submit the form.
7. Review the **Confirmation** page and its booking reference.

The available mock routes depend on the records in `src/assets/flights.json`. If a route/date combination has no records, the results page displays an empty-state message.

## 5. Folder structure

```text
flight-booking-portal/
├── README.md                         # Assignment overview and run instructions
├── package.json                      # Dependencies and npm scripts
├── angular.json                      # Angular CLI build/test configuration
├── tsconfig*.json                    # TypeScript compiler settings
└── src/
    ├── index.html                    # Browser entry HTML
    ├── main.ts                       # Bootstraps the standalone Angular app
    ├── styles.scss                   # Global design tokens and shared styles
    ├── assets/
    │   └── flights.json               # Local sample flight dataset
    └── app/
        ├── app.component.*            # Root application shell
        ├── app.config.ts              # App-wide providers
        ├── app.routes.ts              # Search/results/booking/confirmation routes
        ├── core/
        │   ├── guards/                 # Route guards for booking journey
        │   ├── models/                 # TypeScript data contracts
        │   └── services/               # Flight lookup and shared booking state
        ├── features/
        │   ├── search/                 # Search form and validation
        │   ├── results/                # Results, filtering, sorting, selection
        │   ├── booking/                # Passenger form and booking submission
        │   └── confirmation/            # Final booking summary
        └── shared/
            ├── flight-card/            # Reusable flight result card
            └── filter-sidebar/         # Reusable filter and sort controls
```

Angular's standalone component approach means each component declares the dependencies it imports; the project does not need a traditional `AppModule`.

## 6. Main files and components explained

### Application setup

- **`src/main.ts`** — starts Angular using the root component and application configuration.
- **`src/app/app.component.ts` / `.html` / `.scss`** — the root shell and shared page layout.
- **`src/app/app.config.ts`** — registers providers used across the application, such as routing.
- **`src/app/app.routes.ts`** — maps URL paths to Search, Results, Booking, and Confirmation components and attaches route guards where needed.
- **`src/styles.scss`** — global typography, colors, buttons, panels, and reusable layout styles.

### Models (`src/app/core/models/`)

- **`flight.model.ts`** — the shape of a flight, including its ID, airline, route, departure/arrival times, duration, stops, and fare.
- **`search-criteria.model.ts`** — the search form values shared with the results page: source, destination, departure date, round-trip flag, and return date. Passenger count is intentionally not part of search criteria.
- **`booking.model.ts`** — the passenger contact details and the completed booking summary, including reference, selected flight, passenger count, return date, and creation time.

### Services and guards (`src/app/core/`)

- **`flight.service.ts`** — reads the local mock flight data and returns flights matching the search criteria. No external API is called.
- **`booking.service.ts`** — shares search criteria, selected flight, and booking state between routed pages using Angular Signals. It creates a demo booking reference in memory.
- **`booking.guard.ts`** — prevents opening the booking page without first selecting a flight.
- **`confirmation.guard.ts`** — prevents opening confirmation without a completed booking.

### Feature pages (`src/app/features/`)

- **`search/search.component.ts`** — defines a Reactive Form, validates origin/destination and dates, saves criteria through `BookingService`, then navigates to results. The page intentionally does not ask for passenger count.
- **`search/search.component.html`** — presents the origin, destination, departure date, optional round-trip date, and search action.
- **`results/results.component.ts`** — loads matching mock flights and uses signals/computed state to apply selected filters and sorting. It passes each selected flight to the booking service before navigation.
- **`results/results.component.html`** — lays out the filter sidebar and flight cards and provides an empty state when no flights match.
- **`booking/booking.component.ts`** — validates passenger name, email, phone, and passenger count, then creates a booking.
- **`booking/booking.component.html`** — displays the selected flight and the passenger form.
- **`confirmation/confirmation.component.ts` and `.html`** — display the completed booking details and generated reference.

### Reusable shared components (`src/app/shared/`)

- **`flight-card/flight-card.component.ts` and `.html`** — presents one flight's airline, times, duration, stops, and fare. It emits a `select` event instead of navigating itself, keeping it reusable.
- **`filter-sidebar/filter-sidebar.component.ts` and `.html`** — presents airline checkboxes, departure-time-slot checkboxes, and a sort dropdown. It emits changes to the Results page, where the filtering/sorting logic lives. Supported sorting is price ascending/descending and duration ascending/descending. There is deliberately no “Non-stop only” control and no departure-time sorting option.

### Unit tests

Files ending in **`.spec.ts`** contain tests for components, services, and guards. They help verify form behavior, filtering/sorting, booking state, and route protection. Run them with `npm test`.

## 7. Angular concepts used

- **Standalone components** — components import their own template dependencies.
- **Reactive Forms** — form values and validation rules are defined in TypeScript.
- **Services and dependency injection** — shared logic/state is kept out of presentation templates.
- **Signals and computed signals** — store current criteria and selected filters, and derive visible results reactively.
- **Inputs and outputs** — reusable components receive data and emit user actions.
- **Routing and route guards** — separate the journey into pages and protect steps that require prior state.
- **TypeScript interfaces** — document and type-check flight, search, passenger, and booking data.
- **Unit tests** — provide regression checks for core behavior.

## 8. Assignment feature checklist

### Implemented

- [x] Flight search by source, destination, and departure date.
- [x] Origin/destination validation and prevention of identical cities.
- [x] Round-trip toggle and return-date validation.
- [x] Results page using local sample flight data.
- [x] Reusable flight cards.
- [x] Airline checkbox filter.
- [x] Departure-time slots: morning, afternoon, and evening.
- [x] Sort by price ascending and descending.
- [x] Sort by duration shortest-first and longest-first.
- [x] Select a flight and proceed to passenger booking.
- [x] Passenger/contact form validation, with passenger count on the Booking page only.
- [x] Booking confirmation and generated booking reference.
- [x] Route guards for booking and confirmation steps.
- [x] Responsive styling and empty-results messaging.
- [x] Unit-test files for key components, services, and guards.
- [x] README documentation and code comments/JSDoc in the main application files.

## 9. Source data and customization

Edit **`src/assets/flights.json`** to change the sample flight records. Keep each record consistent with the `Flight` interface in `src/app/core/models/flight.model.ts`. The Results page can only show routes that exist in this data file.

## 10. Submission notes

Submit the project folder with this README and the source files. If your submission portal accepts ZIP files, compress the `flight-booking-portal` folder itself. Do not include `node_modules`; it can be recreated from `package.json` with `npm install`.

**Important:** this is an educational mock application. Describe it as a working frontend prototype, not as a production booking system.
