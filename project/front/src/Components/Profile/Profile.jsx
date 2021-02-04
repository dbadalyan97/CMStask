import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '300px',
        background: '#547587',
        color: 'white',
        height: '100vh',
        padding: '0 30px',
    },
    btn: {
        width: '50px',
        height: '50px',
        textAlign: 'left !important',
        marginTop: '100px',
        cursor: "pointer"
    },
    input: {
        width: '80%',
        height: '50px',
        marginTop: '100px',
        color: "white"
    }
}));

function Profile(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AddCircleOutlineIcon className={classes.btn}/>
            <TextField className={classes.input} label="Outlined"/>
        </div>

    )
}

export default Profile


