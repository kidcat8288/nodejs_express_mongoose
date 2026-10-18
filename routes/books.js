const express = require("express");
const routes = express.Router();
const Bookmodel = require("../model/book.js");




// Get All Books
routes.get("/books", async (req, res) => {
  try {
    const books = await Bookmodel.find();
    res.send(books);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving books",
    });
  }
});

// Add NEW Book
routes.post("/books", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const book = new Bookmodel({
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear,
  });

  try {
    const data = await book.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the book.",
    });
  }
});

// Get All Books in sorted order (sorted by publishedYear)
routes.get("/books/sort", async (req, res) => {
  try {
    const books = await Bookmodel.find().sort({ publishedYear: 1 });
    res.send(books);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving sorted books.",
    });
  }
});

// Get Book By ID
routes.get("/book/:bookid", async (req, res) => {
  try {
    const book = await Bookmodel.findById(req.params.bookid);
    if (!book) {
      return res.status(404).send({ message: "Book not found with id " + req.params.bookid });
    }
    res.send(book);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving book with id " + req.params.bookid,
    });
  }
});

// Update existing Book By Id
routes.post("/book/:bookid", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  try {
    const book = await Bookmodel.findByIdAndUpdate(
      req.params.bookid,
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).send({ message: "Book not found with id " + req.params.bookid });
    }
    res.send(book);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating book with id " + req.params.bookid,
    });
  }
});

// Delete Book By ID
routes.delete("/book/:bookid", async (req, res) => {
  try {
    const book = await Bookmodel.findByIdAndDelete(req.params.bookid);
    if (!book) {
      return res.status(404).send({ message: "Book not found with id " + req.params.bookid });
    }
    res.send({ message: "Book was deleted successfully!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Could not delete book with id " + req.params.bookid,
    });
  }
});


//Get All Books in sorted Order
routes.get("/books/sort", async (req, res) => {
  try {
    const books = await Bookmodel.find().sort({ publishedYear: 1 }); // 1 for ascending, -1 for descending
    res.send(books);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving sorted books.",
    });
  }
});


// Get Books by Published Year
routes.get("/books/year/:year", async (req, res) => {
  try {
    const year = req.params.year;
    const books = await Bookmodel.find({ publishedYear: year });

    if (books.length === 0) {
      return res.status(404).send({ message: "No books found for the year " + year });
    }

    res.send(books);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving books by year.",
    });
  }
});







module.exports = routes;