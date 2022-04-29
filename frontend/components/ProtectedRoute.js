import React from "react";
import { Route, useNavigate } from "react-router-dom";


const ProtectedRoute = (props) => {
    const { children, ...rest } = props
    
    return (
        <Route { ...rest } render={() => {
            if(localStorage.getItem("token")){
                return children
            } else {
                <useNavigate to="/"/>
            }
        }}/>
    )
}



export default ProtectedRoute;