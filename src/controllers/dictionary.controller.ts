import { Request, Response } from 'express';
import ErrorHandler from '../middlewares/error';
import serviceDictionary from '../services/dictionary.service';
import { Dictionary, Meaning } from '../data/dictionary.data';
import { uid } from 'uid';


const createDictionary = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validar si existe un diccionario con esa palabra
    const dictionaryExist = await serviceDictionary.getOneDictionaryByWord(req.body.word);
    if(dictionaryExist){
      return ErrorHandler(req, res, 404, 'La palabra ya existe');
    }
    const dictionary = await serviceDictionary.createDictionary(req.body);
    res.status(200).json({
      dictionary,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    ErrorHandler(req, res, 500, 'Error al crear diccionario');
  }
};

const addMeaningToDictionary = async (req: Request, res: Response): Promise<void> => {
  try {
    const dictionaryExist = await serviceDictionary.getDictionaryById(req.params.id);
    if(!dictionaryExist){
      return ErrorHandler(req, res, 404, 'La palabra con ese id no existe');
    }
    dictionaryExist.meanings.push({
      ...req.body,
      uid: uid(8)
    })
    const dictionaryUpdate = await serviceDictionary.updateDictionaryById(req.params.id, dictionaryExist);
    res.status(200).json({
      dictionary: dictionaryUpdate,
      ok: true,
    });

  } catch (e) {
    console.log('Error', e);
    ErrorHandler(req, res, 500, 'Error al agregar significado');
  }
}

const removeMeaningToDictionary = async (req: Request, res: Response): Promise<void> => {
  try {
    const dictionaryExist = await serviceDictionary.getDictionaryById(req.params.id);
    if(!dictionaryExist){
      return ErrorHandler(req, res, 404, 'La palabra con ese id no existe');
    }
    dictionaryExist.meanings = dictionaryExist.meanings.filter(mean => mean.uid !== req.body.uid)

    const dictionaryUpdate = await serviceDictionary.updateDictionaryById(req.params.id, dictionaryExist);
    res.status(200).json({
      dictionary: dictionaryUpdate,
      ok: true,
    });

  } catch (e) {
    console.log('Error', e);
    ErrorHandler(req, res, 500, 'Error al agregar significado');
  }
}

const getDictionaries = async (req: Request, res: Response): Promise<void> => {
  const search = req.query.search || '';
  try {
    const dictionaries = await serviceDictionary.getDictionaryByWord(search as string);
    res.status(200).json({
      dictionaries,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    ErrorHandler(req, res, 500, 'Error al listar diccionario');
  }
}

const getDictionaryById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Buscar si la palabra existe por id
    const dictionaryExist = await serviceDictionary.getDictionaryById(req.params.id);
    if(!dictionaryExist){
      return ErrorHandler(req, res, 404, 'La palabra no existe');
    }
    res.status(200).json({
      dictionary: dictionaryExist,
      ok: true,
    });
  } catch (e) {
    console.log(e);
  }
}

const updateDictionaryById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Buscar si la palabra existe por id
    const dictionaryExist = await serviceDictionary.getDictionaryById(req.params.id);
    if(!dictionaryExist){
      return ErrorHandler(req, res, 404, 'La palabra no existe');
    }
    const dictionary: Dictionary = {
      ...req.body,
      meanings: dictionaryExist.meanings
    }
    console.log(dictionary);
    const dictionaryUpdate = await serviceDictionary.updateDictionaryById(req.params.id, dictionary);
    res.status(200).json({
      dictionary: dictionaryUpdate,
      ok: true,
    });

  } catch (e) {
    console.log(e);
  }
}

const deleteDictionaryById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Buscar si la palabra existe
    const dictionaryExist = await serviceDictionary.getOneDictionaryByWord(req.params.id);
    if(!dictionaryExist){
      return ErrorHandler(req, res, 404, 'La palabra no existe');
    }
    // Eliminar palabra de BD
    const resp = await serviceDictionary.deleteDictionaryById(req.params.id);
    res.status(200).json({
      resp,
      ok: true,
    });
  } catch (e) {
    console.log(e);
    ErrorHandler(req, res, 500, 'Error al eliminar diccionario');
  }
}

export {
  createDictionary,
  getDictionaries,
  deleteDictionaryById,
  getDictionaryById,
  addMeaningToDictionary,
  removeMeaningToDictionary,
  updateDictionaryById,
}
