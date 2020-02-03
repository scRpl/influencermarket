import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import MyButton from "../util/MyButton";
import { IS_LOGGED_IN } from "../query";
import CreatePost from './CreatePost';

//MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from '@material-ui/icons/AccountBox';

function Navbar(props) {
  const client = useApolloClient();
  const {
    data: { isLoggedIn }
  } = useQuery(IS_LOGGED_IN);

  return (
    <AppBar>
      <Toolbar className="nav-container">
        {isLoggedIn ? (
          <Fragment>
            <CreatePost />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon></HomeIcon>
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <Notifications></Notifications>
            </MyButton>

            <MyButton
              tip="Logout"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                client.resetStore();
                props.history.push("/");
              }}
            >
              <LogoutIcon></LogoutIcon>
            </MyButton>
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon></HomeIcon>
              </MyButton>
            </Link>
            <Link to="/login">
              <MyButton tip="Login">
                <AccountBoxIcon></AccountBoxIcon>
              </MyButton>
            </Link>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
