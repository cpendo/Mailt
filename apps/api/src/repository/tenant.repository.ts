// create, update, delete, find a tenant
import { prisma } from "../db.js";

const createTenant = async (name: string) => {
  return prisma.tenant.create({ data: { name } });
};

const updateTenant = async ({ id, name }: { id: string; name: string }) => {
  return prisma.tenant.update({ where: { id }, data: { name } });
};

const deleteTenant = async (id: string) => {
  return prisma.tenant.delete({ where: { id } });
};

const findTenantById = async (id: string) => {
  return prisma.tenant.findUnique({ where: { id } });
};

export const tenantRepository = {
  create: createTenant,
  update: updateTenant,
  delete: deleteTenant,
  findById: findTenantById,
};
