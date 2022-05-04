import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.getHome);

// router.get('/away', leaderboardController.getAway);

// router.get('/', leaderboardController.getAllGames);
export default router;
