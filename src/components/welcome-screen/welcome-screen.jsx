import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import PlacesList from "../places-list/places-list";
import applicationPropTypes from "../../application-prop-types";
import Map from "../map/map";
import CitiesList from "../cities-list/cities-list";
import Sorting from "../sorting/sorting";
import {connect} from "react-redux";
import {getActiveOfferId, getOffers} from "../../store/action";
import PlacesListEmpty from "../places-list-empty/places-list-empty";
import {getSortingOption} from "../../store/selectors/offers/sorted-offers";
import {setSortingOptionDefault} from "../../store/action";
import {APIRoute} from "../../const";

class WelcomeScreen extends PureComponent {
  constructor(props) {
    super(props);

  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      this.props.setSortingOptionDefaultAction();
    }
  }

  render() {
    const {history, offers, city, getActiveOfferIdAction, email} = this.props;
    return (
      <div className={`page page--gray page--main ${!offers.length && `page__main--index-empty`}`}>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
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

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList />
            </section>
          </div>
          <div className="cities">
            <div className={`cities__places-container ${!offers.length && `cities__places-container--empty`} container`}>
              {offers.length ?
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  {city && <b className="places__found">{offers.length} places to stay in {city.name}</b>}
                  <Sorting
                    {...this.props}
                  />
                  <div className="cities__places-list places__list tabs__content">
                    <PlacesList
                      offers={offers}
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
                </section> :
                <PlacesListEmpty city={city}/>}
              <div className="cities__right-section">
                {!!offers.length &&
                <section className="cities__map map">
                  {city && <Map offers={offers}/>}
                </section>}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

WelcomeScreen.propTypes = {
  history: PropTypes.object.isRequired,
  offers: PropTypes.arrayOf(applicationPropTypes.offer).isRequired,
  getOffersAction: applicationPropTypes.getOffersAction,
  getActiveOfferIdAction: applicationPropTypes.getActiveOfferIdAction,
  city: applicationPropTypes.city,
  active: applicationPropTypes.active,
  setSortingOptionDefaultAction: applicationPropTypes.setSortingOptionDefaultAction,
  email: applicationPropTypes.email,
};

const mapStateToProps = ({DATA, STATE, USER}) => ({
  offers: getSortingOption({DATA, STATE}),
  city: STATE.city,
  active: STATE.active,
  email: USER.email,
});

const mapDispatchToProps = (dispatch) => ({
  getActiveOfferIdAction(value) {
    dispatch(getActiveOfferId(value));
  },
  getOffersAction() {
    dispatch(getOffers());
  },
  setSortingOptionDefaultAction() {
    dispatch(setSortingOptionDefault());
  },
});

export {WelcomeScreen};
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
