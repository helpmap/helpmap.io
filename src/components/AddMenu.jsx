/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import Appbase from 'appbase-js';
import { Form, Checkbox } from 'semantic-ui-react';
// import { Form, Icon, Input, Button, Checkbox } from 'antd';

import categories from './Top/messages/menuMessages';
import GoogleSuggest from './GoogleSuggest';

import './AddMenu.scss';

const apappbaseRef = Appbase({
  url: 'https://scalr.api.appbase.io/helpmap/',
  app: 'doc',
  credentials: 'FSgW29GYr:1f6ad732-faf2-4466-aa4b-4a1f35fd09d3',
});

const AddMenu = ({ setMode, setShow, data }) => {
  const [name, handleName] = useState('');
  const [address, handleAddress] = useState('');
  const [description, handleDescription] = useState('');
  const [location, setLocation] = useState({});
  const [choosenTypes, chooseType] = useState([]);
  let types;

  useEffect(() => {
    if (data) {
      handleName(data.name);
      handleAddress(data.address);
      handleDescription(data.description);
      setLocation(data.location);
      chooseType(data.types[0].split(' '));
      types = data.types;
    }
  }, [data]);

  const addNewPlace = e => {
    e.preventDefault();
    types =
      types ||
      Array.from(choosenTypes)
        .map(el => el)
        .join(' ');

    const jsonObject = {
      types: [`${types}`],
      address,
      name,
      description,
      location,
    };

    apappbaseRef
      .index({
        type: `${Math.random(100)}`,
        body: jsonObject,
      })
      .then(function(response) {
        console.log(response);
        setShow(false);
        setMode('browsing');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  function onSelect(e, data) {
    if (data.checked) {
      chooseType([...choosenTypes, data.value]);
      return;
    }
    const filter = choosenTypes.filter(c => c !== data.value);
    chooseType(filter);
  }

  function canSubmit() {
    if (data) {
      return data.name && data.address && data.description && data.location.lat && data.types.length > 0;
    }
    return name && address && description && location && location.lat && choosenTypes.length > 0;
  }

  return (
    <Form className="add-menu">
      <Form.Input
        label="Name of Organisation"
        placeholder="Name of Organisation"
        value={name}
        onChange={e => handleName(e.target.value)}
      />
      <Form.Field>
        <GoogleSuggest result={address} handleAddress={handleAddress} setLocation={setLocation} />
      </Form.Field>
      <Form.Group style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Object.keys(categories).map((el, index) => (
          <Checkbox
            value={el}
            style={{ padding: '0.5em' }}
            key={index}
            label={el}
            control="input"
            type="checkbox"
            checked={data && choosenTypes.includes(el)}
            onClick={onSelect}
          />
        ))}
      </Form.Group>
      <Form.TextArea
        rows={9}
        label="Description"
        placeholder="Tell us more about your organisation..."
        value={description}
        onChange={e => handleDescription(e.target.value)}
      />
      {!data && (
        <Form.Button disabled={!canSubmit()} onClick={(e, data) => addNewPlace(e, data)}>
          Add organisation
        </Form.Button>
      )}
    </Form>
  );
};

export default AddMenu;
