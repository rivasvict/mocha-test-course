function AuthController() {

  let roles;
  let user;
  function setRoles(role) {
    roles = role;
  }
  function setUser(inUser) {
    user = inUser;
  }

  function isAuthorized({neededRole}) {
    if (user) {
      return user.isAuthorized(neededRole);
    }
  }

  function isAuthorizedAsync({neededRole, callback}) {
    setTimeout(() => {
      callback(roles.indexOf(neededRole) >= 0);
    }, 2100);

    return roles.indexOf(neededRole) >= 0;
  }

  function isAuthorizedPromise(neededRole) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(roles.indexOf(neededRole) >= 0);
      }, 2100);
    });
  }

  function getIndex(req, res) {
    if (req.user.isAuthorized('admin')) {
      return res.render('index');
    }
    res.render('error');
  }

  return {isAuthorized, isAuthorizedAsync, setRoles, isAuthorizedPromise, getIndex, setUser};
}

module.exports = AuthController();
