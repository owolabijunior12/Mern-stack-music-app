const router = require('express').Router();
const user = require('../modules/user');
const admin = require('../configuration/firebase.configuration');


router.get('/login', async (req, res) => {
  try {
    //! Get the authorization header and decode the value


    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');
    const decodeValue = await admin.auth().verifyIdToken(token);

    if (!decodeValue) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userExists = await user.findOne({ user_id: decodeValue.user_id });
    if (!userExists) {
      newUserData(decodeValue, req, res);
    } else {
      updateNewData(decodeValue, req, res);
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
});
//! Function to create a new user if the user does not exist


const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verfied: decodeValue.email_verified,
    role: 'member',
    auth_time: decodeValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    return res.status(200).send({ user: savedUser });
  } catch (err) {
    return res.status(400).send({ success: false, msg: err });
  }
};

//! Function to update user data if the user already exists


const updateNewData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await user.findOneAndUpdate(filter, { auth_time: decodeValue.auth_time }, options);
    return res.status(200).send({ user: result });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, msg: error });
  }
};

//! Route to authenticate user


router.get('/login', async (req, res) => {
  try {
//     //! Get the authorization header and decode the value


    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');
    const decodeValue = await admin.auth().verifyIdToken(token);

    if (!decodeValue) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userExists = await user.findOne({ user_id: decodeValue.user_id });
    if (!userExists) {
      newUserData(decodeValue, req, res);
    } else {
      updateNewData(decodeValue, req, res);
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
});

//! Route to get all users


router.get('/getUser', async (req, res) => {
  try {
    const options = {
      sort: { createdAt: 1 }
    };
    const users = await user.find({}, null, options);
    if (users.length > 0) {
      res.status(200).send({ success: true, users });
    } else {
      res.status(200).send({ success: true, msg: 'No Data Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: 'Internal Server Error' });
  }
});
router.put("/updateRole/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };
  const role = req.body.role;
 
  const options = { new: true }; // Return the updated document

  try {
    const result = await user.findByIdAndUpdate(filter, { role }, options);
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(401).send({ success: false, msg: error });
  }
});


module.exports = router;
