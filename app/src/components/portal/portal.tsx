import React from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  id: 'global-event';
}

const Portal: React.SFC<IProps> = (props) =>
  ReactDOM.createPortal(props.children, document.getElementById(props.id) as Element);

export default Portal;
