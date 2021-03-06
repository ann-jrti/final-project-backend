import {
  createUser,
  getUserByEmailNoStatus,
  retrieveSuccessUserByEmailAndPassword,
  updateValidUser,
  retrieveDataCustomLolProfile,
} from '../users/users.model.js';
import {
  createValidationToken,
  deleteValidationToken,
  retrieveValidationToken,
} from './auth.model.js';
import { generateValidationToken, encodePassword } from './auth.utils.js';
import { sendValidationEmail } from '../../adapters/email.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { DB_PW, JWT_SECRET } = process.env;

export const registerCtrl = async (req, res) => {
  try {
    const user = await getUserByEmailNoStatus(req.body.email);
    if (user === null) {
      req.body.password = encodePassword(req.body.password);
      await createUser({ ...req.body, status: 'pending-validation' }); // creates user and saves it in database
      const token = generateValidationToken(); // generates token for user
      await createValidationToken(token, req.body.email); // saves it in db and ties token to user
      sendValidationEmail(
        req.body.email,
        `http://localhost:3000/validate?token=${token}`
      );
      res.sendStatus(201);
    } else {
      res.sendStatus(409); //it already exists the user in the ddbb
    }
  } catch (err) {
    log.info(err);
    res.sendStatus(500);
  }
};

export const validateEmailCtrl = async (req, res) => {
  const { token } = req.query;
  log.info(token);
  const validateToken = await retrieveValidationToken(token);
  if (validateToken !== null) {
    await deleteValidationToken(token);
    await updateValidUser(validateToken.user);
    res.send(200);
  } else {
    res.sendStatus(404);
  }
};

export const loginCtrl = async (req, res) => {
  const { email, password } = req.body;
  const user = await retrieveSuccessUserByEmailAndPassword(
    email,
    encodePassword(password)
  );
  const customProfile = await retrieveDataCustomLolProfile(email);

  if (user !== null) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    res.status(201).json({
      access_token: token,
      email: user.email,
      username: user.username,
      playername: customProfile ? customProfile.basicInfo.name : undefined,
    });
  } else {
    res.sendStatus(404);
  }
};
