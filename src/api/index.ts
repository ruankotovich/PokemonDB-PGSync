import { Router } from 'express';
import pokemon from './pokemon';
import teams from './team';

const router = Router();

[
  pokemon,
  teams,
]
  .forEach((service) => router.use('/rest', service));

export default router;
