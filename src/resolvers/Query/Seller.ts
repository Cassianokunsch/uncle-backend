import { Context } from '../../utils';
import { Seller } from '../../generated/prisma-client';

const sellers = async (parent, args, context: Context): Promise<Seller[]> => {
  const sellers: Seller[] = await context.prisma.sellers({});
  return sellers;
};

export default {
  sellers,
};
