import { Router } from 'express';
import { SignIn } from './index';

const router = Router();

router.post(`/${process.env.MAIN_DOMAIN}/signin/login`, async (req, res) => {
  const error = SignIn.getErrorOnData(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const { email, password } = req.body;

  const loginData = await SignIn.login(email, password);
  if (!loginData) {
    return res.status(400).json({ message: 'Wrong email or password' });
  }
  return res.json(loginData);
});

router.post(`/${process.env.MAIN_DOMAIN}/signin/google`, async (req, res) => {
  const { user } = req.body;
  return res.json(await SignIn.signInWithGoogle(user));
});

router.post(`/${process.env.MAIN_DOMAIN}/signin/facebook`, async (req, res) => {
  const { accessToken } = req.body;
  return res.json(await SignIn.signInWithFacebook(accessToken));
});

export default router;
