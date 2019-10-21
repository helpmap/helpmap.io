/*global google*/
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { getInnerKey, isEqual } from '@appbaseio/reactivecore/lib/utils/helper';
import types from '@appbaseio/reactivecore/lib/utils/types';

import Dropdown from '@appbaseio/reactivesearch/lib/components/shared/Dropdown';
import { MapPin, MapPinArrow, mapPinWrapper } from './MapPin';

import ReactiveMap from './ReactiveMap';

// const Standard = require('./addons/styles/Standard');
const BlueEssence = require('./BlueEssence');
// const BlueWater = require('./addons/styles/BlueWater');
// const FlatMap = require('./addons/styles/FlatMap');
// const LightMonochrome = require('./addons/styles/LightMonochrome');
// const MidnightCommander = require('./addons/styles/MidnightCommander');
// const UnsaturatedBrowns = require('./addons/styles/UnsaturatedBrowns');

const MapComponent = withGoogleMap(props => {
  const { children, onMapMounted, ...allProps } = props;

  return (
    <GoogleMap ref={onMapMounted} {...allProps}>
      {children}
    </GoogleMap>
  );
});

class ReactiveGoogleMap extends Component {
  constructor(props) {
    super(props);

    this.mapStyles = [
      // { label: 'Standard', value: Standard },
      { label: 'Blue Essence', value: BlueEssence },
      // { label: 'Blue Water', value: BlueWater },
      // { label: 'Flat Map', value: FlatMap },
      // { label: 'Light Monochrome', value: LightMonochrome },
      // { label: 'Midnight Commander', value: MidnightCommander },
      // { label: 'Unsaturated Browns', value: UnsaturatedBrowns },
    ];

    const currentMapStyle = this.mapStyles.find(style => style.label === props.defaultMapStyle) || this.mapStyles[0];

    this.state = {
      currentMapStyle,
      markerOnTop: null,
      openMarkers: {},
      mapRef: null,
      updaterKey: 0,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      !isEqual(this.state.openMarkers, nextState.openMarkers) ||
      !isEqual(this.state.currentMapStyle, nextState.currentMapStyle)
    ) {
      this.handleUpdaterKey();
    }

    if (this.props.defaultMapStyle !== nextProps.defaultMapStyle) {
      this.handleStyleChange(nextProps.defaultMapStyle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.highlighted !== nextProps.highlighted &&
      this.state.markerOnTop !== nextProps.highlighted &&
      nextProps.highlighted
    ) {
      this.increaseMarkerZIndex(nextProps.highlighted);
    } else this.removeMarkerZIndex();
  }

  handleStyleChange = newStyle => {
    this.setState({
      currentMapStyle: this.mapStyles.find(style => style.label === newStyle) || this.mapStyles[0],
    });
  };

  openMarkerInfo = (item, autoClosePopover, handlePreserveCenter) => {
    if (this.state.markerOnTop !== item._id) this.increaseMarkerZIndex(item._id, handlePreserveCenter);
    else this.removeMarkerZIndex(handlePreserveCenter);
    this.props.onMarkerClick && this.props.onMarkerClick(item);
    const openMarkers = autoClosePopover ? { [item._id]: true } : { ...this.state.openMarkers, [item._id]: true };
    this.setState({
      openMarkers,
    });

    // else handlePreserveCenter(true);
  };

  closeMarkerInfo = (id, autoClosePopover, handlePreserveCenter) => {
    // eslint-disable-next-line no-unused-vars
    const { [id]: del, ...activeMarkers } = this.state.openMarkers;
    const openMarkers = autoClosePopover ? {} : activeMarkers;

    this.setState({
      openMarkers,
    });

    handlePreserveCenter(true);
  };

  handleUpdaterKey = () => {
    this.setState(prevState => ({
      updaterKey: prevState.updaterKey + 1,
    }));
  };

  renderPopover = (item, params, includeExternalSettings = false) => {
    let additionalProps = {};

    if (includeExternalSettings) {
      // to render pop-over correctly with MarkerWithLabel
      additionalProps = {
        position: params.getPosition(item),
        defaultOptions: {
          pixelOffset: new window.google.maps.Size(0, -30),
        },
      };
    }

    if (item._id in this.state.openMarkers) {
      return (
        <InfoWindow
          zIndex={500}
          key={`${item._id}-InfoWindow`}
          onCloseClick={() => this.closeMarkerInfo(item._id, params.autoClosePopover, params.handlePreserveCenter)}
          {...additionalProps}>
          <div>{params.onPopoverClick(item)}</div>
        </InfoWindow>
      );
    }
    return null;
  };

  increaseMarkerZIndex = (id, handlePreserveCenter) => {
    this.setState({ markerOnTop: id });

    handlePreserveCenter && handlePreserveCenter(true);
  };

  removeMarkerZIndex = handlePreserveCenter => {
    this.setState({ markerOnTop: null });

    handlePreserveCenter && handlePreserveCenter(true);
  };

  getMarkers = params => {
    let markers = [];
    if (params.showMarkers) {
      markers = params.resultsToRender.map(item => {
        const markerProps = {
          position: params.getPosition(item),
        };

        if (this.state.markerOnTop === item._id) {
          markerProps.zIndex = window.google.maps.Marker.MAX_ZINDEX + 1;
        }

        if (params.renderData) {
          const data = params.renderData(item);

          if ('label' in data) {
            return (
              <MarkerWithLabel
                key={item._id}
                labelAnchor={new window.google.maps.Point(0, 30)}
                icon="https://i.imgur.com/h81muef.png" // blank png to remove the icon
                onClick={() => this.openMarkerInfo(item, params.autoClosePopover, params.handlePreserveCenter)}
                // onMouseOver={() => this.increaseMarkerZIndex(item._id, params.handlePreserveCenter)}
                // onFocus={() => this.increaseMarkerZIndex(item._id, params.handlePreserveCenter)}
                // onMouseOut={() => this.removeMarkerZIndex(params.handlePreserveCenter)}
                // onBlur={() => this.removeMarkerZIndex(params.handlePreserveCenter)}
                {...markerProps}
                {...this.props.markerProps}>
                <div className={mapPinWrapper}>
                  <MapPin>{data.label}</MapPin>
                  <MapPinArrow />
                  {params.onPopoverClick ? this.renderPopover(item, params, true) : null}
                </div>
              </MarkerWithLabel>
            );
          } else if ('icon' in data) {
            markerProps.icon = data.icon;
            if (this.state.markerOnTop === item._id) markerProps.icon = params.selectedIcon;
          } else {
            return (
              <MarkerWithLabel
                key={item._id}
                labelAnchor={new window.google.maps.Point(0, 30)}
                icon="https://i.imgur.com/h81muef.png" // blank png to remove the icon
                onClick={() => this.openMarkerInfo(item, params.autoClosePopover, params.handlePreserveCenter)}
                // onMouseOver={() => this.increaseMarkerZIndex(item._id, params.handlePreserveCenter)}
                // onFocus={() => this.increaseMarkerZIndex(item._id, params.handlePreserveCenter)}
                // onMouseOut={() => this.removeMarkerZIndex(params.handlePreserveCenter)}
                // onBlur={() => this.removeMarkerZIndex(params.handlePreserveCenter)}
                {...markerProps}
                {...this.props.markerProps}>
                <div className={mapPinWrapper}>
                  {data.custom}
                  {params.onPopoverClick ? this.renderPopover(item, params, true) : null}
                </div>
              </MarkerWithLabel>
            );
          }
        } else if (params.defaultPin) {
          // markerProps.icon = params.defaultPin;
          markerProps.icon = {
            url: params.defaultPin,
            scaledSize: new google.maps.Size(31, 43),
          };
          if (this.state.markerOnTop === item._id) {
            markerProps.icon = {
              url: params.defaultPin,
              scaledSize: new google.maps.Size(55, 60),
            };
          }
        }

        return (
          <Marker
            key={item._id}
            onClick={() => this.openMarkerInfo(item, params.autoClosePopover || false, params.handlePreserveCenter)}
            // onMouseOver={() => this.increaseMarkerZIndex(item._id, params.handlePreserveCenter)}
            // onFocus={() => this.increaseMarkerZIndex(item._id, params.handlePreserveCenter)}
            // onMouseOut={() => this.removeMarkerZIndex(params.handlePreserveCenter)}
            // onBlur={() => this.removeMarkerZIndex(params.handlePreserveCenter)}
            {...markerProps}
            {...params.markerProps}>
            {params.onPopoverClick ? this.renderPopover(item, params) : null}
          </Marker>
        );
      });
    }
    return markers;
  };

  setMapStyle = currentMapStyle => {
    this.setState({
      currentMapStyle,
    });
  };

  onMapMounted = ref => {
    this.setState({ mapRef: ref });
    if (this.props.innerRef && ref) {
      const map = Object.values(ref.context)[0];
      const mapRef = { ...ref, map };
      this.props.innerRef(mapRef);
    }
  };

  renderMap = params => {
    if (typeof window === 'undefined' || (window && typeof window.google === 'undefined')) {
      return null;
    }
    const markers = this.getMarkers(params);

    const style = {
      width: '100%',
      height: '100%',
      position: 'relative',
    };

    return (
      <div style={style}>
        <MapComponent
          containerElement={<div style={style} />}
          mapElement={<div style={{ height: '100%' }} />}
          onMapMounted={this.onMapMounted}
          zoom={params.zoom}
          center={params.center}
          {...params.mapProps}
          onIdle={params.handleOnIdle}
          onZoomChanged={params.handleZoomChange}
          onDragEnd={params.handleOnDragEnd}
          options={{
            styles: this.state.currentMapStyle.value,
            ...getInnerKey(this.props.mapProps, 'options'),
          }}>
          {params.showMarkers && params.showMarkerClusters ? (
            <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
              {markers}
            </MarkerClusterer>
          ) : (
            markers
          )}
          {params.showMarkers && params.markers}
          {params.renderSearchAsMove()}
        </MapComponent>
        {params.showMapStyles ? (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 46,
              width: 120,
              zIndex: window.google.maps.Marker.MAX_ZINDEX + 1,
            }}>
            <Dropdown
              innerClass={params.innerClass}
              items={this.mapStyles}
              onChange={this.setMapStyle}
              selectedItem={this.state.currentMapStyle}
              keyField="label"
              returnsObject
              small
            />
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    return (
      <ReactiveMap
        {...this.props}
        renderMap={this.renderMap}
        mapRef={this.state.mapRef}
        updaterKey={this.state.updaterKey}
      />
    );
  }
}

ReactiveGoogleMap.propTypes = {
  autoCenter: types.bool,
  center: types.location,
  className: types.string,
  componentId: types.stringRequired,
  dataField: types.stringRequired,
  defaultCenter: types.location,
  defaultMapStyle: types.string,
  defaultPin: types.string,
  defaultQuery: types.func,
  defaultZoom: types.number,
  innerClass: types.style,
  innerRef: types.func,
  loader: types.title,
  mapProps: types.props,
  markerProps: types.props,
  markers: types.children,
  renderAllData: types.func,
  renderData: types.func,
  onMarkerClick: types.func,
  onPageChange: types.func,
  onPopoverClick: types.func,
  pages: types.number,
  pagination: types.bool,
  react: types.react,
  searchAsMove: types.bool,
  showMapStyles: types.bool,
  showMarkerClusters: types.bool,
  showMarkers: types.bool,
  showSearchAsMove: types.bool,
  size: types.number,
  sortBy: types.sortBy,
  stream: types.bool,
  streamAutoCenter: types.bool,
  style: types.style,
  URLParams: types.bool,
  defaultRadius: types.number,
  unit: types.string,
  autoClosePopover: types.bool,
  renderMap: types.func,
  updaterKey: types.number,
  mapRef: types.any,
  highlighted: types.any,
};

export default ReactiveGoogleMap;