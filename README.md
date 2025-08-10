# Field Builder App

A React + TypeScript application for building customizable form fields with real-time validation, persistence, and flexible configuration.

## Features

- **Field types:** Label, Default Value, Choices, Order, Type, Required.
- **Validations:**
  - Label is required.
  - Maximum 50 choices allowed.
  - No duplicate choices allowed.
  - Default value cannot be added if 50 choices already exist.
- **Persistent state:** Saves form data in `localStorage`.
- **Reusable components:** Modular field components with error handling.
- **Responsive layout:** Works on mobile and desktop.
- **Testing:** Includes Jest + React Testing Library tests.

## Tech Stack

- **React** (with Hooks)
- **TypeScript**
- **SCSS Modules** for styling
- **Jest** + **React Testing Library** for testing

## Project Structure

```
src/
  components/
    fields/
      LabelField/
      DefaultValueField/
      ChoicesField/
      RequiredCheckboxField/
      LabeledSelectField/
    footer/
    shared/
  hooks/
    useFormReducer.ts
  helpers/
    index.ts
  types/
    index.ts
  services/
    FieldService.ts
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Run tests

```bash
npm run test
```

## Usage

1. Fill in the **Label** field (required).
2. Add choices (one per line, max 50).
3. Select **Order** (alphabetical or reverse).
4. Optionally set a **Default Value** (must be in choices).
5. Mark **Required** if needed.
6. Submit or clear the form.
