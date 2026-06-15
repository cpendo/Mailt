// create a user, update a user, delete a user, find a user by id or email
import { prisma } from "../db.js";
import { Prisma } from "../generated/prisma/client.js";

const createUser = async (data: {
  name: string;
  email: string;
  password_hash: string;
}) => {
  return prisma.user.create({
    data,
  });
};

const updateUser = async ({
  email,
  name,
  password_hash,
}: {
  email: string;
  name?: string;
  password_hash?: string;
}) => {
  // Initialize an empty typed object
  const updateData: Prisma.UserUpdateInput = {};

  // Only attach properties if they actually exist
  if (name !== undefined) updateData.name = name;
  if (password_hash !== undefined) updateData.password_hash = password_hash;

  return prisma.user.update({
    where: { email },
    data: updateData,
  });
};

const deleteUser = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};

const findUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const userRepository = {
  create: createUser,
  findById: findUserById,
  findByEmail: findUserByEmail,
  update: updateUser,
  delete: deleteUser,
};
