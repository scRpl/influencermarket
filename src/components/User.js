import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import EditDetails from "./EditDetails";
import { GET_USER } from "../query";

// MUI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import MuLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import MyButton from "../util/MyButton";
import CameraIcon from "@material-ui/icons/CameraAlt";

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: theme.palette.primary.main
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
});

function User(props) {
  const [image, setImage] = useState([]);
  const { classes } = props;
  const { data, loading, error } = useQuery(GET_USER);
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageUpload");
    fileInput.click();
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return data.isLoggedIn ? (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img
            src={data.user.imageUrl}
            alt="profile"
            className="profile-image"
          ></img>
          <input
            type="file"
            id="imageUpload"
            onChange={e => setImage(e.target.files[0])}
            hidden={true}
          ></input>
          <MyButton
            btnClassName="button"
            onClick={handleEditPicture}
            tip="Edit profile picture"
          >
            <CameraIcon color="primary"></CameraIcon>
          </MyButton>
        </div>
        <hr />
        <div className="profile-details">
          <MuLink
            component={Link}
            to={`/users/${data.user.name}`}
            color="primary"
            variant="h5"
          >
            @{data.user.name}
          </MuLink>
          <hr />
          {data.user.bio && (
            <Typography variant="body2">{data.user.bio}</Typography>
          )}
          <hr />
          {data.user.location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{data.user.location}</span>
              <hr />
            </Fragment>
          )}
          {data.user.website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={data.user.website} target="blank">
                {"  "}
                {data.user.website}
              </a>
              <hr />
            </Fragment>
          )}
          <EditDetails />
        </div>
      </div>
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Typography variant="body2" align="center">
        No profile found, please login again
      </Typography>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/signup"
        >
          Signup
        </Button>
      </div>
    </Paper>
  );
}

User.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(User);
