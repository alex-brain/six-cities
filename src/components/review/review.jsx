import React, {PureComponent, Fragment} from "react";
import applicationPropTypes from "../../application-prop-types";
import getStarValue from "../../utils";

class Review extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {reviewItem} = this.props;
    const {rating, user, comment, date} = reviewItem;
    return (
      <Fragment>
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={user.avatar} width="54" height="54" alt={`${user.name} avatar`} />
          </div>
          <span className="reviews__user-name">
            {name}
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: `${getStarValue(rating)}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            {comment}
          </p>
          <time className="reviews__time" dateTime="2019-04-24">{new Date(date).toLocaleString(`en-US`, {day: `numeric`})} {new Date(date).toLocaleString(`en-US`, {month: `long`})} {new Date(date).getFullYear()}</time>
        </div>
      </Fragment>
    );
  }
}

Review.propTypes = {
  reviewItem: applicationPropTypes.reviewItem,
};

export default Review;
