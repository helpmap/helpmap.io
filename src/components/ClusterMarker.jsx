import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MarkerCounter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  padding: 8px;
  margin-left: -10px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: red;
`;

class ClusterMarker extends React.PureComponent {
  render() {
    // const clusterMarkers = this.props.points.slice(0, 1);
    return <MarkerCounter>+{this.props.points.length}</MarkerCounter>;
    //   {/* {clusterMarkers.map(marker => (
    //   <Marker key={marker.id} lat={marker.lat} lon={marker.lon} name={marker.id} inGroup />
    // ))} */}
  }
}

ClusterMarker.propTypes = {
  points: PropTypes.array,
  selected: PropTypes.bool,
};

export default ClusterMarker;
