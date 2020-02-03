import React, { useState } from "react";
import PropTypes from "prop-types";
import Icon from "../images/icon.png";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { AUTH_TOKEN } from "../constants";
import { Link } from "react-router-dom";
import { LOGIN_MUTATION } from "../mutation";

//  MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  form: {
    textAlign: "center"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    margin: "20px"
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "8px"
  }
};

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const { classes } = props;

  const [login, { error }] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      const { token, user } = data.login;
      localStorage.setItem(AUTH_TOKEN, token);
      client.writeData({
        data: {
          user: user,
          isLoggedIn: true
        }
      });
      setLoading(false);
      props.history.push("/");
    }
  });

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={Icon} alt="monkey" className={classes.image}></img>
        <Typography variant="h3" className={classes.pageTitle}>
          Login
        </Typography>
        <form
          noValidate
          onSubmit={event => {
            event.preventDefault();
            login({ variables: { email, password } });
            setLoading(true);
          }}
        >
          <TextField
            id="email"
            name="email"
            type="email"
            label="E-mail"
            className={classes.textField}
            value={email}
            onChange={event => setEmail(event.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
            variant="outlined"
          />
          {error && (
            <Typography variant="body2" className={classes.error}>
              {error.graphQLErrors.map(({ message }, i) => (
                <span key={i}>{message}</span>
              ))}
            </Typography>
          )}
          <br></br>
          {loading && <CircularProgress color="secondary" />}
          <br></br>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Login
          </Button>
          <br />
          <p>
            Don't have an account? Sign up <Link to="/signup">here</Link>
          </p>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
