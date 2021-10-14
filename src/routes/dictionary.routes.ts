import { Router } from 'express';
// import { check } from 'express-validator';
import {
  createDictionary,
  getDictionaries,
  deleteDictionaryById,
  getDictionaryById,
  addMeaningToDictionary,
  updateDictionaryById, removeMeaningToDictionary
} from '../controllers/dictionary.controller';

const router = Router();

router.post(
  '/',
  createDictionary
);

router.post(
  '/add-meaning/:id',
  addMeaningToDictionary
);

router.post(
  '/remove-meaning/:id',
  removeMeaningToDictionary
);

router.get(
  '/',
  getDictionaries
);

router.get(
  '/:id',
  getDictionaryById
);

router.put(
  '/:id',
  updateDictionaryById
);

router.delete(
  '/:id',
  deleteDictionaryById
);

export default router;
