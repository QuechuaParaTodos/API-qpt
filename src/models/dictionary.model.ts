import { Schema, model } from 'mongoose';
import { Dictionary } from '../data/dictionary.data';

const DictionarySchema = new Schema<Dictionary>({
  origin_language: {
    type: String,
  },
  translate_language: {
    type: String
  },
  word: {
    type: String,
    required: true,
  },
  meanings: [
    {
      meaning: {
        type: String
      },
      grammatical_category: {
        type: String
      },
      equivalent: {
        type: String
      },
      origin_example: {
        type: String
      },
      translate_example: {
        type: String
      },
    }
  ],
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
}, { collection: 'dictionaries' });

DictionarySchema.method('toJSON', function () {
  //const { __v, _id, ...object } = this.toObject();
  const { _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

export default model('Dictionary', DictionarySchema);
