import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {
  invSep: {
    border: "none",
    margin: 4
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    marginBottom: 20
  },
  commentImage: {
      maxWidth: '100%',
      heigth: 100,
      objectFit: 'cover',
      borderRadius: '50%'
  },
  commentData: {
      marginLeft: 20
  }
};

function Comments(props) {
  const { comments, classes } = props;

  return (
    <Fragment>
      <Grid container>
        {comments.map((comment, index) => {
          return (
            <Fragment key={comment.id}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={comment.writtenBy.imageUrl}
                      alt="comment"
                      className={classes.commentImage}
                    ></img>
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${comment.writtenBy.name}`}
                        color="primary"
                      >
                        {comment.writtenBy.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        2020-20-20
                      </Typography>
                      <hr className={classes.invSep}></hr>
                      <Typography variant="body1">{comment.body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator}></hr>
              )}
            </Fragment>
          );
        })}
      </Grid>
    </Fragment>
  );
}

export default withStyles(styles)(Comments);
