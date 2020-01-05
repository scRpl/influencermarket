import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';
import User from '../components/User';

class Home extends Component {
    render() {
        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <Scream />
                    <Scream />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile</p>
                    <User />
                </Grid>
            </Grid>
        )
    }
}

export default Home
