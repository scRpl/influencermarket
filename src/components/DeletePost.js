import React, { Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useMutation } from "@apollo/react-hooks";
import MyButton from "../util/MyButton";
import { DELETE_POST } from "../mutation";
import { FEED_QUERY } from "../query";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const styles = {};

function DeletePost(props) {
const [open, setOpen] = useState(false)
const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { classes } = props;

  const [deletePost] = useMutation(DELETE_POST, {
    update(cache, { data: { deletePost } }) {
        const data = cache.readQuery({ query: FEED_QUERY })
        const deletedPost = data.feed.posts.findIndex(post => post.id === deletePost.id);
        data.feed.posts.splice(deletedPost, 1)
        cache.writeQuery({
          query: FEED_QUERY,
          data
        })
      }
  })

    return (
    <Fragment>
      <MyButton
        tip="Delete Post"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary"></DeleteOutline>
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
          <DialogTitle>
              Are you sure you want to delete this post?
          </DialogTitle>
          <DialogActions>
              <Button onClick={handleClose} color='primary'>
                  Cancel
              </Button>
              <Button onClick={() => {
                  deletePost({ variables: { id: props.id } })
                  handleClose();
              }} color='secondary'>
                  Delete
              </Button>
          </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default withStyles(styles)(DeletePost)