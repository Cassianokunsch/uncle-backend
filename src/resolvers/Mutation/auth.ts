import { Seller } from '../../generated/prisma-client';
import { Context } from '../../utils';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthPayLoad {
  token?: string;
  seller?: Seller;
}

const signUp = async (parent: any, args, context: Context): Promise<AuthPayLoad> => {
  const emailInUse: boolean = await context.prisma.$exists.seller({ email: args.email });

  if (emailInUse) {
    throw Error('Email is already in use!');
  }

  const password: string = await hash(args.password, 10);
  const seller: Seller = await context.prisma.createSeller({ ...args, password });

  return {
    token: sign({ sellerId: seller.id }, process.env.APP_SECRET),
    seller,
  };
};

const login = async (parent, { email, password }, context: Context): Promise<AuthPayLoad> => {
  const seller: Seller = await context.prisma.seller({ email: email });

  if (!seller) {
    throw Error('Invalid Credentials!');
  }

  const valid = await compare(password, seller.password);

  if (!valid) {
    throw Error('Invalid Credentials!');
  }

  const token: string = sign({ userId: seller.id }, process.env.APP_SECRET);

  return {
    token,
    seller,
  };
};

export default {
  signUp,
  login,
};
