const mongodb = require("./create_mangodb_db");
const userModel = require("./schema");
const jwt = require("jsonwebtoken");

const UserQuery = {
  insertUser: async (req, res) => {
    let userObj = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      address: req.body.address,
      mob_no: req.body.mob_no,
      password: req.body.password,
      price: req.body.price,
    };

    userModel
      .create(userObj)
      .then(() => {
        return res.json(userObj);
      })
      .catch((e) => {
        return res.json({
          error: e.message,
        });
      });
  },
  showUser: async (req, res) => {
    const data = await userModel.find();
    return res.json({
      users: data,
    });
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    userModel.findOne(
      {
        email: email,
      },
      function (err, user) {
        if (err) throw err;
        if (!user || user.comparePassword(password, user.password)) {
          return res.status(401).json({
            message: "Authentication failed. Invalid user or password.",
          });
        }
        return res.json({
          token: jwt.sign(
            { email: user.email, fullName: user.fullName, _id: user._id },
            "RESTFULAPIs"
          ),
        });
      }
    );
  },
  singleUser: async (req, res) => {
    const data = await userModel.find({ email: req.params.email });
    return res.json({
      users: data,
    });
  },

  filterUser: async (req, res) => {
    const data = await userModel.find({ role: req.params.role });
    return res.json({
      users: data,
    });
  },

  delete: async (req, res) => {
    const a = await userModel.deleteOne({ _id: req.params._id });
    if (a.deletedCount !== 0) {
      return res.json({
        message: "Users data deleted successfully",
      });
    } else {
      return res.json({
        message: "Wrong id no data deleted",
      });
    }
  },
  update: async (req, res) => {
    const data = await userModel.updateOne(
      { _id: req.params._id },
      {
        $set: {
          role: req.body.role,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          address: req.body.address,
          mob_no: req.body.mob_no,
          price: req.body.price,
        },
      }
    );
    if (data.matchedCount > 0) {
      return res.json({
        message: "data updated successfully",
      });
    } else {
      return res.json({
        message: "Nothing to update or wrong id passed",
      });
    }
  },
};
module.exports = UserQuery;
