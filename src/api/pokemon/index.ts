import { Router } from 'express';
import controller from './pokemon.controller';

const router = Router({ mergeParams: true });

router.get('/pokemons', controller.findAll);
router.get('/pokemons/:id', controller.findById);

export default router;
