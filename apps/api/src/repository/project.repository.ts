// create, update, delete, find a project
import { prisma } from "../db.js";

const createProject = async (data: {
  tenant_id: string;
  name: string;
  is_default?: boolean;
}) => {
  return prisma.project.create({ data });
};

const updateProject = async ({ id, name }: { id: string; name: string }) => {
  return prisma.project.update({ where: { id }, data: { name } });
};

const deleteProject = async (id: string) => {
  return prisma.project.delete({ where: { id } });
};

const findProjectById = async (id: string) => {
  return prisma.project.findUnique({ where: { id } });
};

export const projectRepository = {
  create: createProject,
  update: updateProject,
  delete: deleteProject,
  findById: findProjectById,
};
