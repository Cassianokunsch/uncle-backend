import { Context } from '../../utils';
import { Customer } from '../../generated/prisma-client';
import { getUserId } from '../../utils';

const addCustomer = async (parent, args, context: Context): Promise<Customer> => {
  const hasCustomer = await context.prisma.$exists.customer({ cpfCnpj: args.cpfCnpj });
  const id = getUserId(context);
  const idState = args.state;
  const customer: Customer = await context.prisma.createCustomer({
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
