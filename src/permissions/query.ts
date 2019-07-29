import { rule } from 'graphql-shield';
import { getSellerId, Context } from '../utils';

const rules = {
  isAuthenticatedSeller: rule()(
    async (parent, args, ctx: Context): Promise<boolean> => {
      const sellerId = getSellerId(ctx);

      if (sellerId) {
        const sellerExist = await ctx.prisma.$exists.seller({ id: sellerId });
        return sellerExist;
      }

      return false;
    },
  ),
};

export const Query = rules.isAuthenticatedSeller;
