import { isEqual } from 'lodash';
import { Location, LocationFilter } from './interfaces';

export const filterLocationHandler = (
  filterReq: LocationFilter,
  data: Location[]
) => {
  let filterData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filterReq.search.toLowerCase()) ||
      item.city.toLowerCase().includes(filterReq.search.toLowerCase()) ||
      isEqual(Number(item.availableUnits), Number(filterReq.search))
  );

  if (filterReq.state) {
    filterData = filterData.filter((item) => item.state === filterReq.state);
  }

  return { filterData };
};

export const compare = (
  a: number | string,
  b: number | string,
  isAsc: boolean
) => {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
};
