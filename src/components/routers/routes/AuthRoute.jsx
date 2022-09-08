import React,{useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../../context/Store';

const Authroute = ({children}) => {
    const {state:{userData:{access,isVerified}}} = useContext(Context);
    console.log(isVerified,access,'-=-=-=-===-=-=-=-');
    return !isVerified ? children : <Navigate to='/' />;
};

export default Authroute;