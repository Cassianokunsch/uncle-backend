import { Context } from '../../utils';
import { Customer, State } from '../../generated/prisma-client';

const Customer = {
  state: async ({ id }, args, ctx: Context): Promise<State> => {
    return await ctx.prisma.customer({ id }).state();
  },
};

export default Customer;
