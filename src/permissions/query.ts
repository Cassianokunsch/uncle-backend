import { rule } from 'graphql-shield';
import { getUserId, Context } from '../utils';

const rules = {
  isAuthenticatedUser: rule()((parent, args, context: Context): boolean => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
};

export const Query = rules.isAuthenticatedUser;
