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
    !filterReq.land_number &&
    !filterReq.min_price &&
    !filterReq.max_price
  ) {
    return data;
  } else {
    filter = Object.fromEntries(
      Object.entries(filterReq).filter(([_, v]) => !!v)
    ) as HouseFilter;
  }

  let filterData = data.filter((item) => {
    return (
      houseFilter('house_number', filter, item.attributes.house_number) &&
      houseFilter('block_number', filter, item.attributes.block_number) &&
      houseFilter('land_number', filter, item.attributes.land_number) &&
      houseFilter('min_price', filter, item.attributes.price) &&
      houseFilter('max_price', filter, item.attributes.price)
    );

    // let isValid = false;
    // if (filter.block_number) {
    //   isValid = item.attributes.block_number
    //     .toLowerCase()
    //     .includes(filter.block_number.toLowerCase());
    // }

    // if (filter.house_number) {
    //   isValid = item.attributes.house_number
    //     .toLowerCase()
    //     .includes(filter.house_number.toLowerCase());
    // }

    // if (filter.land_number) {
    //   isValid = item.attributes.land_number
    //     .toLowerCase()
    //     .includes(filter.land_number.toLowerCase());
    // }

    // return isValid;
  });

  return filterData;
};

const houseFilter = (
  field: keyof HouseFilter,
  filter: HouseFilter,
  value: any
) => {
  if (field === 'min_price' || field === 'max_price') {
    if (filter.min_price && field === 'min_price')
      return +value >= Number(filter.min_price);

    if (filter.max_price && field === 'max_price')
      return +value <= Number(filter.max_price);

    return true;
  }

  return filter[field]
    ? value.toLowerCase().includes(String(filter[field]).toLowerCase())
    : true;
};
