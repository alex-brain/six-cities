import React, {Component, createRef} from "react";
import PropTypes from "prop-types";
import applicationPropTypes from "../../application-prop-types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {connect} from "react-redux";
import {SizeMap, IconUrl} from "../../const";

class Map extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.marker = {};
    this.icon = L.icon({
      iconUrl: `${IconUrl.DEFAULT_ICON}`,
      iconSize: [30, 30]
    });
    this.iconActive = L.icon({
      iconUrl: `${IconUrl.ACTIVE_ICON}`,
      iconSize: [30, 30]
    });
  }

  getEquality(prevOffers, actualOffers) {
    const prevIdList = [];
    prevOffers.map((it) => prevIdList.push(it.id));
    const idList = [];
    actualOffers.map((it) => idList.push(it.id));
    const results = prevIdList.filter((i) => !idList.includes(i)).concat(idList.filter((i) => !prevIdList.includes(i)));
    return !!results.length;
  }

  renderPin(offers, actualOffer) {
    offers.map((offer) => {
      this.marker[offer.id] = L.marker([offer.location.latitude, offer.location.longitude]);
      this.marker[offer.id].setIcon(this.icon);
      this.marker[offer.id].addTo(this.map);
    });

    if (actualOffer !== ``) {
      this.marker[actualOffer.id] = L.marker([actualOffer.city.location.latitude, actualOffer.city.location.longitude]);
      this.marker[actualOffer.id].setIcon(this.iconActive);
      this.marker[actualOffer.id].addTo(this.map);
    }
  }


  componentDidUpdate(prevProps) {
    const {offers, actualOffer = ``} = this.props;
    const isRerenderMarkers = this.getEquality(prevProps.offers, this.props.offers);

    if (prevProps.city.name !== this.props.city.name || isRerenderMarkers) {
      Object.keys(this.marker).map((it) => this.map.removeLayer(this.marker[it]));
      this.marker = {};
      this.renderPin(offers, actualOffer);
    }

    if (prevProps.active !== `` && prevProps.active !== actualOffer.id && !!this.marker[prevProps.active]) {
      this.marker[prevProps.active].setIcon(this.icon);
    }

    if (this.props.active !== `` && this.marker[this.props.active] !== undefined) {
      this.marker[this.props.active].setIcon(this.iconActive);
    }

    if (this.props.city !== prevProps.city) {
      const cityCoordinate = [this.props.city.location.latitude, this.props.city.location.longitude];
      const zoom = this.props.city.location.zoom;
      this.map.setView(cityCoordinate, zoom);
    }
  }

  componentDidMount() {
    const {offers, city, actualOffer = ``} = this.props;

    const cityCoordinate = [city.location.latitude, city.location.longitude];

    const zoom = city.location.zoom;

    this.map = L.map(this.ref.current, {
      center: cityCoordinate,
      zoom,
      zoomControl: false,
      marker: true
    });

    this.map.setView(cityCoordinate, zoom);

    L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`}).addTo(this.map);

    this.renderPin(offers, actualOffer);
  }

  render() {
    return (
      <div id="map" ref={this.ref} style={{height: SizeMap.HEIGHT_MAP}}></div>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(applicationPropTypes.offer).isRequired,
  city: applicationPropTypes.city,
  active: applicationPropTypes.active,
  actualOffer: PropTypes.object,
};

const mapStateToProps = ({STATE}) => ({
  city: STATE.city,
  active: STATE.active,
});

export {Map};
export default connect(mapStateToProps, null)(Map);
