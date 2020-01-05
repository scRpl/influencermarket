import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Icon from '../images/icon.png';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'

//  MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        color: '#ffffff',
        margin: '10px auto 10px auto'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        margin: '20px'
    }
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
            error: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({
            loading: true
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
      }
    
    confirm = async data => {
        const { token } = this.state.login ? data.login : data.signup
        this.saveUserData(token)
        this.props.history.push(`/`)
      }

    render() {
        const { classes } = this.props;
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={Icon} alt='monkey' className={classes.image}></img>
                    <Typography variant='h3' className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id='email' 
                            name='email' 
                            type='email' 
                            label='E-mail' 
                            className={classes.textField}
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            fullWidth 
                            variant='outlined' 
                            />
                        <TextField 
                            id='password' 
                            name='password' 
                            type='password' 
                            label='Password' 
                            className={classes.textField}
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            fullWidth 
                            variant='outlined' />
                        <Mutation 
                            mutation={LOGIN_MUTATION} 
                            variables={{ email, password, name }}
                            onCompleted={data => this.confirm(data)}
                            >
                            {mutation => (
                                <Button 
                                variant='contained' 
                                color="primary" 
                                className={classes.button}
                                >
                                Login
                            </Button>
                            )}
                        </Mutation>
                    </form>
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