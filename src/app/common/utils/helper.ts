import {
  BaseHouse,
  HouseFilter,
  HouseInfor,
} from './interfaces/house.interface';

export const houseFilterHandler = (
  filterReq: HouseFilter,
  data: BaseHouse<HouseInfor>[]
) => {
  let filter: HouseFilter;
  if (
    !filterReq.block_number &&
    !filterReq.house_number &&
    !filterReq.land_number
  ) {
    return data;
  } else {
    filter = Object.fromEntries(
      Object.entries(filterReq).filter(([_, v]) => !!v)
    ) as HouseFilter;
  }

  let filterData = data.filter((item) => {
    let isValid = false;
    if (filter.block_number) {
      isValid = item.attributes.block_number
        .toLowerCase()
        .includes(filterReq.block_number.toLowerCase());
    }

    if (filter.house_number) {
      isValid = item.attributes.house_number
        .toLowerCase()
        .includes(filter.house_number.toLowerCase());
    }

    if (filter.land_number) {
      isValid = item.attributes.land_number
        .toLowerCase()
        .includes(filter.land_number.toLowerCase());
    }

    return isValid;
  });

  return filterData;
};
