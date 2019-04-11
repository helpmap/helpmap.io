import React from 'react';
import { Container, Header, Icon, Button } from 'semantic-ui-react';
import categories from '../Top/messages/menuMessages';

import './AddMenu.scss';

const showCategories = types =>
  types.split(' ').map((name, i) => (
    <span key={i} className="category-icon" style={{ fill: categories[name].color }}>
      {categories[name].icon}
    </span>
  ));

const Info = ({ data, setMode }) => {
  return (
    <Container text fluid>
      <Button icon className="edit" onClick={() => setMode('editing')}>
        <Icon name="edit" />
      </Button>
      <Header className="header" as="h2" block textAlign="center">
        {data.name}
        <Header.Subheader>{data.address}</Header.Subheader>
        <Header.Content className="category-menu">{data.types && showCategories(data.types[0])}</Header.Content>
      </Header>
      <p className="description">{data.description}</p>
    </Container>
  );
};

export default Info;
