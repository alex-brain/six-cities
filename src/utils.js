const MAX_STAR = 5;
const MAX_PERCENT = 100;

export default function getStarValue(value) {
  return Math.floor(value * MAX_PERCENT / MAX_STAR);
}

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getFilteredOffers = (offers, city) => offers.filter((it) => it.city.name === city.name);
