import { Context, getSellerId } from '../../utils';
import { Seller } from '../../generated/prisma-client';
import { Customer } from '../../generated/prisma-client';

const sellers = async (parent, args, ctx: Context): Promise<Seller[]> => {
  const sellers: Seller[] = await ctx.prisma.sellers({});
  return sellers;
};

const me = async (parent, args, ctx: Context): Promise<Seller> => {
  const id = getSellerId(ctx);
  return await ctx.prisma.seller({ id });
};

const myCustomers = async (parent, args, ctx: Context): Promise<Customer[]> => {
  const id = getSellerId(ctx);
  const customers = await ctx.prisma.seller({ id }).customers();
  return customers;
};

export default {
  sellers,
  me,
  myCustomers,
};
