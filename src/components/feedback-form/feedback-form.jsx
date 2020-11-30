import React from "react";
import RatingList from "../rating-list/rating-list";
import applicationPropTypes from "../../application-prop-types";

const FeedbackForm = (props) => {
  const {onSubmitReview, postReviewLoading, review, rating} = props;
  const isChecked = rating > 0;
  console.log('rating', rating);

  const onRatingChange =  (e) => {
    console.log('e', e.target);
    props.onRatingChange(e, 'rating');
  };

  const onTextareaChange = (e) => {
    props.onTextareaChange(e, 'review');
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSubmitReview}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input onChange={onRatingChange} className="form__rating-input visually-hidden" value="5" id="5-stars" type="radio" checked={rating >= 5} required />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={onRatingChange} className="form__rating-input visually-hidden" value="4" id="4-stars" type="radio" checked={rating >= 4} required />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={onRatingChange} className="form__rating-input visually-hidden" value="3" id="3-stars" type="radio" checked={rating >= 3} required />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={onRatingChange} className="form__rating-input visually-hidden" value="2" id="2-stars" type="radio" checked={rating >= 2} required />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={onRatingChange} className="form__rating-input visually-hidden" value="1" id="1-star" type="radio" checked={rating >= 1} required />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" minLength="50" placeholder="Tell how was your stay, what you like and what can be improved" onChange={onTextareaChange} value={review}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={postReviewLoading}>Submit</button>
      </div>
    </form>
  );
};

FeedbackForm.propTypes = {
  onSubmitReview: applicationPropTypes.onSubmitReview,
  onRatingChange: applicationPropTypes.onRatingChange,
  onTextareaChange: applicationPropTypes.onTextareaChange,
  postReviewLoading: applicationPropTypes.postReviewLoading,
  review: applicationPropTypes.review,
};

export default FeedbackForm;
