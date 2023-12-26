const express = require("express");
const ExpressError = require("../expressError");
const router = new express.Router();
const items = require("../fakeDb");

// GET /items - this should render a list of shopping items.
router.get('/', (req, res, next) => {
  return res.json(items);
})

// POST /items - this route should accept JSON data and add it to the shopping list.
router.post('/', (req, res, next) => {
  try {
    const newItem = req.body;
    items.push(newItem);
    res.json({ added: newItem });
  } catch (err) {
    return next(new ExpressError("Invalid data", 400))
  }
});

// GET /items/:name - this route should display a single item’s name and price.
router.get("/:name", (req, res, next) => {
  const itemName = req.params.name;
  const foundItem = items.find((item) => item.name === itemName);
  if (foundItem) {
    return res.json(foundItem);
  } else {
    return next(new ExpressError("Item not found", 404));
  }
});

// PATCH /items/:name, this route should modify a single item’s name and/or price.
router.patch("/:name", (req, res, next) => {
  const itemName = req.params.name;
  const foundIndex = items.findIndex((item) => item.name === itemName);
  if (foundIndex !== -1) {
    items[foundIndex] = { ...items[foundIndex], ...req.body };
    return res.json({ updated: items[foundIndex] });
  } else {
    return next(new ExpressError("Item not found", 404));
  }
});
// DELETE /items/:name - this route should allow you to delete a specific item from the array.
router.delete('/:name', (req, res, next) => {
  const { name } = req.params;
  console.log('Deleting item with name:', name);
  console.log('Request Parameters:', req.params);

  const index = items.findIndex((item) => item.name === name);
  console.log('Index:', index);
  console.log('Items before deletion:', items);

  if (index !== -1) {
    // Item found, remove it
    items.splice(index, 1);
    console.log('Items after deletion:', items);
    res.json({ message: 'Deleted' }); // Make sure to include the message property
  } else {
    // Item not found, send a 404 response
    const err = new Error('Item not found');
    err.status = 404;
    next(err);
  }
});

module.exports = router;