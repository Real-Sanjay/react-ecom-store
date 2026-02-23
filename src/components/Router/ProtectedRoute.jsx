import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getItem } from '../../util/StorageUtil';

const ProtectedRoute = () => {
    const location = useLocation();

  return (
    getItem("token") ? <Outlet/> : <Navigate to={"/login"} state={{from: location.pathname}} replace/>
  )
}

export default ProtectedRoute