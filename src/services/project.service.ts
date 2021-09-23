import ProjectModel from '../models/project.model';

// import slug from 'slug';
import { Project } from '../data/project.data';

const createProject = async (project: Project): Promise<Project> => await ProjectModel.create({
  name: project.name,
  description: project.description,
});

const getProjects = async (): Promise<Project>  => await ProjectModel.find();

const getProject = async (id: string): Promise<Project> => await ProjectModel.findById(id);

const getProjectByName = async (name: string): Promise<Project> => await ProjectModel.findOne({name: name});

export default {
  createProject,
  getProject,
  getProjects,
  getProjectByName
};
