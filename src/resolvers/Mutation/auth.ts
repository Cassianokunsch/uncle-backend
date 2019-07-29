import { Seller } from '../../generated/prisma-client';
import { Context, parseEmail } from '../../utils';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthPayLoad {
  token?: string;
  seller?: Seller;
}

const signUp = async (parent: any, args, ctx: Context): Promise<AuthPayLoad> => {
  const email = args.email.trim();
  const name = args.name.trim();
  const password = args.password;

  if (!email || !password || !name) throw Error('Fill in all fields!');

  if (!parseEmail.test(email)) throw Error('Bad email format!');

  const emailInUse: boolean = await ctx.prisma.$exists.seller({ email });

  if (emailInUse) throw Error('Email is already in use!');

  const passwordHash: string = await hash(password, 10);
  const seller: Seller = await ctx.prisma.createSeller({ email, password: passwordHash, name });

  return {
    token: sign({ sellerId: seller.id }, process.env.APP_SECRET),
    seller,
  };
};

const login = async (parent, args, ctx: Context): Promise<AuthPayLoad> => {
  const email = args.email.trim();
  const password = args.password;

  if (!parseEmail.test(email)) throw Error('Bad email format!');

  const seller: Seller = await ctx.prisma.seller({ email });

  if (!seller) throw Error('Invalid Credentials!');

  const valid = await compare(password, seller.password);

  if (!valid) throw Error('Invalid Credentials!');

  const token: string = sign({ sellerId: seller.id }, process.env.APP_SECRET);

  return {
    token,
    seller,
  };
};

export default {
  signUp,
  login,
};
