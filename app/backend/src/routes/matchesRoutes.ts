import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import MatchesController from '../controllers/matchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAll);

router.get('/:id', matchesController.getById);

router.post('/', tokenValidation, matchesController.create);

router.patch('/:id/finish', matchesController.finish);

router.patch('/:id', matchesController.update);

export default router;
