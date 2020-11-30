import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import applicationPropTypes from "../../application-prop-types";
import PlacesList from "../places-list/places-list";
import {SizePreviewImage, APIRoute} from "../../const";
import {connect} from "react-redux";
import {getActiveOfferId} from "../../store/action";
import FavoritesEmpty from "../favorites-empty/favorites-empty";

class FavoritesOfferScreen extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {offers, history, getActiveOfferIdAction, email} = this.props;
    const favorites = offers.filter((it) => it.isFavorite);
    const cities = new Set();
    favorites.forEach((it) => cities.add(it.city.name));
    const filteredFavorites = [];
    Array.from(cities).forEach((it) => filteredFavorites.push(favorites.filter((favorite) => favorite.city.name === it)));
    return (
      <div className={`page ${!favorites.length && `page--favorites-empty`}`}>
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
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{email}</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className={`page__main page__main--favorites ${!favorites.length && `page__main--favorites-empty`}`}>
          <div className="page__favorites-container container">
            {favorites.length ?
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Array.from(cities).map((city, i) => (
                    <li key={`${city}${i}`} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        <PlacesList
                          offers={filteredFavorites[i]}
                          classNameHeaderCard={`favorites`}
                          widthPreview={SizePreviewImage.WIDTH_PREVIEW_FOR_FAVORITES}
                          heightPreview={SizePreviewImage.HEIGHT_PREVIEW_FOR_FAVORITES}
                          classNameInfoCard={`favorites__card-info`}
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
                    </li>
                  ))}
                </ul>
              </section> :
              <FavoritesEmpty />}
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
      </div>
    );
  }
}

FavoritesOfferScreen.propTypes = {
  history: PropTypes.any,
  offers: PropTypes.arrayOf(applicationPropTypes.offer).isRequired,
  getActiveOfferIdAction: applicationPropTypes.getActiveOfferIdAction,
  email: applicationPropTypes.email,
};


const mapStateToProps = ({DATA, USER}) => ({
  offers: DATA.offers,
  email: USER.email,
});

const mapDispatchToProps = (dispatch) => ({
  getActiveOfferIdAction(value) {
    dispatch(getActiveOfferId(value));
  },
});

export {FavoritesOfferScreen};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesOfferScreen);
