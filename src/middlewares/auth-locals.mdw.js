module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.authUser = req.user;
    if(res.locals.authUser.Type_account =='0'){
      res.locals.isReader=true;
    }
    else if(res.locals.authUser.Type_account =='1'){
      res.locals.isWriter=true;
    }
    else if(res.locals.authUser.Type_account =='2'){
      res.locals.isEditor=true;
    }
    else if(res.locals.authUser.Type_account =='3'){
      res.locals.isAdmin=true;
    }
  }
  next();
}