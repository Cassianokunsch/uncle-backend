import { Context, getUserId } from '../../utils';
import { Seller } from '../../generated/prisma-client';
import { Customer } from '../../generated/prisma-client';

const sellers = async (parent, args, context: Context): Promise<Seller[]> => {
  const sellers: Seller[] = await context.prisma.sellers({});
  return sellers;
};

const me = (parent, args, ctx: Context): Promise<Seller> => {
  const id = getUserId(ctx);
  return ctx.prisma.seller({ id });
};

const myCustomers = async (parent, args, context: Context): Promise<Customer[]> => {
  const id = getUserId(context);
  const customers = await context.prisma.seller({ id }).customers();
  return customers;
};

export default {
  sellers,
  me,
  myCustomers,
};
