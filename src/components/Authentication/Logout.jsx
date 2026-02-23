import React from 'react'
import { removeItem } from '../../util/StorageUtil';

const Logout = () => {

  removeItem("token");
  window.location = "/";
  return null;
}

export default Logout