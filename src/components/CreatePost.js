import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_POST } from "../mutation";
import { FEED_QUERY } from '../query';

// Material-UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MyButton from "../util/MyButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = {
  submitButton: {
      position: "relative",
      float: "rigth",
      marginTop: 20
  },
  progressSpinner: {
      position: 'absolute'
  },
  closeButton: {
      position: 'absolute',
      left: '91%',
      top: '6%'
  }
};

function CreatePost(props) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlTooShort, setUrlTooShort] = useState(false)
  const [descTooShort, setDescTooShort] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { classes } = props;

  const [post] = useMutation(CREATE_POST, {
      update(cache, { data: { post } }) {
        const data = cache.readQuery({ query: FEED_QUERY })
        data.feed.posts.unshift(post)
        cache.writeQuery({
          query: FEED_QUERY,
          data
        })
      },
      onCompleted() {
        setLoading(false)
        setUrl('')
        setDescription('')
    }
    }
      )

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Create a Post">
        <AddIcon color="primary"></AddIcon>
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={() => {
              handleClose();
              setDescTooShort(false);
              setUrlTooShort(false);
          }}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Create a new post</DialogTitle>
        <DialogContent>
          <form onSubmit={e => {
              e.preventDefault();

              if (url.length < 1) {
                setUrlTooShort(true)
                return
              }

              if (description.length < 1) {
                  setDescTooShort(true)
                  return
              }

              setLoading(true)
              post({ variables: { url, description } })
              setOpen(false)
          }}>
            <TextField
              name="title"
              type="text"
              label="Title"
              multiline
              placeholder="Post Title"
              className={classes.textField}
              onChange={e => setUrl(e.target.value)}
              fullWidth
              value={url}
              helperText={urlTooShort ? "Title too short" : null}
            ></TextField>
            <TextField
              name="body"
              type="text"
              label="Body"
              multiline
              placeholder="Post Body"
              className={classes.textField}
              onChange={e => setDescription(e.target.value)}
              fullWidth
              value={description}
              helperText={descTooShort ? "Post too short" : null}
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                ></CircularProgress>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default withStyles(styles)(CreatePost);
