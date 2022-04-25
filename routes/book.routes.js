const Book = require("../models/Book.model");
//const Book = model("Book", bookSchema);

const router = require("express").Router();

// TASK
// 
// when user visits localhost:3000/books
// 
// - send query to DB to get list of books
// - if query is successful:
//   --> console.log the list of books + res.send("great news!")
// 
// 

router.get("/books", (req, res, next) => {
  Book.find()
    .then((booksArr) => {
      // console.log(booksArr[0].title);
      // res.send("great news!");
      res.render("books/books-list", { books: booksArr })
    })
    .catch(err => {
      console.log("error getting books from DB ", err);
      next(err);
    })

});


router.get("/books/:bookId", (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
    .then(bookDetails => {
      console.log(bookDetails);
      res.render("books/book-details", { book: bookDetails });

    })
    .catch(err => {
      console.log("error getting book datails from DB", err);
      next(err)
    })
})

module.exports = router;