import { Context } from '../../utils';
import { State } from '../../generated/prisma-client';

const states = async (parent, args, ctx: Context): Promise<State[]> => {
  return await ctx.prisma.states({});
};

export default {
  states,
};
