import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import ReviewsList from "../reviews-list/reviews-list";
import FeedbackForm from "../feedback-form/feedback-form";
import withData from "../../hocs/with-data";
import PlacesList from "../places-list/places-list";
import applicationPropTypes from "../../application-prop-types";
import getStarValue from "../../utils";
import Map from "../map/map";
import {connect} from "react-redux";
import {getActiveOfferId, cityChange} from "../../store/action";
import {APIRoute, AuthorizationStatus} from "../../const";
import {fetchReviewList, fetchOffersNearby, fetchOffer} from "../../store/api-actions";

const WrappedFeedbackForm = withData(FeedbackForm);

class OfferScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  getActualOffer() {
    const path = this.getPath();
    const offer = this.props.offers.find((it) => it.id === +path[path.length - 1]);
    return offer;
  }

  getPath() {
    const path = this.props.location.pathname.split(`/`);
    return path[path.length - 1];
  }

  componentDidMount() {
    const path = this.getPath();
    this.props.getReviewsAction(path);
    this.props.fetchOffersNearbyAction(path);
    this.props.fetchOfferAction(path);
  }

  componentDidUpdate(prevProps) {
    const path = this.getPath();

    if (prevProps.offers !== this.props.offers || this.props.city.name === ``) {
      const offer = this.getActualOffer();
      const actualCity = this.props.cities.find((it) => it.name === offer.city.name);
      this.props.cityChangeAction(actualCity);
    }
    if (prevProps.openedHotel && prevProps.openedHotel.id !== +path) {
      this.props.getReviewsAction(path);
      this.props.fetchOffersNearbyAction(path);
      this.props.fetchOfferAction(path);
    }
  }

  render() {
    const {history, openedHotel, reviews, getActiveOfferIdAction, email, offersNearby, authorizationStatus} = this.props;
    if (openedHotel === null) {
      return null;
    }
    console.log(`zzzzzz`, this.props.postReviewLoaded);
    // const {id, isPremium, images, title, price, type, isFavorite, rating, bedrooms, maxGuestsNumber, goods, host, description, city} = offer;
    const {id, isPremium, images, title, price, type, isFavorite, rating, bedrooms, maxGuestsNumber, goods, host, description} = openedHotel;
    const sortedReviews = reviews.sort((a, b) => +new Date(b) - +new Date(a));
    const actualOffers = offersNearby.slice(0, 3);
    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link to="/" className="header__logo-link">
                  <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link to="/favorites" className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      {email !== `` ? <span className="header__user-name user__name">{email}</span> : <span className="header__login">Sign in</span>}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.slice(0, 6).map((image, i) => (
                  <div key={`${image}${i}offerscreen`} className="property__image-wrapper">
                    <img className="property__image" src={image} alt={`${title} ${i}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div> : ``}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {name}
                  </h1>
                  <button className={`property__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`} type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${getStarValue(rating)}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxGuestsNumber} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((good, i) => (
                      <li key={`${good}${i}`} className="property__inside-item">
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={`/${host.avatar}`} width="74" height="74" alt={`${host.name} avatar`} />
                    </div>
                    <span className="property__user-name">
                      {host.name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{sortedReviews.length}</span></h2>
                  <ul className="reviews__list">
                    <ReviewsList reviews={sortedReviews} />
                  </ul>
                  {authorizationStatus === AuthorizationStatus.AUTH && <WrappedFeedbackForm id={id}/>}
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map offers={actualOffers} actualOffer={openedHotel}/>
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <PlacesList
                  offers={actualOffers}
                  onClickCard={(offerId) => {
                    return function () {
                      history.push(`${APIRoute.HOTELS}/${offerId}`);
                    };
                  }}
                  handlerMouseEnter={(evt) => {
                    evt.preventDefault();
                    const activeId = evt.currentTarget.id;
                    getActiveOfferIdAction(+activeId);
                  }}
                  handlerMouseLeave={() => getActiveOfferIdAction(``)}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

OfferScreen.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  offers: PropTypes.arrayOf(applicationPropTypes.offer).isRequired,
  reviews: PropTypes.arrayOf(applicationPropTypes.reviewItem).isRequired,
  getActiveOfferIdAction: applicationPropTypes.getActiveOfferIdAction,
  getReviewsAction: applicationPropTypes.getReviewsAction,
  cities: PropTypes.arrayOf(applicationPropTypes.city),
  cityChangeAction: applicationPropTypes.cityChangeAction,
  city: applicationPropTypes.city,
  email: applicationPropTypes.email,
  fetchOffersNearbyAction: applicationPropTypes.fetchOffersNearbyAction,
  offersNearby: PropTypes.arrayOf(applicationPropTypes.offer).isRequired,
  fetchOfferAction: applicationPropTypes.fetchOfferAction,
  openedHotel: PropTypes.any,
  authorizationStatus: applicationPropTypes.authorizationStatus,
};

const mapStateToProps = ({DATA, STATE, USER}) => ({
  offers: DATA.offers,
  reviews: DATA.reviews,
  cities: DATA.cities,
  city: STATE.city,
  active: STATE.active,
  email: USER.email,
  offersNearby: DATA.offersNearby,
  openedHotel: STATE.openedHotel,
  authorizationStatus: USER.authorizationStatus,
  postReviewLoaded: STATE.postReviewLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  getActiveOfferIdAction(value) {
    dispatch(getActiveOfferId(value));
  },
  getReviewsAction(id) {
    dispatch(fetchReviewList(id));
  },
  cityChangeAction(city) {
    dispatch(cityChange(city));
  },
  fetchOffersNearbyAction(id) {
    dispatch(fetchOffersNearby(id));
  },
  fetchOfferAction(id) {
    dispatch(fetchOffer(id));
  }
});

export {OfferScreen};
export default connect(mapStateToProps, mapDispatchToProps)(OfferScreen);
