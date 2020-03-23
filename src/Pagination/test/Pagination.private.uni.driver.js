import { paginationDriverFactory as publicDriverFactory } from '../Pagination.uni.driver';

export const paginationPrivateDriverFactory = (base, body) => {
  return {
    ...publicDriverFactory(base, body),

    // Add here driver methods that considered "private"
  };
};
