import {createSelector} from "reselect";
import {SortingOption} from "../../../const";

const selectAllState = (data) => data;

export const getSortingOption = createSelector(
    selectAllState,
    ({DATA, STATE}) => {
      let city = STATE.city.name;

      switch (STATE.sortingOption) {
        case SortingOption.PRICE_LOW_TO_HIGH:
          return DATA.offers.filter(
              (offer) => (offer.city.name === city)
          ).sort((a, b) => a.price - b.price);

        case SortingOption.PRICE_HIGH_TO_LOW:
          return DATA.offers.filter(
              (offer) => (offer.city.name === city)
          ).sort((a, b) => b.price - a.price);

        case SortingOption.TOP_RATED_FIRST:
          return DATA.offers.filter(
              (offer) => (offer.city.name === city)
          ).sort((a, b) => b.rating - a.rating);

        default:
          return DATA.offers.filter(
              (offer) => (offer.city.name === city)
          );
      }
    }
);
