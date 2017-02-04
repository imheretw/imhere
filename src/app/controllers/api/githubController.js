import { Router } from 'express';
import GithubService from 'services/GithubService';
import wrap from 'helpers/wrap';

const router = Router();

/*
*  GET /github/closed_issues
*/
router.get('/closed_issues', wrap(async (req, res, next) => {
  const issues = await GithubService.getClosedIssues();

  res.json({ issues });
}));

export default router;
