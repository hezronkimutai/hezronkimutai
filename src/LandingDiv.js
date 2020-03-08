import React, { useRef } from 'react';
import propTypes from 'prop-types';

const LandingDiv = ({ land }) => {
  const landingDivRef = useRef();
  land(landingDivRef);
  return (
    <div className="landingDiv" ref={landingDivRef}>
      <div>Hello I am Hezron</div>
      {/* <div className="indicator">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div> */}
    </div>
  );
};
LandingDiv.propTypes = {
  land: propTypes.func,
};
LandingDiv.defaultProps = {
  land: null,
};
export default LandingDiv;
