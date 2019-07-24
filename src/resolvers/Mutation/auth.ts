import { Seller } from '../../generated/prisma-client';
import { Context } from '../../utils';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthPayLoad {
  token?: string;
  seller?: Seller;
  info: string;
}

const signUp = async (parent: any, args, context: Context): Promise<AuthPayLoad> => {
  const emailInUse: boolean = await context.prisma.$exists.seller({ email: args.email });

  if (emailInUse) {
    return {
      info: 'Email is already in use!',
    };
  }

  const password: string = await hash(args.password, 10);
  const seller: Seller = await context.prisma.createSeller({ ...args, password });

  return {
    token: sign({ sellerId: seller.id }, process.env.APP_SECRET),
    seller,
    info: 'Seller successfully created!',
  };
};

const login = async (parent, args, context: Context): Promise<AuthPayLoad> => {
  const seller: Seller = await context.prisma.seller({ email: args.email });
  if (!seller) {
    return {
      info: 'Seller not found!',
    };
  }

  const valid = await compare(args.password, seller.password);
  if (!valid) {
    return {
      info: 'Invalid password!',
    };
  }

  const token: string = sign({ userId: seller.id }, process.env.APP_SECRET);

  return {
    token,
    seller,
    info: 'Successfully logged in!',
  };
};

export default {
  signUp,
  login,
};
