import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

export const AuthLink = ({ to, children, textBefore }) => (
  <div className="AuthLink">
    {textBefore}{' '}
    <Link to={to} className="AuthLink__link">
      {children}
    </Link>
  </div>
);

export default AuthLink;
