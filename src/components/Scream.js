import React, { useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USER } from "../query";
import { VOTE } from "../mutation";
import { timeDifferenceForDate } from "../util/utils";
import DeletePost from './DeletePost';

//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import MyButton from "../util/MyButton";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 150
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

function Scream(props) {
  const { classes, post } = props;
  const {
    data: { isLoggedIn, user }
  } = useQuery(GET_USER);
  const [vote] = useMutation(VOTE, {
      update(cache, { data: { vote } }) {
          props.updateCacheAfterVote(cache, vote, props.post.id)
      }
  })

  const deleteButton = isLoggedIn && post.postedBy.id === user.id ? (
      <DeletePost id={post.id} />
  ) : null

  return (
    <Card className={classes.card}>
      <CardMedia
        image={post.postedBy.imageUrl}
        title="Profile Image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography variant="h5" color="primary">
          {post.url}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {timeDifferenceForDate(post.createdAt)}
        </Typography>
        <Typography variant="body1">{post.description}</Typography>
        <Typography variant="subtitle2">by {post.postedBy.name}</Typography>
        {!isLoggedIn ? (
          <MyButton tip="Like">
            <Link to="/login">
              <FavoriteBorder color="primary"></FavoriteBorder>
            </Link>
          </MyButton>
        ) : (
          <MyButton
            tip="Like"
            onClick={() => {
              vote({ variables: { postId: post.id } });
            }}
          >
            <FavoriteIcon color="primary" />
          </MyButton>
        )}
        <span>{post.votes.length} Likes</span>
        <MyButton tip="Comments">
          <ChatIcon color="primary"></ChatIcon>
        </MyButton>
        <span>{post.comments.length} Comments</span>
        {deleteButton}
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Scream);
