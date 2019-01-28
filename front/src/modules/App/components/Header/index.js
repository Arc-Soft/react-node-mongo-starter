import React from 'react';
import logoAsset from './../../../../assets/images/logo.svg';
import './styles.scss';
export default () => (
  <div className="Header">
    <img src={logoAsset} className="Header__logo" alt="" />
  </div>
);
