import { shield } from 'graphql-shield';
import { Query } from './query';

export const permissions = shield({
  Query,
});
