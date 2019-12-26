import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';

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
                </Grid>
            </Grid>
        )
    }
}

export default Home
