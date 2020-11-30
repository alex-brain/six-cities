import {loadOffers, loadReviews, requireAuthorization, redirectToRoute, getUserEmail, loadOffersNearby, getOpenedHotel, postReviewStart, postReviewSucces, postReviewFailed} from "./action";
import {AuthorizationStatus, AppRoute, APIRoute} from "../const";
import {adapterDataHotels, getDefaultCity, adapterDataReviews} from "../store/action";

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.HOTELS)
    .then(({data}) => {
      const information = adapterDataHotels(data);
      dispatch(getDefaultCity(information.cities[0]));
      dispatch(loadOffers(information));
    })
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(getUserEmail(data));
    })
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
);

export const postReview = (id, {comment, rating}) => (dispatch, _getState, api) => {
  dispatch(postReviewStart());
  api.post(`${APIRoute.REVIEWS}/${id}`, {comment, rating})
    .then(({data}) => {
      const adaptedReviews = adapterDataReviews(data);
      dispatch(postReviewSucces(adaptedReviews));
    })
    .catch(() => {
      console.log(`Ошибка отправки формы`);
      dispatch(postReviewFailed());
    });
};

export const fetchReviewList = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => {
      const adaptedReviews = adapterDataReviews(data);
      dispatch(loadReviews(adaptedReviews));
    })
);

export const fetchOffersNearby = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.HOTELS}/${id}/${APIRoute.NEARBY}`)
    .then(({data}) => {
      const information = adapterDataHotels(data);
      dispatch(loadOffersNearby(information));
    })
);

export const fetchOffer = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.HOTELS}/${id}`)
    .then(({data}) => {
      const information = adapterDataHotels([data]);
      dispatch(getOpenedHotel(information.offers[0]));
    })
);
