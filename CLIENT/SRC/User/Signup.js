import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem'; // Import MenuItem
import backgroundImage from '../images/background.jpeg';

import Layout from '../core/Layout';
import { signup } from '../auth';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#ffffff', // White background color
    padding: '20px', // Add padding as desired
    minHeight: 'auto', // Adjust the height automatically
    minWidth: 'auto', // Adjust the width automatically
  },  
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    phoneNumber: '',
    error: '',
    success: false,
  });

  const { name, email, password, gender, phoneNumber, success, error } = values;

  console.log(values)

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, gender, phoneNumber }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          gender: '',
          phoneNumber: '',
          error: '',
          success: true,
        });
      }
    });
  };

  const showError = () => (
    <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className='alert alert-info' style={{ display: success ? '' : 'none' }}>
      New account is created. Please <Link to='/signin'>Sign in</Link>.
    </div>
  );

  const classes = useStyles();

  const signUpForm = () => (
    <Container component='main' maxWidth='xs'>
      {showSuccess()}
      {showError()}
      <CssBaseline />
      <div className={`${classes.paper} ${classes.container}`}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='off'
                onChange={handleChange('name')}
                type='text'
                name='name'
                value={name}
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Full Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='gender'
                label='Gender'
                id='gender'
                select // Specify the select input type
                value={gender}
                onChange={handleChange('gender')}
              >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='phoneNumber'
                label='Phone Number'
                type='tel'
                id='phoneNumber'
                onChange={handleChange('phoneNumber')}
                value={phoneNumber}
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                onChange={handleChange('email')}
                type='email'
                value={email}
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                onChange={handleChange('password')}
                value={password}
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={clickSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/signin' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  return (
    <div className='specificPageBackground'>

    <Layout
      title='Signup page'
      description='Signup to MERN E-commerce App'
      className={'container col-md-8 offset-md-2 ' }
      
    >
      {signUpForm()}
    </Layout>
    </div>
  );
}
