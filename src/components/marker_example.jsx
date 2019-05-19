import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background-image: url("data:image/svg+xml,%3Csvg width='30' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512; fill: red' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035 c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719 c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
  user-select: none;
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
    -webkit-filter: drop-shadow(0 0 0.3rem rgba(0, 0, 0, 0.3));
    filter: drop-shadow(0 0 0.3rem rgba(0, 0, 0, 0.3));
  }
`;

/**
 * @param {{ text: string; onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; }} props
 */
const Marker = props => <Wrapper alt={props.text} {...(props.onClick ? { onClick: props.onClick } : {})} />;

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;
