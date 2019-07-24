import { Prisma } from './generated/prisma-client';
import { verify } from 'jsonwebtoken';

export interface Context {
  prisma: Prisma;
}

const getUserId = (context): string => {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const userId = verify(token, process.env.APP_SECRET);
    return userId.toString();
  }
};
