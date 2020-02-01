import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Icon from '../images/icon.png';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { AUTH_TOKEN } from '../constants'
import { Link } from 'react-router-dom'
import { SIGNUP_MUTATION } from '../mutation';

//  MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
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
    },
    error: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: '8px'
    }
}

function Signup(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [bio, setBio] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [website, setWebsite] = useState('')
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false)
    const client = useApolloClient()
    const { classes } = props;

    const [signup, { data, error }] = useMutation(SIGNUP_MUTATION,
    { onCompleted(data) {
        const { token, user } = data.signup
        localStorage.setItem(AUTH_TOKEN, token)
        client.writeData({ data: { 
            user: user,
            isLoggedIn: true
        } })
        setLoading(false)
        props.history.push('/')
    } }
    );

    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <img src={Icon} alt='monkey' className={classes.image}></img>
                <Typography variant='h3' className={classes.pageTitle}>
                    Signup
                </Typography>
                <form noValidate onSubmit={event => {
                    event.preventDefault();
                    signup({ variables: { email, password, confirmedPassword, name, bio, website, location, imageUrl } })
                    setLoading(true)
                }}>
                    <TextField 
                        id='name' 
                        name='name' 
                        type='name' 
                        label='Name' 
                        className={classes.textField}
                        value={name} 
                        onChange={event => setName(event.target.value)} 
                        fullWidth 
                        variant='outlined' 
                        />
                    <TextField 
                        id='email' 
                        name='email' 
                        type='email' 
                        label='E-mail' 
                        className={classes.textField}
                        value={email} 
                        onChange={event => setEmail(event.target.value)} 
                        fullWidth 
                        variant='outlined' 
                        />
                    <TextField 
                        id='password' 
                        name='password' 
                        type='password' 
                        label='Password' 
                        className={classes.textField}
                        value={password} 
                        onChange={event => setPassword(event.target.value)} 
                        fullWidth 
                        variant='outlined' />
                    <TextField 
                        id='confirmedPassword' 
                        name='confirmedPassword' 
                        type='password' 
                        label='Confirm Password' 
                        className={classes.textField}
                        value={confirmedPassword} 
                        onChange={event => setConfirmedPassword(event.target.value)} 
                        fullWidth 
                        variant='outlined' />
                    <TextField 
                        id='bio' 
                        name='bio' 
                        type='bio' 
                        label='Your bio' 
                        className={classes.textField}
                        value={bio} 
                        onChange={event => setBio(event.target.value)} 
                        fullWidth 
                        variant='outlined' />
                    <TextField 
                        id='website' 
                        name='website' 
                        type='website' 
                        label='Website address' 
                        className={classes.textField}
                        value={website} 
                        onChange={event => setWebsite(event.target.value)} 
                        fullWidth 
                        variant='outlined' />
                    <TextField 
                        id='location' 
                        name='location' 
                        type='location' 
                        label='Location' 
                        className={classes.textField}
                        value={location} 
                        onChange={event => setLocation(event.target.value)} 
                        fullWidth 
                        variant='outlined' />
                        <TextField 
                        id='imageUrl' 
                        name='imageUrl' 
                        type='imageUrl' 
                        label='Image URL' 
                        className={classes.textField}
                        value={imageUrl} 
                        onChange={event => setImageUrl(event.target.value)} 
                        fullWidth 
                        variant='outlined' />
                        {error && (
                            <Typography variant="body2" className={classes.error}>
                                {error.graphQLErrors.map(({ message }, i) => (
                                    <span key={i}>{message}</span>
                                )
                                
                                )}
                            </Typography>
                        )}  
                        <br></br>
                        {loading && (
                                <CircularProgress color='secondary' />
                            )}
                            <br></br>
                        <Button 
                            variant='contained' 
                            color="primary" 
                            className={classes.button}
                            type="submit"
                            >
                            Signup
                        </Button>
                        <br />
                        <p>
                            Already have an account? Login <Link to='/login'>here</Link>
                        </p>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)