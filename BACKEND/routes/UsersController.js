

const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const config = require('../utils/config.js')
const jwt = require("jsonwebtoken");

const saltRounds = 10;

module.exports.signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Validate the input
    const schema = Joi.object({
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the email already exists in the database
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user and save it to the database
    const newUser = new UserModel({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // TOKEN Code Later Added
    const user = await UserModel.findOne({ email });
    const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
        },
        config.key,
        { expiresIn: '1h' }
      );
  
      res.header("auth-token", token).send({
        code: 200,
        message: "SignUp Success",
        token: token,
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          usertype: user.usertype
        },
      });
      // TOKEN END

    //res.status(200).json({ message: 'Signup success' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// This sign up works well.
/*
const UserModel = require('../models/UserModel');
const jwt = require("jsonwebtoken");
const config = require('../utils/config.js')


module.exports.signup = (req, res) => {
    console.log(req.body)

    // email should not exist already

    const newUser = new UserModel({
        fullname: req.body.fullname,
        //usertype: req.body.usertype,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save().then(() => {
        res.send({ code: 200, message: 'Signup success' })
    }).catch((err) => {
        res.send({ code: 500, message: 'Signup Err' })
    })

}*/
//

// Works for un-hashed password
/*
module.exports.signin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  UserModel.findOne({ email: email })
    .then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check password
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Create token for user session
      const token = jwt.sign(
        { id: user._id, email: user.email },
        config.key,
        { expiresIn: '1h' }
      );

      // Return token and user details
      res.json({ token: token, user: { id: user._id, username:user.fullname, email: user.email, usertype: user.usertype } });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};
*/


module.exports.signin = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      config.key,
      { expiresIn: '1h' }
    );

    res.header("auth-token", token).send({
      code: 200,
      message: "Login Success",
      token: token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        usertype: user.usertype
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};




module.exports.GetUsers = async (req, res) => {
    console.log(req.body)
    try {
        const users = await UserModel.find({});
        const sortedByCreationDate = users.sort(
            (a, b) => b.createdAt - a.createdAt
        );
        res.send(sortedByCreationDate);
    } catch (error) {
        res.status(400).send("Error while getting list of Users. Try again later.");
    }
}





// users.get('/users', (req, res) => {
//   users.find()
//       .then((availableusers) => {
//           return res.status(200).json({
//               success: true,
//               existingRequests: availableusers
//           });
//       })
//       .catch((err) => {
//           return res.status(400).json({
//               error: err
//           });
//       });
// });