/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Appbase from 'appbase-js';
import { Grid, Segment, Modal, Form, Checkbox } from 'semantic-ui-react';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import { ReactiveMap } from '@appbaseio/reactivemaps';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import categories from './Top/messages/menuMessages';

import CategoryMenu from './Top/CategoryMenu';
import InfoPanel from './InfoPanel';
import './Main.scss';

const apappbaseRef = Appbase({
  url: 'https://scalr.api.appbase.io/helpmap/',
  app: 'helpmap',
  credentials: 'FSgW29GYr:1f6ad732-faf2-4466-aa4b-4a1f35fd09d3',
});

const Main = () => {
  // adding | editing | singleResult | multiResults | browsing
  const [mode, setMode] = useState('browsing');
  const [show, setShow] = useState(false);
  const [result, setResult] = useState({});
  const [modalOpen, handleModal] = useState(false);
  const [name, handleName] = useState('');
  const [address, handleAddress] = useState('');
  const [description, handleDescription] = useState('');
  // const [category, handleChoosenCategorie] = useState('');
  const choosenTypes = new Set();

  const renderResults = hits => (
    <div className="card-container">
      {hits.map(data => (
        <div key={data._id} className="card">
          <div className="card__image" style={{ backgroundImage: `url(${data.image})` }} title={data.name} />
          <div>
            <h2>{data.name}</h2>
            {data.types.map((type, i) => (
              <div key={i} className="card__type">
                {type}
              </div>
            ))}
            <p className="card__description">{data.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLeftCol = (hits, streamHits, loadMore, renderMap, renderPagination) => (
    <Grid padded="horizontally">
      <Grid.Row style={{ padding: 0 }}>
        {show && (
          <Grid.Column width={4}>
            {hits.length > 0 && mode === 'multiResults' && renderResults(hits)}
            {hits.length > 0 && mode === 'singleResult' && <InfoPanel data={result} />}
          </Grid.Column>
        )}
        <Grid.Column className="map-container" width={show ? 12 : 16}>
          {renderMap()}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  const addNewPlace = e => {
    e.preventDefault();
    setMode('adding');
    const jsonObject = {
      name: `${name}`,
      types: `${Array.from(choosenTypes).join(' ')}`,
      address: `${address}`,
      location: {
        lat: 1.34,
        long: 2.4,
      },
      description: `${description}`,
    };

    apappbaseRef
      .index({
        type: `${Math.random()}`,
        body: jsonObject,
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    handleModal(false);
  };

  const renderFloatingButton = () => (
    <Modal
      trigger={
        <Fab onClick={() => handleModal(true)} className="fab" aria-label="Add Location" disableRipple color="primary">
          <AddIcon />
        </Fab>
      }
      open={modalOpen}
      onClose={() => handleModal(false)}>
      <Modal.Header>Add organisation</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name of Organisation"
              placeholder="Name of Organisation"
              value={name}
              onChange={e => handleName(e.target.value)}
            />
            <Form.Input
              fluid
              label="Adress"
              placeholder="Adress"
              value={address}
              onChange={e => handleAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group inline>
            <label>Categories</label>
            {Object.keys(categories).map((el, index) => (
              <Checkbox
                value={el}
                key={index}
                label={el}
                control="input"
                type="checkbox"
                onChange={(e, data) =>
                  data.checked
                    ? choosenTypes.add(data.value) && console.log(choosenTypes)
                    : choosenTypes.delete(data.value)
                }
              />
            ))}
          </Form.Group>
          <Form.TextArea
            label="Description"
            placeholder="Tell us more about your organisation..."
            value={description}
            onChange={e => handleDescription(e.target.value)}
          />
          <Form.Button onClick={(e, data) => addNewPlace(e, data)}>Add organisation</Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );

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
        <Grid.Row className="top-row">
          <Grid.Column>
            <Segment>
              <CategoryMenu onSelect={onSelect} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <ReactiveMap
          componentId="map"
          dataField="location"
          className="right-col"
          style={{ height: '100%', padding: 0 }}
          defaultZoom={13}
          defaultCenter={{ lat: 49.8397, lng: 24.0297 }} // Lviv
          defaultMapStyle="Blue Essence"
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
          // onData={data => ({
          //   label: data.types.map((type, i) => (
          //     <span key={i} style={{ width: 40, display: 'block', textAlign: 'center' }}>
          //       {type}
          //     </span>
          //   )),
          // })}
          react={{ and: ['Types'] }}
        />
        {renderFloatingButton()}
      </ReactiveBase>
    </div>
  );
};

export default Main;
