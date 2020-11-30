import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import applicationPropTypes from "../../application-prop-types";
import getStarValue from "../../utils";
import {SizePreviewImage} from "../../const";

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this.handlerMouseEnter = this.props.handlerMouseEnter.bind(this);
    this.handlerMouseLeave = this.props.handlerMouseLeave.bind(this);
    this.onClickCard = this.props.onClickCard.bind(this);
  }

  render() {
    const {classNameHeaderCard = ``, classNameInfoCard = ``, offer, widthPreview = SizePreviewImage.WIDTH_PREVIEW_DEFAULT, heightPreview = SizePreviewImage.HEIGHT_PREVIEW_DEFAULT} = this.props;
    const {id, title, price, type, rating, isFavorite, previewImage, isPremium} = offer;
    const pretext = isFavorite ? `In` : `To`;
    return (
      <article id={id} className={`${classNameHeaderCard && `${classNameHeaderCard}__card`} ${!classNameHeaderCard && `cities__place-card`} place-card`} onClick={this.onClickCard(id)} onMouseEnter={this.handlerMouseEnter} onMouseLeave={this.handlerMouseLeave}>
        {isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div> : ``
        }
        <div className={`${classNameHeaderCard}__image-wrapper place-card__image-wrapper`}>
          <a href="#">
            <img className="place-card__image" src={previewImage} width={widthPreview} height={heightPreview} alt={`${name} image`} />
          </a>
        </div>
        <div className={`${classNameInfoCard} place-card__info`}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className={`place-card__bookmark-button ${isFavorite && `place-card__bookmark-button--active`} button`} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{`${pretext} bookmarks`}</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${getStarValue(rating)}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

PlaceCard.propTypes = {
  history: PropTypes.any,
  classNameHeaderCard: PropTypes.string,
  classNameInfoCard: PropTypes.string,
  widthPreview: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  heightPreview: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  offer: applicationPropTypes.offer,
  onClickCard: PropTypes.func.isRequired,
  handlerMouseEnter: PropTypes.func.isRequired,
  handlerMouseLeave: PropTypes.func.isRequired,
};

export default PlaceCard;
