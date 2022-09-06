const express = require("express");
const Router = express.Router();
const UserQuery = require("./userQuery");

Router.route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .get((req, res, next) => {
    UserQuery.showUser(req, res);
  })
  .post((req, res, next) => {
    UserQuery.insertUser(req, res);
  });

Router.route("/auth/login")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .post((req, res, next) => {
    UserQuery.login(req, res);
  });

Router.route(`/email=:email`)
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .get((req, res, next) => {
    UserQuery.singleUser(req, res);
  });

Router.route(`/role=:role`)
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .get((req, res, next) => {
    UserQuery.filterUser(req, res);
  });

Router.route(`/:_id`)
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .delete((req, res, next) => {
    UserQuery.delete(req, res);
  })
  .put((req, res, next) => {
    UserQuery.update(req, res);
  });

module.exports = Router;
