import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USER } from '../query';
import { UPDATE_USER } from '../mutation';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditIcon from '@material-ui/icons/Edit';
import MyButton from '../util/MyButton';

const styles = theme => ({
    theme
})

function EditDetails(props) {
    
    const [bio, setBio] = useState('')
    const [website, setWebsite] = useState('')
    const [location, setLocation] = useState('')
    const [id, setId] = useState('')
    const [open, setOpen] = useState(false)
    
    const { loading: queryLoading, error: queryError, data } = useQuery(GET_USER)
    const [updateUser, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USER)
    const { classes } = props;
    const handleOpen = () => {
        setOpen(true)
        setId(data.user.id)
        setBio(data.user.bio)
        setLocation(data.user.location)
        setWebsite(data.user.website)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Fragment>
            <MyButton btnClassName='button' onClick={handleOpen} tip='Edit profile details'>
                <EditIcon color='primary'></EditIcon>
            </MyButton>
            <Dialog open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='sm'
            >
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you want to make changes to your profile, enter your data below.
                    </DialogContentText>
                        <TextField
                        name='bio'
                        type='text'
                        label='bio'
                        multiline
                        placeholder='A short bio about you'
                        className={classes.textField}
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        fullWidth
                        />
                        <TextField
                        name='location'
                        type='text'
                        label='location'
                        placeholder='Where are you'
                        className={classes.textField}
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        fullWidth
                        />
                        <TextField
                        name='website'
                        type='text'
                        label='website'
                        placeholder='Address of your website'
                        className={classes.textField}
                        value={website}
                        onChange={e => setWebsite(e.target.value)}
                        fullWidth
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        handleClose()
                        updateUser({ variables: { id, bio, website, location } })
                    }} color='primary'>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default withStyles(styles)(EditDetails);