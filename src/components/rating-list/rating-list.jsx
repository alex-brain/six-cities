import React, {Fragment} from "react";
import {ReviewRatingTitle} from "../../const";
import RatingItem from "../rating-item/rating-item";

const RatingList = (props) => {
  const reviewRatingTitleList = Object.keys(ReviewRatingTitle);
  return (
    <Fragment>
      {reviewRatingTitleList.map((ratingTitle, i) => {
        console.log('rating', props.rating);
        console.log('parseInt(props.rating)', parseInt(props.rating) || 0);
        console.log('reviewRatingTitleList.length - i', reviewRatingTitleList.length - i);
        const isChecked = (parseInt(props.rating) || 0) < reviewRatingTitleList.length - i;
        return (
          <RatingItem
            checked={isChecked}
            key={`${ReviewRatingTitle[ratingTitle]}${i}`}
            ratingTitle={ReviewRatingTitle[ratingTitle]}
            value={reviewRatingTitleList.length - i}
            {...props}
          />
        )
      })}
    </Fragment>
  );
};

RatingList.propTypes = {};

export default RatingList;
