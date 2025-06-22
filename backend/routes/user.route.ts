import express from 'express';
import  registerUser  from '../controller/user.controller';
import  authenticate  from '../middleware/auth';

const router = express.Router();

router.post('/register', registerUser);


router.get('/profile', authenticate, (req, res) => {
  const user = (req as any).user;
  res.json({ message: "Protected profile data", user });
});

export default router;
