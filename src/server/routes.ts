import { Router } from 'express';

const routes = Router();

routes.get('/', async (req, res) => {
  return res.json({ message: `It's alive. Date: ${new Date()}` });
});

export default routes;
