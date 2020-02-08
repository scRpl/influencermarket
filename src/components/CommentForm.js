import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { CREATE_COMMENT } from "../mutation";
import { GET_USER, FEED_QUERY } from "../query";
import { useMutation, useQuery } from "@apollo/react-hooks";

// MUI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const styles = {};

function CommentForm(props) {
  const [body, setBody] = useState("");

  const {
    data: { isLoggedIn }
  } = useQuery(GET_USER);
  
  const [createComment] = useMutation(CREATE_COMMENT, {
    update(cache, { data: { comment } }) {
      const data = cache.readQuery({ query: FEED_QUERY });
      const commentPost = data.feed.posts.find(
        post => post.id === id
      );
      commentPost.comments.unshift(comment);
      cache.writeQuery({
        query: FEED_QUERY,
        data
      });
    }
  });

  const { classes, id } = props;

  return isLoggedIn ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form
        onSubmit={e => {
          e.preventDefault();
          createComment({ variables: { postId: id, body } });
        }}
      >
        <TextField
          name="body"
          type="body"
          label="Comment"
          value={body}
          onChange={e => setBody(e.target.value)}
          fullWidth
          className={classes.textField}
        >
        </TextField>
        <Button type="submit" variant="contained" className={classes.button}>
            Submit
          </Button>
      </form>
      <hr className={classes.visibleSeparator}></hr>
    </Grid>
  ) : null;
}

export default withStyles(styles)(CommentForm);
