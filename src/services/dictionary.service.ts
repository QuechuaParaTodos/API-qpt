
import { Dictionary } from '../data/dictionary.data';
import dictionaryModel from "../models/dictionary.model";
import { ObjectId } from 'mongodb';



const createDictionary = async (dictionary: Dictionary): Promise<Dictionary> => {
  return await dictionaryModel.create({
    origin_language: dictionary.origin_language,
    translate_language: dictionary.translate_language,
    word: dictionary.word.toLocaleLowerCase(),
    meanings: dictionary.meanings
  })
};

const getDictionaryById = async (id: string): Promise<Dictionary> => await dictionaryModel.findById(id);

const getDictionaries = async (): Promise<Dictionary> => await dictionaryModel.find()

const getOneDictionaryByWord = async (word: string): Promise<string> => await dictionaryModel.findOne({word: word.toLocaleLowerCase()})

const getDictionaryByWord = async (word: string): Promise<Dictionary> => {
  const regex = new RegExp(word, 'i');
  return await dictionaryModel.find({ word: regex }).sort({ word: -1 });
}

const updateDictionaryById = async (id: string, dictionary: Dictionary): Promise<Dictionary> => await dictionaryModel.findByIdAndUpdate(id, dictionary, { new: true });

const deleteDictionaryById = async (id: string): Promise<string> => {
  await dictionaryModel.findByIdAndDelete(id);
  return 'Dictionario eliminado'
}

export default {
  createDictionary,
  getDictionaries,
  getOneDictionaryByWord,
  getDictionaryByWord,
  deleteDictionaryById,
  getDictionaryById,
  updateDictionaryById
}

