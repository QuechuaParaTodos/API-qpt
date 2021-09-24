import { Router } from 'express';
// import { check } from 'express-validator';
import { createProject, getProject, getProjects } from '../controllers/project.controller';

const router = Router();

router.post(
  '/',
  createProject,
);

router.get(
  '/',
  getProjects,
);

router.get(
  '/:id',
  getProject,
);

export default router;
