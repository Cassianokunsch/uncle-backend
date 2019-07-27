import auth from './auth';
import customer from './customer';

const Mutation = {
  ...auth,
  ...customer,
};

export default Mutation;
