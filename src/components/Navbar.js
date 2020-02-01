import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import MyButton from '../util/MyButton';
import { IS_LOGGED_IN } from '../query';

//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications';
import LogoutIcon from '@material-ui/icons/ExitToApp';

const authToken = localStorage.getItem(AUTH_TOKEN)

function Navbar(props) {
    
    const client = useApolloClient()
    const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN)

    return (
        <AppBar>
            <Toolbar className='nav-container'>
                {isLoggedIn ? (
                    <Fragment>
                    <MyButton tip='Create a post'>
                        <AddIcon></AddIcon>
                    </MyButton>
                    <Link to='/'>
                    <MyButton tip='Home'>
                        <HomeIcon></HomeIcon>
                    </MyButton>
                    </Link>
                    <MyButton tip='Notifications'>
                        <Notifications></Notifications>
                    </MyButton>
                    
                    <MyButton tip='Logout' onClick={() => {
                        localStorage.removeItem(AUTH_TOKEN)
                        client.resetStore()
                        props.history.push('/')
                    }} >
                        <LogoutIcon></LogoutIcon>
                    </MyButton>
                    </Fragment>
                ) : (
                <Fragment>
                <Button color='inherit' component={Link} to='/'>Home</Button>
                <Button color='inherit' component={Link} to='/login'>Login</Button>
                <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                </Fragment>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
