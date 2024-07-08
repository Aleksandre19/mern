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

router.route('/').post(register).get(allUsers);
router.post('/logout', logout);
router.post('/login', auth);
router.route('/profile').get(getProfile).put(updateProfile);
router
  .route('/:id')
  .get(validateObjectId, userById)
  .delete(validateObjectId, deleteUser)
  .put(validateObjectId, updateUser);

module.exports = router;
