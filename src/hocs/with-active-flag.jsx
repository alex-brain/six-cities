import React, {PureComponent} from "react";
import applicationPropTypes from "../application-prop-types";
import {setSortingOption} from "../store/action";
import {connect} from "react-redux";

const withActiveFlag = (Component) => {
  class WithActiveFlag extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isActive: false,
      };

      this.handleActiveChange = this.handleActiveChange.bind(this);
      this.setSortingDropDown = this.setSortingDropDown.bind(this);
    }

    handleActiveChange() {
      this.setState((prevState) => ({isActive: !prevState.isActive}));
    }

    setSortingDropDown(value) {
      return () => {
        this.handleActiveChange();
        this.props.setSortingOptionAction(value);
      };
    }

    render() {
      return (
        <Component
          {...this.props}
          isActive={this.state.isActive}
          onActiveChange={() => this.handleActiveChange}
          onClickSortingOption={this.setSortingDropDown}
        />
      );
    }
  }

  WithActiveFlag.propTypes = {
    setSortingOptionAction: applicationPropTypes.setSortingOptionAction,
  };

  const mapDispatchToProps = (dispatch) => ({
    setSortingOptionAction(value) {
      dispatch(setSortingOption(value));
    },
  });

  return connect(null, mapDispatchToProps)(WithActiveFlag);
};

export default withActiveFlag;

