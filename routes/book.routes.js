const Book = require("../models/Book.model");
const Author = require("../models/Author.model");

const router = require("express").Router();

const { isLoggedIn } = require("../middleware/route-guard");

// READ: display list of books
router.get("/", (req, res, next) => {
  Book.find()
    .populate("author")
    .then((booksArr) => {
      res.render("books/books-list", { books: booksArr });
    })
    .catch(err => {
      console.log("error getting books from DB", err)
      next(err);
    });
});


// CREATE: render form
router.get("/create", isLoggedIn, (req, res, next) => {
  Author.find()
    .then((authorsArr) => {
      res.render("books/book-create", { authors: authorsArr });
    })
    .catch(err => {
      console.log("error getting authors from DB", err)
      next(err);
    });
})


// CREATE: process form
router.post("/create", isLoggedIn, (req, res, next) => {

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
router.get("/:bookId", (req, res, next) => {
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
router.get("/:bookId/edit", isLoggedIn, (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
    .then((bookDetails) => {
      res.render("books/book-edit", bookDetails);
    })
    .catch(err => {
      console.log("error getting book details from DB", err)
      next(err);
    });
});



// UPDATE: process form
router.post("/:bookId/edit", isLoggedIn, (req, res, next) => {

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



// DELETE.
router.post("/:bookId/delete", isLoggedIn, (req, res, next) => {
  const id = req.params.bookId;
  Book.findByIdAndRemove(id)
    .then(response => {
      res.redirect("/books");
    })
    .catch(err => {
      console.log("error deleting book from DB", err);
      next(err);
    });

});


module.exports = router;