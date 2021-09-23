import { Request, Response } from 'express';
import ErrorHandler from '../middlewares/error';
import serviceProject from '../services/project.service';

const createProject = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  try {
    const projectExist = await serviceProject.getProjectByName(name);
    if(projectExist){
      return ErrorHandler(req, res, 404, 'El proyecto ya existe');
    }
    const project = await serviceProject.createProject(req.body);
    res.status(200).json({
      project,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    ErrorHandler(req, res, 500, 'Error al crear proyecto');
  }
};

const getProjects = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const projects = await serviceProject.getProjects();
    res.status(200).json({
      projects,
      ok: true,
    });
  } catch (error) {
    ErrorHandler(req, res, 500, 'Error al listar proyectos');
  }
};

const getProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await serviceProject.getProject(id);
    res.status(200).json({
      project,
      ok: true,
    });
  } catch (error) {
    ErrorHandler(req, res, 500, 'Error al listar proyecto');
  }
};

export {
  createProject,
  getProject,
  getProjects
}
