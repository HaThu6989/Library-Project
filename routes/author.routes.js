const Author = require("../models/Author.model");

const router = require("express").Router();


// CREATE: display list of authors
router.get("/", (req, res, next) => {
  Author.find()
    .then((authorsArr) => {
      console.log(authorsArr)
      res.render("authors/authors-list", { authors: authorsArr });
    })
    .catch(err => {
      console.log("error getting books from DB", err)
      next(err);
    });
});



module.exports = router;