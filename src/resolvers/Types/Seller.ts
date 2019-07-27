import { Context } from '../../utils';
import { Seller } from '../../generated/prisma-client';

const Seller = {
  customers: async ({ id }, args, ctx: Context): Promise<Seller> => {
    return await ctx.prisma.seller({ id }).customers();
  },
};

export default Seller;
