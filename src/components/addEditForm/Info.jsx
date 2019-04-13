import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import BackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import { Card } from 'antd';
import { injectIntl } from 'react-intl';

import './SideMenu.scss';
import categories from '../Top/messages/menuMessages';
import { appbaseRef } from '../Main';

const showCategories = (types, intl) =>
  types.split(' ').map((name, i) => (
    <span key={i} className="category-icon" title={intl.formatMessage({ id: categories[name].id })}>
      {categories[name].icon}
    </span>
  ));

const Info = ({ setMode, id, intl }) => {
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
    <Container text fluid className="info-container">
      <Card bordered={false}>
        {/* <Button icon="edit" className="edit-btn" onClick={() => setMode('editing')} /> */}
        {/* <Button icon="arrow left" className="back-btn" onClick={() => setMode('multiResults')} /> */}
        <EditIcon className="edit-btn" onClick={() => setMode('editing')} />
        <BackIcon className="back-btn" onClick={() => setMode('multiResults')} />
        <h2>{data.name}</h2>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/dir/?api=1&destination=${data.location.lat},${data.location.lon}`}>
          {data.address}
        </a>
        <div className="category-menu">{data.types && showCategories(data.types[0], intl)}</div>
        <p className="description">{data.description}</p>
      </Card>
    </Container>
  );
};

export default injectIntl(Info);
