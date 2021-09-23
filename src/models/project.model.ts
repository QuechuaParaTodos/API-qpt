import { Schema, model } from 'mongoose';
import { Project } from '../data/project.data';

const ProjectSchema = new Schema<Project>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },  
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
}, { collection: 'projects' });

ProjectSchema.method('toJSON', function () {
  //const { __v, _id, ...object } = this.toObject();
  const { _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

export default model('Project', ProjectSchema);
