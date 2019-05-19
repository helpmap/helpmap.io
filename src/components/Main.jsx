/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { Grid, Segment, Loader } from 'semantic-ui-react';
// import { ReactiveList } from '@appbaseio/reactivesearch';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Card } from 'antd';
import Appbase from 'appbase-js';

// import ReactiveGoogleMap from './ReactiveGoogleMap';
import Marker from './marker_example';
import CategoryMenu from './Top/CategoryMenu';
import SideMenu from './addEditForm/SideMenu';
import './Main.scss';
import ClusterMarker from './ClusterMarker';

export const appbaseRef = Appbase({
  url: 'https://scalr.api.appbase.io/',
  app: 'helpmap',
  credentials: 'IOa16MiOe:224b8ae4-f21a-4c25-9c01-e9212f90a0b5',
});

// const GreenEssence = require('./GreenEssence');

const defaultZoomIn = 10;

// Return map bounds based on list of places
const getMapBounds = (maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach(place => {
    bounds.extend(new maps.LatLng(place.lat, place.lng));
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
  const bounds = getMapBounds(maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

const Main = () => {
  // adding | editing | singleResult | multiResults | browsing
  const [mode, setMode] = useState('browsing');
  const [category, setCategory] = useState('');
  const [show, setShow] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState();
  const [shouldShowMap, showMap] = useState(false);
  const [location, setLocation] = useState({ lat: 49.8397, lng: 24.0297 });
  const [result, setResult] = useState({});
  const [places, setPlaces] = useState([]);
  const [zoom, setZoom] = useState(defaultZoomIn);

  const options = {
    enableHighAccuracy: false,
    timeout: 20 * 1000,
    maximumAge: 10 * 60 * 1000, // 10 mins
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        getData(position.coords.latitude, position.coords.longitude).then(data => {
          setPlaces(data);
          showMap(true);
        });
      },
      () => showMap(true),
      options
    );
  }, []);

  useEffect(() => {
    setMode(mode);
  }, [mode]);

  function getData(lat, lng) {
    return new Promise((resolve, reject) => {
      appbaseRef
        // @ts-ignore
        .search({
          type: 'doc',
          size: 100,
          body: {
            // query: {
            //   term: {
            //     types: 'volunteer',
            //   },
            // },
            sort: [
              {
                _geo_distance: {
                  location: {
                    lat,
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
          const hits = data.hits.hits.map(h => ({ lat: h._source.location.lat, lng: h._source.location.lon, ...h }));
          resolve(hits);
        })
        .catch(error => {
          console.log('caught a stream error', error);
          reject(error);
        });
    });
  }

  function renderItem(res) {
    // if (res.length < 1) return <h2>No results</h2>;
    const data = res._source;
    return (
      <Card key={res._id}>
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
          location,
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
    setZoom(14);
  };

  const onSelectCategory = category => {
    // setZoom(13);
    createClusters();
    if (category) {
      setMode('multiResults');
      setShow(true);
      setCategory(category);
      return;
    }
    setMode('browsing');
    setShow(false);
  };

  const showSingleFromList = data => {
    setMode('singleResult');
    setResult(data);
    setShow(true);
    // setZoom(defaultZoomIn);
  };

  const handleMapChange = async ({ center, zoom, bounds }) => {
    const places = await getData(center.lat, center.lng);
    setPlaces(places);
    setBounds(bounds);
    console.log(zoom);
    setZoom(zoom);
    setLocation(center);

    createClusters();
  };

  function createClusters() {
    if (!bounds) return setClusters([]);
    const clusters = getClusters();
    setClusters(
      clusters.map(({ wx, wy, numPoints, points }) => ({
        lat: wy,
        lng: wx,
        numPoints,
        _id: `${numPoints}_${points[0]._id}`,
        points,
      }))
    );
  }

  // const onMarkerClick = async selectedMarkerData => {
  //   if (result && result._id === selectedMarkerData._id) {
  //     setMode('browsing');
  //     setResult({});
  //     setShow(false);
  //     setZoom(13);
  //     return;
  //   }
  //   showSingleFromList(selectedMarkerData);
  // };

  const getClusters = () => {
    const clusters = supercluster(places, {
      minZoom: 0,
      maxZoom: 16,
      radius: 60,
    });

    return clusters({ bounds, zoom, center: location });
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
              {mode === 'multiResults' ? (
                <div className="results-list">
                  {places.filter(p => (category ? p._source.types.includes(category) : true)).map(p => renderItem(p))}
                </div>
              ) : (
                // <ReactiveList
                //   className="results-list"
                //   componentId="SearchResult"
                //   dataField=""
                //   react={{ and: ['Types', 'Filter'] }}
                //   showResultStats={false}
                //   renderItem={renderItem}
                //   defaultQuery={defaultQuery}
                // />
                <SideMenu
                  mode={mode}
                  data={result}
                  addPlace={addPlace}
                  setShow={setShow}
                  backToResults={backToResults}
                  setMode={setMode}
                />
              )}
            </Grid.Column>
          )}
          <Grid.Column
            only={mode === 'browsing' ? null : 'large screen'}
            className={!shouldShowMap ? 'vertical-align' : 'map-container'}
            width={show ? 12 : 16}>
            {!shouldShowMap ? <Loader active inline="centered" size="large" /> : null}
            {shouldShowMap && (
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBQdVcKCe0q_vOBDUvJYpzwGpt_d_uTj4Q' }}
                defaultCenter={location}
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
                onChange={handleMapChange}>
                {clusters.map(item =>
                  item.numPoints === 1 ? (
                    <Marker
                      key={item._id}
                      text={item.points[0]._source.name}
                      lat={item.lat}
                      lng={item.lng}
                      onClick={() => console.log(item)}
                    />
                  ) : (
                    <ClusterMarker key={item._id} lat={item.lat} lng={item.lng} points={item.points} />
                  )
                )}
                {/* {places.map(place => (
                  <Marker
                    key={place._id}
                    text={place._source.name}
                    lat={place._source.location.lat}
                    lng={place._source.location.lon}
                    onClick={() => console.log(place)}
                  />
                ))} */}
              </GoogleMapReact>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {shouldShowMap && renderFloatingButton()}
    </div>
  );
};

export default Main;
