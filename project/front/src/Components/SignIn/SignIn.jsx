import React, {useContext, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {useHistory} from "react-router-dom";
import DataContext from '../Context/GetData';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {

    const currentData = useContext(DataContext)
    const [ndata, setNdata] = currentData.currentData;

    const classes = useStyles();
    const history = useHistory();
    const [data, setData] = useState({
        email: '',
        password: '',
    });


    const changeData = (event) => {
        setData({...data, [event.target.name]: event.target.value})
    }

    const callAPI = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:9000/SignIn", data)
            .then(myData => {
                    if (myData.data.message === "Password does not matches!") {
                        alert('Password is wrong');
                    } else if (myData.data.message === 'This email isnt exisit') {
                        alert('Email is wrong');
                    } else {
                        setNdata(myData.data);
                        history.push('profile')
                    }
                }
            )
            .catch(error => alert(error));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5" onClick={callAPI}>
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={data.email}
                        onChange={(event) => changeData(event)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(event) => changeData(event)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => callAPI(e)}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="SignUp" variant="body2">
                                Don't have an account?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}