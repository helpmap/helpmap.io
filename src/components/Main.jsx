/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { Grid, Segment, Loader } from 'semantic-ui-react';
import { ReactiveBase, ReactiveList, ReactiveComponent } from '@appbaseio/reactivesearch';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Card } from 'antd';
import Appbase from 'appbase-js';

import ReactiveGoogleMap from './ReactiveGoogleMap';
import CategoryMenu from './Top/CategoryMenu';
import SideMenu from './addEditForm/SideMenu';
import './Main.scss';

export const appbaseRef = Appbase({
  url: 'https://scalr.api.appbase.io/',
  app: 'helpmap',
  credentials: 'IOa16MiOe:224b8ae4-f21a-4c25-9c01-e9212f90a0b5',
});
const GreenEssence = require('./GreenEssence');

const defaultZoomIn = 13;

const Main = () => {
  // adding | editing | singleResult | multiResults | browsing
  const [mode, setMode] = useState('browsing');
  const [shouldShowMap, showMap] = useState(false);
  const [location, setLocation] = useState({});
  const [result, setResult] = useState({});
  const [highlighted, setHighlight] = useState();
  // const [zoom, setZoom] = useState(13);

  useEffect(() => {
    const options = {
      enableHighAccuracy: false,
      timeout: 20 * 1000,
      maximumAge: 10 * 60 * 1000, // 10 mins
    };
    navigator.geolocation.getCurrentPosition(
      async position => {
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        showMap(true);
        if (document.location.pathname.startsWith('/id/')) {
          const id = document.location.pathname.split('/id/')[1];
          // const id = '0.5269277230802099';
          const { _source: data } = await appbaseRef.get({ type: 'doc', id });
          showSingleFromList({ ...data, _id: id });
        }
      },
      e => {
        console.error(e);
        setLocation({ lat: 49.8397, lng: 24.0297 });
        showMap(true);
      },
      options
    );
  }, []);

  useEffect(() => {
    setMode(mode);
  }, [mode]);

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

  const renderLeftCol = (_, __, ___, renderMap) => renderMap();

  const renderFloatingButton = () => (
    <Fab onClick={addPlace} className="fab" aria-label="Add Location" disableRipple color="primary">
      <AddIcon />
    </Fab>
  );

  const addPlace = () => {
    if (mode !== 'adding') {
      setMode('adding');
      setHighlight(null);
      return;
    }
    setMode('browsing');
    setHighlight(null);
  };

  const backToResults = () => {
    setMode('multiResults');
    // setZoom(13);
    setHighlight(null);
  };

  const onSelectCategory = categories => {
    setHighlight(null);
    // setZoom(13);
    // console.log(categories);
    if (categories.length === 1) {
      setMode('multiResults');
      return;
    }
    setMode('browsing');
  };

  const showSingleFromList = data => {
    setHighlight(data._id);
    setMode('singleResult');
    setResult(data);
    // setZoom(defaultZoomIn);
  };

  const onMarkerClick = async selectedMarkerData => {
    if (result && result._id === selectedMarkerData._id) {
      setMode('browsing');
      setHighlight(null);
      setResult({});
      // setZoom(13);
      return;
    }
    showSingleFromList(selectedMarkerData);
  };

  return (
    <div className="container">
      <ReactiveBase
        app="helpmap"
        // analytics
        credentials="6Oc2N0Ats:cd4782b5-de89-4675-9a48-e4b5423cd9e2"
        // type="doc"
        theme={{
          colors: { primaryColor: '#fff' },
        }}>
        {highlighted && (
          <ReactiveComponent
            componentId="Filter"
            customQuery={() => ({
              // TODO: try to update the `center` prop instead
              query: { ids: { values: [highlighted] } },
            })}
          />
        )}
        <Grid.Row className="top-row top-row-cat">
          <Grid.Column>
            <Segment>
              <CategoryMenu onSelect={onSelectCategory} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid padded="horizontally">
          <Grid.Row style={{ padding: 0 }}>
            <Grid.Column
              only={mode === 'browsing' ? null : 'large screen'}
              className={`right-col ${!shouldShowMap ? 'vertical-align' : 'map-container'}`}
              mobile={16}
              computer={mode === 'browsing' ? 16 : 12}>
              {!shouldShowMap ? (
                <Loader active inline="centered" size="large" />
              ) : (
                <ReactiveGoogleMap
                  // autoCenter
                  componentId="map"
                  dataField="location"
                  className="map"
                  defaultZoom={defaultZoomIn}
                  defaultCenter={location}
                  innerClass={{ label: 'label' }}
                  // onPopoverClick={onPopoverClick}
                  // showMarkerClusters={false}
                  // autoClosePopover
                  showSearchAsMove
                  searchAsMove
                  // showMapStyles
                  mapProps={{ options: { styles: GreenEssence } }}
                  // defaultQuery={defaultQuery}
                  size={100}
                  // mapProps={{ onClick: () => console.log('onClick') }}
                  unit="km"
                  onAllData={renderLeftCol}
                  // eslint-disable-next-line no-unused-vars
                  // onData={_ => ({ custom: null })}
                  onMarkerClick={onMarkerClick}
                  highlighted={highlighted}
                  // markerProps={{
                  //   onClick: e => {
                  //     debugger;
                  //     console.log(e);
                  //   },
                  // }}
                  // onData={_ => ({ selectedIcon: '/pinHighlighted.svg', icon: '/pin.svg' })}
                  defaultPin="/pin.svg"
                  // onData={data => ({
                  //   label: data.types.map((type, i) => (
                  //     <span key={i} style={{ width: 40, display: 'block', textAlign: 'center' }}>
                  //       {type}
                  //     </span>
                  //   )),
                  // })}
                  react={{ and: ['Types', mode === 'singleResult' ? 'Filter' : ''] }}
                />
              )}
            </Grid.Column>
            <Grid.Column className="left-col" mobile={16} computer={mode === 'browsing' ? 0 : 4}>
              {mode === 'multiResults' ? (
                <ReactiveList
                  className="results-list"
                  componentId="SearchResult"
                  dataField=""
                  react={{ and: ['Types', 'Filter'] }}
                  showResultStats={false}
                  renderItem={renderItem}
                  defaultQuery={defaultQuery}
                />
              ) : (
                <SideMenu mode={mode} data={result} backToResults={backToResults} setMode={setMode} />
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
