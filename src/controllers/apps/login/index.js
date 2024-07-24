
const AD = require('ad');

const asynHandler = require('../../../middleware/async');
const page = 'Home';
exports.RenderLogin = asynHandler(async (req, res) => {
  res.render('apps/login/', {
    layout: 'login.hbs',
    pageData: page,
    pageIndex: 'Home',
    home: true,
  });
});

exports.UserLogin = asynHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const ad = new AD({
      url: 'ldap://CALBANKDC1.CALBANKGH.COM',
      user: `${username}@calbankgh.com`,
      pass: password,
    });

    let authme = await ad.user(username).authenticate(password);
    if (!authme) {
      req.flash('error_msg', 'Invalid Username or password');
      return res.redirect('/');
    }
    let getGroup = await ad.user(username).isMemberOf('ElevyDashboard');

    let userDetails = await ad.user(username).get();
    //save log

    if (authme) {
      if (authme && getGroup) {
        req.session.user = userDetails.sAMAccountName;
        req.session.email = userDetails.mail;
        req.session.fullName = userDetails.displayName;
        req.session.isAssigned = getGroup;
        res.redirect('/');
      } else {
        req.session.user = userDetails.sAMAccountName;
        req.session.email = userDetails.mail;
        req.session.fullName = userDetails.displayName;
        req.session.isAssigned = getGroup;
        res.redirect('/');
      }
    } else {
      req.flash('error_msg', 'Sorry, you do not have access');
      return res.redirect('/login');
    }
  } catch (error) {
    req.flash('error_msg', 'System Login Failed');
    return res.redirect('/login');
  }
});

exports.UserLogout = asynHandler(async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send('Unable to log out');
      } else {
        res.redirect('/login');
      }
    });
  } else {
    res.end();
  }
});
