import PropTypes from "prop-types";

const applicationPropTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    isPremium: PropTypes.bool.isRequired,
    images: PropTypes.array.isRequired,
    title: PropTypes.string,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxGuestsNumber: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string).isRequired,
    host: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  reviewItem: PropTypes.shape({
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  city: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  sortingOption: PropTypes.string.isRequired,
  onClickSortingOption: PropTypes.func.isRequired,
  onActiveChange: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChangeSortingOption: PropTypes.func.isRequired,
  ratingTitle: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onSubmitReview: PropTypes.func.isRequired,
  review: PropTypes.string.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onTextareaChange: PropTypes.func.isRequired,
  getOffersAction: PropTypes.func.isRequired,
  cityChangeAction: PropTypes.func.isRequired,
  getActiveOfferIdAction: PropTypes.func.isRequired,
  getReviewsAction: PropTypes.func.isRequired,
  getDefaultCityAction: PropTypes.func.isRequired,
  loadOffersAction: PropTypes.func.isRequired,
  loadReviewsAction: PropTypes.func.isRequired,
  setSortingOptionAction: PropTypes.func.isRequired,
  setSortingOptionDefaultAction: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fetchOffersNearbyAction: PropTypes.func.isRequired,
  fetchOfferAction: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  postReviewLoaded: PropTypes.bool.isRequired,
};

export default applicationPropTypes;
