import { Prisma } from './generated/prisma-client';
import { verify } from 'jsonwebtoken';

export interface Context {
  prisma: Prisma;
  request: any;
}

export const parseEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

export const getSellerId = (ctx: Context): string => {
  const Authorization = ctx.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { sellerId } = verify(token, process.env.APP_SECRET) as { sellerId: string };
    return sellerId;
  }
};
