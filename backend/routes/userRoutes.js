import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;

// import express from 'express';
// import {
//   authUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
// } from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// /**
//  * Auth & Register
//  */
// router.post('/register', registerUser);   // POST /api/users/register
// router.post('/login', authUser);           // POST /api/users/login
// router.post('/logout', protect, logoutUser); // POST /api/users/logout

// /**
//  * Profile
//  */
// router
//   .route('/profile')
//   .get(protect, getUserProfile)             // GET /api/users/profile
//   .put(protect, updateUserProfile);         // PUT /api/users/profile

// export default router;
