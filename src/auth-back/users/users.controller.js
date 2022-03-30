import {
  retrieveUserInfoByEmail,
  createLolProfile,
  deleteActiveOffer,
  updateCustomProfileStatus,
  retrieveDataCustomLolProfile,
  deleteUserAccount,
  deleteCustomProfile,
} from './users.model.js';

export const generateCustomLolProfile = async (req, res) => {
  const stats = {
    ...req.body,
  };
  log.info(JSON.stringify(stats));
  const { email } = req;

  await createLolProfile(stats, email);
  await updateCustomProfileStatus(req.email);
  res.status(201).json(stats);
};

export const getCustomLolProfile = async (req, res) => {
  try {
    const customLolProfile = await retrieveDataCustomLolProfile(req.email);
    log.info(JSON.stringify(customLolProfile));
    res.json(customLolProfile);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const getUserInfoByEmail = async (req, res) => {
  let { email } = req;
  const user = await retrieveUserInfoByEmail(email);
  if (user !== undefined) res.json(user);
  else res.sendStatus(404);
};

export const getDataOfCustomLolProfile = async (req, res) => {
  const { email } = req.params;
  const user = await retrieveDataCustomLolProfile(email);
  log.info('user', user);
  if (user) {
    await updateCustomProfileStatus(email);
    res.status(200).send(user);
  } else {
    res.status(404).json('email user not found');
  }
};

export const deleteUserAccountCtrl = async (req, res) => {
  let { email } = req;
  console.log('47', email);
  const userAccount = await retrieveUserInfoByEmail(email);
  const userActiveOffer = await retrieveDataCustomLolProfile(email);
  const userCustomProfile = await retrieveDataCustomLolProfile(email);
  console.log('49', userAccount, userActiveOffer, userCustomProfile);
  if (userAccount !== undefined) {
    await deleteUserAccount(userAccount);
    await deleteActiveOffer(userActiveOffer);
    await deleteCustomProfile(userCustomProfile);
    res.status(201).json('done');
  } else {
    res.status(400).json('this user doesnt exist');
  }
};
