// create, update, delete, find a template
import { prisma } from "../db.js";
import type { Prisma } from "../generated/prisma/client.js";
import type { Format } from "../generated/prisma/enums.js";

const createTemplate = async (data: {
  project_id: string;
  name: string;
  format: Format;
}) => {
  return prisma.template.create({ data });
};

const updateTemplate = async ({
  id,
  name,
  format,
}: {
  id: string;
  name?: string;
  format?: Format;
}) => {
  const updateData: Prisma.TemplateUpdateInput = {};

  if (name !== undefined) updateData.name = name;
  if (format !== undefined) updateData.format = format;

  return prisma.template.update({ where: { id }, data: updateData });
};

const deleteTemplate = async (id: string) => {
  return prisma.template.delete({ where: { id } });
};

const findTemplateById = async (id: string) => {
  return prisma.template.findUnique({ where: { id } });
};

export const templateRepository = {
  create: createTemplate,
  update: updateTemplate,
  delete: deleteTemplate,
  findById: findTemplateById,
};
