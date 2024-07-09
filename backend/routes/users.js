const express = require('express');
const router = express.Router();
const {
  auth,
  register,
  logout,
  getProfile,
  updateProfile,
  allUsers,
  userById,
  deleteUser,
  updateUser,
} = require('../controllers/user');
const validateObjectId = require('../middlewares/validateObjectId');
const { isAuth, isAdmin } = require('../middlewares/auth');

router.route('/').post(register).get(isAuth, isAdmin, allUsers);
router.post('/logout', logout);
router.post('/auth', auth);
router.route('/profile').get(isAuth, getProfile).put(isAuth, updateProfile);
router
  .route('/:id')
  .get(isAuth, isAdmin, validateObjectId, userById)
  .delete(isAuth, isAdmin, validateObjectId, deleteUser)
  .put(isAuth, isAdmin, validateObjectId, updateUser);

module.exports = router;
