import { Prisma } from './generated/prisma-client';
import { verify } from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

export interface Context {
  prisma: Prisma;
  request: any;
}

export const getUserId = (ctx: Context): string => {
  const Authorization = ctx.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = verify(token, process.env.APP_SECRET) as { userId: string };
    return userId;
  }
};
