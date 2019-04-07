import React from 'react';
import { Segment, Button, Header, Container } from 'semantic-ui-react';
import categories from './Top/messages/menuMessages';

const showCategories = types => <div>{types.map(type => console.log(type))}</div>;

const InfoPanel = ({ data }) => {
  return (
    <Container>
      <Button floated="right" circular icon="share alternate" />
      <Header dividing as="h2" style={{ marginTop: 0 }}>
        <Header.Content>{data.name}</Header.Content>
        <Header.Subheader>{data.address}</Header.Subheader>
      </Header>
      {showCategories(data.types)}
      <Segment basic padded="very">
        {data.description}
      </Segment>
    </Container>
  );
};

export default InfoPanel;
