import { Context } from '../../utils';
import { Customer } from '../../generated/prisma-client';
import { getSellerId } from '../../utils';

const addCustomer = async (parent, args, ctx: Context): Promise<Customer> => {
  const hasCustomer = await ctx.prisma.$exists.customer({ cpfCnpj: args.cpfCnpj });
  const id = getSellerId(ctx);
  const idState = args.state;
  const customer: Customer = await ctx.prisma.createCustomer({
    ...args,
    state: {
      connect: { id: idState },
    },
    seller: {
      connect: { id },
    },
  });
  return customer;
};

export default {
  addCustomer,
};
