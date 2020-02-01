import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { IS_LOGGED_IN } from '../query';

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import MyButton from '../util/MyButton';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 150
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

function Scream(props) {
    const { classes, post } = props;
    const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN)

    return (
        <Card className={classes.card}>
            <CardMedia 
            image={post.postedBy.imageUrl}
            title="Profile Image"
            className={classes.image} />
            <CardContent className={classes.content}>
                <Typography variant="h5" color='primary' component={Link} to={`/users/${post.postedBy.name}`}>{post.postedBy.name}</Typography>
                <Typography variant="body2" color="textSecondary">2019-12-12</Typography>
                <Typography variant="body1">{post.description}</Typography>
                {!isLoggedIn ? (
                    <MyButton tip='Like'>
                        <Link to='/login'>
                            <FavoriteBorder color='primary'></FavoriteBorder>
                        </Link>
                    </MyButton>
                ) : (
                    <MyButton tip='Like'>
                        <FavoriteIcon color='primary' />
                    </MyButton>
                )}
                <span>999 Likes</span>
                <MyButton tip='Comments'>
                    <ChatIcon color='primary'></ChatIcon>
                </MyButton>
                <span>999 Comments</span>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(Scream)
