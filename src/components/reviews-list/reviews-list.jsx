import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Review from "../review/review";
import applicationPropTypes from "../../application-prop-types";

const ReviewsList = (props) => {
  const {reviews} = props;
  return (
    <Fragment>
      {reviews.slice(0, 10).map((reviewItem, i) => (
        <li key={`${reviewItem.comment}${i}`} className="reviews__item">
          <Review
            reviewItem={reviewItem}
          />
        </li>
      ))}
    </Fragment>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(applicationPropTypes.reviewItem).isRequired,
};

export default ReviewsList;
