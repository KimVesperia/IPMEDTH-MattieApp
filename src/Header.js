import React, { useContext } from "react";
import routes0 from "./Routes0";
import routes1 from "./Routes1";
import { Link } from "react-router-dom";
import { AuthContext } from "./Signin";
import { Redirect } from 'react-router';
import * as firebase from "firebase";
import Button from '@material-ui/core/Button';
import Login from "./Login";
import Register from "./Register";

const Header = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <ul className="nav">
    {isLoggedIn && <li><Link to="/dashboard">Dashboard</Link></li>}
    {isLoggedIn && <li><Link to="/curriculum">Curriculum</Link></li>}
    {isLoggedIn && <li><Link to="/profile">Profiel</Link></li>}
    {isLoggedIn && <li><Link to="/logout">Log Uit</Link></li>}
  </ul>
  )
}


export default Header;
