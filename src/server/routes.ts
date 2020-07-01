import { Router } from 'express';

const router = Router();

router.get(`/${process.env.MAIN_DOMAIN}`, async (req, res) => {
  return res.json({ message: `It's alive. Date: ${new Date()}` });
});

export default router;
