import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        width: 150
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Scream extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia 
                image={'https://images.generated.photos/v202f4kmQbdoAFgD0ZPpxFrcRsln4CzSKTrcjNO0-sI/rs:fit:1024:1024/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zLzA5/OTkzNjMuanBn.jpg'}
                title="Profile Image"
                className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" color='primary' component={Link} to={`/users/JohnnyCage`}>Johnny Cage</Typography>
                    <Typography variant="body2" color="textSecondary">2019-12-12</Typography>
                    <Typography variant="body1">Hello World!</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Scream)
