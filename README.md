# React Vite Point in Circle

An interactive React + Vite application that determines whether a given point is **inside**, **outside**, or **on the circumference of a circle**.

## Features

* Enter the circle's center coordinates `(x, y)`
* Enter the circle's radius
* Enter the point coordinates `(x, y)`
* Determine the point's position relative to the circle
* Visual feedback for the result
* Simple and responsive user interface

## How It Works

The application calculates the squared distance between the point and the circle's center:

```text
d² = (x - cx)² + (y - cy)²
```

and compares it with the squared radius:

```text
r²
```

The point is classified as:

* **Inside** — `d² < r²`
* **On the circle** — `d² ≈ r²`
* **Outside** — `d² > r²`

A small tolerance is used when comparing floating-point values to account for numerical precision errors.

## Tech Stack

* [React](https://react.dev/)
* [Vite](https://vite.dev/)
* JavaScript
* CSS

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/thinkphp/point-in-circle.git
```

Navigate to the project directory:

```bash
cd point-in-circle
```

Install the dependencies:

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

The application will be available at the local address displayed in your terminal.

## Project Structure

```text
point-in-circle/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── index.html
├── package.json
└── vite.config.js
```

## Mathematical Concept

For a circle with center:

```text
C = (cx, cy)
```

and radius:

```text
r
```

and a point:

```text
P = (x, y)
```

the distance between `P` and `C` is compared with the radius.

Instead of calculating the actual distance using a square root, the application compares squared values. This avoids an unnecessary square-root operation:

```text
(x - cx)² + (y - cy)²
```

This approach is sufficient to determine the point's position relative to the circle.

## License

This project is available for educational and personal use.
