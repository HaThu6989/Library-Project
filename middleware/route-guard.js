const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/login'); //if user not logged in, redirect to "/login"
  }
  next();
};


const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

module.exports = { isLoggedIn, isLoggedOut };