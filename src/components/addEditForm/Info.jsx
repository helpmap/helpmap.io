import React, { useState, useEffect } from 'react';
import { Container, Icon, Button } from 'semantic-ui-react';
import categories from '../Top/messages/menuMessages';

import './AddMenu.scss';
import { appbaseRef } from '../Main';
import { Card } from 'antd';

const showCategories = types =>
  types.split(' ').map((name, i) => (
    <span key={i} className="category-icon" title={name}>
      {categories[name].icon}
    </span>
  ));

const Info = ({ setMode, id }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { _source: data } = await appbaseRef.get({ type: 'doc', id });

      setData(data);
    };
    if (id) fetchData();
  }, [id]);

  if (!data) return null;

  return (
    <Container text fluid>
      <Card>
        <Button icon="edit" className="edit-btn" onClick={() => setMode('editing')} />
        <h2>{data.name}</h2>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/dir/?api=1&destination=${data.location.lat},${data.location.lon}`}>
          {data.address}
        </a>
        <div className="category-menu">{data.types && showCategories(data.types[0])}</div>
        <p className="description">{data.description}</p>
      </Card>
    </Container>
  );
};

export default Info;
