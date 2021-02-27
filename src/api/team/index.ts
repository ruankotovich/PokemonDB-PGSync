import { Router } from 'express';
import controller from './team.controller';

const router = Router({ mergeParams: true });

router.get('/teams', controller.findAll);
router.post('/teams', controller.save);
router.get('/teams/:id', controller.findById);
router.put('/teams/:id', controller.update);
router.delete('/teams/:id', controller.remove);

export default router;
