import { prisma } from './prisma';

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email
    }
  })
}

export async function createUser(
  email: string,
  name: string
) {

  const existingUser = await findUserByEmail(email)
  if (existingUser) {
    return null
  }

  return await prisma.user.create({
    data: {
      email,
      name
    }
  })
}


export async function findUserById(id: string) {
  if (!id) {
    return null
  }
  return await prisma.user.findUnique({
    where: {
      id
    }
  })
}

export function updateUser(
  id: string,
  email: string,
  name: string,
) {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      email,
      name
    }
  })
}

export function deleteUser(id: string) {
  return prisma.user.delete({
    where: {
      id
    }
  })
}

