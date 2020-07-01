import { Router } from 'express';
import { SignUp } from './index';

const router = Router();

router.post(`/${process.env.MAIN_DOMAIN}/signup/create`, async (req, res) => {
  const error = SignUp.getErrorOnData(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  if (await SignUp.isEmailExists(req.body.email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  return res.status(201).json(await SignUp.createUser(req.body));
});

export default router;
