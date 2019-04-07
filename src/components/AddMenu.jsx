/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Appbase from 'appbase-js';
import { Grid, Segment, Modal, Form, Checkbox } from 'semantic-ui-react';
import categories from './Top/messages/menuMessages';
import GoogleSuggest from './GoogleSuggest';

const apappbaseRef = Appbase({
  url: 'https://scalr.api.appbase.io/helpmap/',
  app: 'helpmap',
  credentials: 'FSgW29GYr:1f6ad732-faf2-4466-aa4b-4a1f35fd09d3',
});

const AddMenu = ({ setMode, setShow }) => {
  const [result, setResult] = useState({});
  const [modalOpen, handleModal] = useState(false);
  const [name, handleName] = useState('');
  const [address, handleAddress] = useState('');
  const [description, handleDescription] = useState('');
  const [location, setLocation] = useState({});
  const choosenTypes = new Set();

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

    console.log(jsonObject);

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
  };

  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Input
          label="Name of Organisation"
          placeholder="Name of Organisation"
          value={name}
          onChange={e => handleName(e.target.value)}
        />
        <Form.Field>
          <GoogleSuggest result={address} handleAddress={handleAddress} setLocation={setLocation} />
        </Form.Field>
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
              data.checked ? choosenTypes.add(data.value) && console.log(choosenTypes) : choosenTypes.delete(data.value)
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
  );
};

export default AddMenu;
