import { Params } from '@angular/router';

export const paginate = <T>(list: T[], params: Params): T[] => {
  return list.slice(
    (params.page - 1) * params.limit,
    params.page === 0 ? params.limit : params.page * params.limit,
  );
};
