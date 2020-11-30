import React, {Fragment} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card";
import applicationPropTypes from "../../application-prop-types";

const PlacesList = (props) => {
  const {offers} = props;
  return (
    <Fragment>
      {offers.map((offer, i) => (
        <PlaceCard
          key={`${offer.images[0].src}${i}`}
          offer={(offer)}
          {...props}
        />
      ))}
    </Fragment>
  );
};

PlacesList.propTypes = {
  offers: PropTypes.arrayOf(applicationPropTypes.offer).isRequired,
};

export default PlacesList;
