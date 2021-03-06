import React from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  id: 'global-event' | 'confirm-dialog';
}

const Portal: React.SFC<IProps> = (props) =>
  ReactDOM.createPortal(
    props.children,
    document.getElementById(props.id) as Element || document.createElement('div'), // for testing purposes
  );

export default Portal;
