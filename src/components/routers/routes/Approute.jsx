import React,{useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../../context/Store';
// import { Context } from '../../Context/Store';
// import { Context } from '../../context/store';

const Approute = ({children}) => {
    const {state:{userData:{isVerified}}} = useContext(Context);
    return isVerified ? children : <Navigate to='/auth' />;
};

export default Approute;