import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function ContainedButtons(props) {
    const classes = useStyles();
    const history = useHistory();


    useEffect(() => {
        if (localStorage.getItem("logIn")) {
            history.push('/profile');
        }
    }, [])

    return (
        <div className={classes.root}>
            <Link href={props.name}><Button variant="contained">{props.name}</Button></Link>
        </div>
    )
}

export default ContainedButtons