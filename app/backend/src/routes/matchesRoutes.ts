import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAll);

router.get('/:id', matchesController.getById);

export default router;
