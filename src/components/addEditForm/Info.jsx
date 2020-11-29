import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Form } from 'semantic-ui-react';
import BackIcon from '@material-ui/icons/ArrowBack';
// import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { Card } from 'antd';
import { injectIntl, FormattedHTMLMessage } from 'react-intl';
import Linkify from 'react-linkify';

import './SideMenu.scss';
import categories from '../Top/messages/menuMessages';
import { appbaseRef } from '../Main';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" {...props} />;
});

const showCategories = (types, intl) =>
  types.split(' ').map((name, i) => (
    <span key={i} className="category-icon" title={intl.formatMessage({ id: categories[name].id })}>
      {categories[name].icon}
    </span>
  ));

let Info = ({ setMode, backToResults, id, intl }) => {
  const [data, setData] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { _source: data } = await appbaseRef.get({ type: 'doc', id });

      setData(data);
    };
    if (id) fetchData();
  }, [id]);

  function share() {
    // open modal
    setShowModal(true);
    setTimeout(() => {
      const url = `https://helpmap.io/id/${id}`;
      if (document.getElementById('url-text')) document.getElementById('url-text').value = url;
    }, 300);
  }

  function copyShareLink() {
    try {
      if (document.getElementById('url-text')) document.getElementById('url-text').select();
      document.execCommand('copy');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  function handleClose() {
    setShowModal(false);
  }

  if (!data) return null;

  return (
    <>
      <Container text fluid className="info-container">
        <Card bordered={false}>
          {/* <Button icon="edit" className="edit-btn" onClick={() => setMode('editing')} /> */}
          {/* <Button icon="arrow left" className="back-btn" onClick={() => setMode('multiResults')} /> */}
          <>
            {/* <EditIcon className="edit-btn" onClick={() => setMode('editing')} /> */}
            <ShareIcon className="share-btn" onClick={() => share()} />
            <BackIcon className="back-btn" onClick={backToResults} />
          </>
          <h2>{data.name}</h2>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.google.com/maps/dir/?api=1&destination=${data.location.lat},${data.location.lon}`}>
            {data.address}
          </a>
          <div className="category-menu">{data.types && showCategories(data.types[0], intl)}</div>
          <Linkify properties={{ target: '_blank', rel: 'noopener noreferrer' }}>
            <p className="description">{data.description}</p>
          </Linkify>
          <blockquote>
            <p>
              <FormattedHTMLMessage id="Info.Note" />
            </p>
          </blockquote>
        </Card>
      </Container>
      <Dialog TransitionComponent={Transition} onClose={handleClose} open={showModal} fullWidth aria-labelledby="share">
        <DialogContent>
          <Form className="form-inline">
            <div className="form-group">
              <Form.TextArea className="form-control" id="url-text" rows={1} readOnly />
              {/* <textarea className="form-control" id="url-text" rows={1} readOnly /> */}
            </div>
            <Button onClick={copyShareLink}>Copy</Button>
          </Form>
        </DialogContent>
        {/* <div className={classes.paper}></div> */}
      </Dialog>
    </>
  );
};

Info.propTypes = {
  setMode: PropTypes.func,
  backToResults: PropTypes.func,
  id: PropTypes.string,
  intl: PropTypes.any,
};

export default injectIntl(Info);
