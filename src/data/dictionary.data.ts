import { ObjectId } from 'mongodb';

export interface Meaning {
  uid: string,
  meaning: string;
  grammatical_category: string;
  origin: string,
  equivalent: string;
  origin_example: string;
  translate_example: string;
}

export interface Dictionary {

  _id?: ObjectId,
  origin_language: string,
  translate_language: string,
  word: string,
  meanings: Meaning[],
  created_at: Date,
  updated_at: Date,
}
