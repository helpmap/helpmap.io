/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch';
import { ReactiveMap } from '@appbaseio/reactivemaps';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import CategoryMenu from './Top/CategoryMenu';
import AddMenu from './AddMenu';
import './Main.scss';
import { Card } from 'antd';

const Main = () => {
  // adding | editing | singleResult | multiResults | browsing
  const [mode, setMode] = useState('browsing');
  const [show, setShow] = useState(false);
  const [result, setResult] = useState({});
  // const [modalOpen, handleModal] = useState(false);

  function renderItem(data) {
    if (data.length < 1) return <h2>No results</h2>;
    return (
      <Card key={data._id}>
        {/* <div className="card__image" style={{ backgroundImage: `url(${data.image})` }} title={data.name} /> */}
        <div>
          <h2>{data.name}</h2>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`http://maps.google.com/?ie=UTF8&hq=&ll=${data.location.lat},${data.location.lon}&z=13`}>
            {data.address}
          </a>
        </div>
      </Card>
    );
  }

  const renderLeftCol = (hits, streamHits, loadMore, renderMap, renderPagination) => {
    return renderMap();
  };

  // FSgW29GYr:1f6ad732-faf2-4466-aa4b-4a1f35fd09d3
  const renderFloatingButton = () => (
    <Fab className="fab" aria-label="Add Location" disableRipple color="primary">
      <AddIcon onClick={addPlace} />
    </Fab>
  );

  const addPlace = () => {
    setShow(true);
    console.log('addPlace');
    setMode('adding');
  };

  const onPopoverClick = data => {
    setMode('singleResult');
    setResult(data);
    setShow(true);
    return null;
  };

  const onSelect = () => {
    setMode('multiResults');
    setShow(true);
    return null;
  };

  return (
    <div className="container">
      <ReactiveBase
        app="helpmap"
        // analytics
        credentials="6Oc2N0Ats:cd4782b5-de89-4675-9a48-e4b5423cd9e2"
        // type="listing"
        theme={{
          colors: {
            primaryColor: '#fff',
          },
        }}>
        <Grid.Row className="top-row top-row-cat">
          <Grid.Column>
            <Segment>
              <CategoryMenu onSelect={onSelect} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid padded="horizontally">
          <Grid.Row style={{ padding: 0 }}>
            {show && (
              <Grid.Column className="left-col" width={4}>
                {mode === 'multiResults' && (
                  <ReactiveList
                    react={{ and: ['Types'] }}
                    componentId="SearchResult"
                    dataField=""
                    renderItem={renderItem}
                  />
                )}
                {mode === 'adding' && <AddMenu setShow={setShow} setMode={setMode} />}
                {mode === 'singleResult' && <AddMenu data={result} setShow={setShow} setMode={setMode} />}
              </Grid.Column>
            )}
            <Grid.Column className="map-container" width={show ? 12 : 16}>
              <ReactiveMap
                componentId="map"
                dataField="location"
                className="right-col"
                style={{ height: '100%', padding: 0 }}
                defaultZoom={13}
                defaultCenter={{ lat: 49.8397, lng: 24.0297 }} // Lviv
                defaultMapStyle="Flat Map"
                // pagination
                // onPageChange={() => {
                //   window.scrollTo(0, 0);
                // }}
                onPopoverClick={onPopoverClick}
                showMarkerClusters={false}
                // autoClosePopover
                showSearchAsMove
                searchAsMove
                // showMapStyles={true}
                unit="km"
                onAllData={renderLeftCol}
                // eslint-disable-next-line no-unused-vars
                onData={_ => ({ icon: '/pin.svg' })}
                // onData={data => ({
                //   label: data.types.map((type, i) => (
                //     <span key={i} style={{ width: 40, display: 'block', textAlign: 'center' }}>
                //       {type}
                //     </span>
                //   )),
                // })}
                react={{ and: ['Types'] }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </ReactiveBase>
      {renderFloatingButton()}
    </div>
  );
};

export default Main;
