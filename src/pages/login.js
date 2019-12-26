import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Icon from '../images/icon.png';

//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
    form: {
        textAlign: 'center'
    }
}

class Login extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={Icon} alt='monkey'></img>
                    <Typography variant='h2' className={classes.pageTitle}>
                        Login
                    </Typography>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)