import React from "react";
import { Route, Navigate, outlet } from "react-router-dom";


const ProtectedRoute = ({component: Component, ...rest}) => {
    // const { children, ...rest } = props
    
    
    return (
        <Route { ...rest } render={(props) => {
            if(localStorage.getItem("token")){
                return <Component {...props} />
            } else {
                return  <Navigate to="/login" />;
            }
        }}/>
    )
}



export default ProtectedRoute;