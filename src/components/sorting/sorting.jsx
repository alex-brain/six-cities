import React from "react";
import {SortingOption} from "../../const";
import applicationPropTypes from "../../application-prop-types";
import withActiveFlag from "../../hocs/with-active-flag";
import {connect} from "react-redux";

const Sorting = (props) => {
  const {isActive, sortingOption, onActiveChange, onClickSortingOption} = props;
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={onActiveChange()}>
        {sortingOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isActive && `places__options--opened`}`}>
        {Object.keys(SortingOption).map((option) => (
          <li key={SortingOption[option]} className={`places__option ${SortingOption[option] === sortingOption && `places__option--active`}`} tabIndex="0" onClick={onClickSortingOption(SortingOption[option])}>{SortingOption[option]}</li>
        ))}
      </ul>
    </form>
  );
};

Sorting.propTypes = {
  isActive: applicationPropTypes.isActive,
  sortingOption: applicationPropTypes.sortingOption,
  onActiveChange: applicationPropTypes.onActiveChange,
  onClickSortingOption: applicationPropTypes.onClickSortingOption,
};

const mapStateToProps = ({STATE}) => ({
  sortingOption: STATE.sortingOption,
});

export default connect(mapStateToProps, null)(withActiveFlag(Sorting));
