const Book = require("../models/Book.model");

const router = require("express").Router();


// READ: display list of books
router.get("/books", (req, res, next) => {
  Book.find()
    .then((booksArr) => {
      res.render("books/books-list", { books: booksArr });
    })
    .catch(err => {
      console.log("error getting books from DB", err)
      next(err);
    });
});


// CREATE: render form
router.get("/books/create", (req, res, next) => {
  res.render("books/book-create");
})


// CREATE: process form
//"/books/create" luon dung trc "/books/:bookId" : router.get("/books/:bookId", (req, res, next)
//neu ko => error
router.post("/books/create", (req, res, next) => {

  const newBook = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating,
  }

  Book.create(newBook)
    .then((bookFromDB) => {
      res.redirect("/books");
    })
    .catch(err => {
      console.log("error creating book on DB", err)
      next(err);
    });

})


// READ: display book details
router.get("/books/:bookId", (req, res, next) => {
  const id = req.params.bookId;

  Book.findById(id)
    .then((bookDetails) => {
      res.render("books/book-details", bookDetails);
    })
    .catch(err => {
      console.log("error getting book details from DB", err)
      next(err);
    });
})


// UPDATE: display form
router.get("/books/:bookId/edit", (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
    .then((bookDetails) => {
      res.render("books/book-edit", bookDetails);
    })
    .catch(err => {
      console.log("error updating book from DB", err)
      next(err);
    });
});



// UPDATE: process form
router.post("/books/:bookId/edit", (req, res, next) => {

  const id = req.params.bookId;

  const newDetails = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating,
  };

  Book.findByIdAndUpdate(id, newDetails)
    .then((bookFromDB) => {
      res.redirect(`/books/${bookFromDB._id}`);
    })
    .catch(err => {
      console.log("error updating book in DB", err)
      next(err);
    });
});

//DELETE
router.post("/books/:bookId/delete", (req, res, next) => {
  const id = req.params.bookId;
  Book.findByIdAndRemove(id,)
    .then((response) => {
      res.redirect("/books/");
    })
    .catch(err => {
      console.log("error deleting book in DB", err)
      next(err);
    });
})

module.exports = router;