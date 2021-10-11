export interface Meaning {
  meaning: string;
  grammatical_category: string;
  equivalent: string;
  origin_example: string;
  translate_example: string;
}

export interface Dictionary {
  origin_language: string,
  translate_language: string,
  word: string,
  meanings: Meaning[],
  created_at: Date,
  updated_at: Date,
}