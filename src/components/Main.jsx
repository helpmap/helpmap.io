/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { Grid, Segment, Loader } from 'semantic-ui-react';
import { ReactiveList } from '@appbaseio/reactivesearch';
import GoogleMapReact from 'google-map-react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Card } from 'antd';
import Appbase from 'appbase-js';

// import ReactiveGoogleMap from './ReactiveGoogleMap';
import Marker from './marker_example';
import CategoryMenu from './Top/CategoryMenu';
import SideMenu from './addEditForm/SideMenu';
import './Main.scss';

export const appbaseRef = Appbase({
  url: 'https://scalr.api.appbase.io/',
  app: 'helpmap',
  credentials: 'IOa16MiOe:224b8ae4-f21a-4c25-9c01-e9212f90a0b5',
});

// const GreenEssence = require('./GreenEssence');

const defaultZoomIn = 14;

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach(place => {
    bounds.extend(new maps.LatLng(place._source.location.lat, place._source.location.lon));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

const Main = () => {
  // adding | editing | singleResult | multiResults | browsing
  const [mode, setMode] = useState('browsing');
  const [show, setShow] = useState(false);
  const [shouldShowMap, showMap] = useState(false);
  const [location, setLocation] = useState({ lat: 49.8397, lng: 24.0297 });
  const [result, setResult] = useState({});
  const [places, setPlaces] = useState([]);
  const [zoom, setZoom] = useState(13);

  const options = {
    enableHighAccuracy: false,
    timeout: 20 * 1000,
    maximumAge: 10 * 60 * 1000, // 10 mins
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        getData({ lat: position.coords.latitude, lng: position.coords.longitude }).then(data => {
          setPlaces(data);
          console.log('setPlaces');
          showMap(true);
        });
      },
      () => {
        setLocation({ lat: 49.8397, lng: 24.0297 });
        showMap(true);
      },
      options
    );
  }, []);

  useEffect(() => {
    setMode(mode);
  }, [mode]);

  function getData({ lat, lng }) {
    return new Promise((resolve, reject) => {
      appbaseRef
        .search({
          type: 'doc',
          body: {
            sort: [
              {
                _geo_distance: {
                  location: {
                    lat: lat,
                    lon: lng,
                  },
                  order: 'asc',
                  unit: 'km',
                  distance_type: 'plane',
                },
              },
            ],
          },
        })
        .then(data => {
          console.log(data);
          resolve(data.hits.hits);
        })
        .catch(error => {
          console.log('caught a stream error', error);
          reject(error);
        });
    });
  }

  function renderItem(data) {
    if (data.length < 1) return <h2>No results</h2>;
    return (
      <Card key={data._id}>
        <h2 onClick={() => showSingleFromList(data)}>{data.name}</h2>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/dir/?api=1&destination=${data.location.lat},${data.location.lon}`}>
          {data.address}
        </a>
      </Card>
    );
  }

  const defaultQuery = () => ({
    sort: [
      {
        _geo_distance: {
          location: {
            lat: location.lat,
            lon: location.lng,
          },
          order: 'asc',
          unit: 'km',
          distance_type: 'plane',
        },
      },
    ],
  });

  const renderFloatingButton = () => (
    <Fab onClick={addPlace} className="fab" aria-label="Add Location" disableRipple color="primary">
      <AddIcon />
    </Fab>
  );

  const addPlace = () => {
    if (mode !== 'adding') {
      setShow(true);
      setMode('adding');
      return;
    }
    setMode('browsing');
    setShow(false);
  };

  const backToResults = () => {
    setShow(true);
    setMode('multiResults');
    setZoom(13);
  };

  const onSelectCategory = category => {
    setZoom(13);
    if (category) {
      setMode('multiResults');
      setShow(true);
      return;
    }
    setMode('browsing');
    setShow(false);
  };

  const showSingleFromList = data => {
    setMode('singleResult');
    setResult(data);
    setShow(true);
    setZoom(defaultZoomIn);
  };

  const onMarkerClick = async selectedMarkerData => {
    if (result && result._id === selectedMarkerData._id) {
      setMode('browsing');
      setHighlight(null);
      setResult({});
      setShow(false);
      setZoom(13);
      return;
    }
    showSingleFromList(selectedMarkerData);
  };

  return (
    <div className="container">
      <Grid.Row className="top-row top-row-cat">
        <Grid.Column>
          <Segment>
            <CategoryMenu onSelect={onSelectCategory} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid padded="horizontally">
        <Grid.Row style={{ padding: 0 }}>
          {show && (
            <Grid.Column className="left-col" width={4}>
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </ReactiveBase>
      {shouldShowMap && renderFloatingButton()}
    </div>
  );
};

export default Main;
