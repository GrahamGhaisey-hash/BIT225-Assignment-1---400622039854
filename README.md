# BlueLib Catalogue

A single-page front-end for the BlueCrest College Library, built with plain HTML, CSS and JavaScript (no frameworks or libraries).

## Features

- **Browse books** — books are stored in a JavaScript array (`js/app.js`) and rendered as cards on page load, not hard-coded into the HTML.
- **Search and filter** — a search box filters cards by title as you type, and a category dropdown narrows the list to IT, Business, Science or Arts.
- **Add a book** — the "Add a Book" form validates that every field is filled and that copies is a whole number of 0 or more, then adds the book to the grid without a page reload.
- **Borrow button** — each card has a Borrow button that reduces copies by 1. When copies reach 0 the card shows "Out of stock" and the button disables itself.

## Folder structure

```
index.html
css/
  style.css
js/
  app.js
README.md
```

## Responsive layout

The book grid uses CSS Grid with one media query breakpoint: 3 cards per row on desktop, 2 on tablet (≤900px), 1 on mobile (≤600px). Colours are defined as CSS custom properties in `:root`, and cards/buttons have a hover effect.

## Notes

Built as a coursework submission for BIT225 Advanced Web Technologies, Assignment 2.
