import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

export default ({ children, ...props }) => (
  <Link className="SidebarLink" {...props}>
    {children}
  </Link>
);
