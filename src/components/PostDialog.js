import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { GET_USER } from "../query";
import { VOTE } from "../mutation";
import Comments from './Comments';
import CommentForm from './CommentForm';

// MUI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MyButton from "../util/MyButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";


const styles = {
  invSep: {
    border: "none",
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
      position: "absolute",
      left: '90%'
  },
  visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      marginBottom: 20
  }
};

function PostDialog(props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const {
    data: { isLoggedIn, user }
  } = useQuery(GET_USER);
  const [vote] = useMutation(VOTE, {
      update(cache, { data: { vote } }) {
          props.updateCacheAfterVote(cache, vote, props.post.id)
      }
  })

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { classes, post } = props;

  const dialogMarkup = loading ? (
    <CircularProgress></CircularProgress>
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img
          src={post.postedBy.imageUrl}
          alt="Profile"
          className={classes.profileImage}
        ></img>
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${post.postedBy.name}`}
        >
          @{post.postedBy.name}
        </Typography>
        <hr className={classes.invSep}></hr>
        <Typography variant="body2" color="textSecondary">
          {post.createdAt}
        </Typography>
        <hr className={classes.invSep}></hr>
        <Typography variant="h5">{post.url}</Typography>
        <hr className={classes.invSep}></hr>
        <Typography variant="body1">{post.description}</Typography>
        <hr className={classes.invSep}></hr>
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
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm id={post.id}></CommentForm>
      <Comments comments={post.comments} />
    </Grid>
  );

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand Post"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary"></UnfoldMore>
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={() => {
            handleClose();
          }}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default withStyles(styles)(PostDialog);
