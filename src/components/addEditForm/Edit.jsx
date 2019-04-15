import React, { useState, useEffect } from 'react';
import { Form, Checkbox, Icon } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import categories from '../Top/messages/menuMessages';
import GoogleSuggest from '../GoogleSuggest';
import { appbaseRef } from '../Main';

import './SideMenu.scss';

const Edit = ({ setMode, setShow, id, intl }) => {
  const [name, handleName] = useState('');
  const [address, handleAddress] = useState('');
  const [description, handleDescription] = useState('');
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [location, setLocation] = useState({});
  const [choosenTypes, chooseType] = useState([]);
  let types;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const { _source: data } = await appbaseRef.get({ type: 'doc', id });

        handleName(data.name);
        handleAddress(data.address);
        handleDescription(data.description);
        setLocation(data.location);
        chooseType(data.types[0].split(' '));
        types = data.types;
        setVisible(true);
      };
      fetchData();
    }
  }, [id]);

  const updatePlace = e => {
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

    appbaseRef
      .index({
        id,
        type: 'doc',
        body: jsonObject,
      })
      .then(() => {
        // console.log(response);
        setSuccess(true);
      })
      .catch(function(error) {
        console.log(error);
        setShow(false);
        setMode('browsing');
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
    return name && address && description && location && location.lat && choosenTypes.length > 0;
  }

  if (id && !visible) return null;

  if (success)
    return (
      <div className="success-container vertical-align">
        <Icon color="green" name="check circle" size="huge" />
      </div>
    );

  return (
    <Form className="add-menu">
      <Form.Input
        placeholder={intl.formatMessage({ id: 'Add.Name_Organization' })}
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
            label={intl.formatMessage({ id: categories[el].id })}
            control="input"
            type="checkbox"
            checked={choosenTypes.includes(el)}
            onClick={onSelect}
          />
        ))}
      </Form.Group>
      <Form.TextArea
        rows={9}
        placeholder={intl.formatMessage({ id: 'Add.Description.Placeholder' })}
        value={description}
        onChange={e => handleDescription(e.target.value)}
      />
      {
        <Form.Button color="red" disabled={!canSubmit()} onClick={updatePlace}>
          {intl.formatMessage({ id: 'Save' })}
        </Form.Button>
      }
    </Form>
  );
};

export default injectIntl(Edit);
