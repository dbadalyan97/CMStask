import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import {v4 as uuid_v4} from "uuid";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import axios from "axios";
import {useHistory} from "react-router-dom";
// import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '300px',
        background: '#547587',
        color: 'white',
        height: '94vh',
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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '200px',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '700px',
        height: '600px'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25vh',
    },
    obj: {
        display: "flex",
        flexDirection: "row",
        width: '90%',
        margin: '6px',
        justifyContent: 'space-between',
    },
    modalBtn: {
        marginTop: '15px',
        width: "40px",
        height: "40px",
        cursor: 'pointer'
    },
    chooseType: {
        border: 'none',

    },
    addBtn: {
        backgroundColor: '#797171',
        color: 'black',
        width: '100px',
        fontSize: '16px',
        padding: '16px 30px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        marginTop: "170px",
        marginLeft: '-250px'
    },
    header: {
        width: '100%',
    },
    logOutBlock: {
        backgroundColor: "#547587",
        width: '100%',
        textAlign: "right",
    },
    logOut: {
        border: "none",
        textDecoration: "none",
        outline: 'none',
        cursor: "pointer",
        backgroundColor: "#547587",
        color: "white",
        fontWeight: 'bold',
        textAlign: "right",
        marginRight: '50px',
        fontSize: '35px',
        "&:hover": {
            backgroundColor: '#576972'
        }
    },
    objBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between"
    }
}));

function Profile() {
    const [open, setOpen] = useState(false);
    const [countObj, setCountObj] = useState([]);
    const [keyObj, setKeyObj] = useState('');
    const [valueObj, setValueObj] = useState('');
    const [typeObj, setTypeObj] = useState('');

    const history = useHistory();
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addObj = () => {
        setCountObj([...countObj, {name: []}]);
    }

    const logOut = () => {
        localStorage.removeItem('logIn');
        history.push('');
    }

    const changeObj = (event) => {
        // console.log(event.target.name);
        if (event.target.name === 'Key' || event.target.name === 'name') setKeyObj(event.target.value);
        else if (event.target.name === 'Value') setValueObj(event.target.value);
        else if (event.target.name === 'Type') setTypeObj(event.target.value);
    }

    return (
        <>
            <header>
                <div className={classes.logOutBlock}>
                    <button className={classes.logOut} onClick={logOut}>Log Out</button>
                </div>
            </header>
            <div className={classes.root}>

                <AddCircleOutlineIcon className={classes.btn} onClick={handleOpen}/>
                <TextField className={classes.input} label="Filter"/>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <TextField
                                id="standard-full-width"
                                label="Label"
                                style={{margin: 8}}
                                placeholder="Name"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="name"
                                value={keyObj}
                                onChange={changeObj}
                            />
                            <div className={classes.objBlock}>
                                <div className={classes.obj}>
                                    <TextField name="Key" value={keyObj} onChange={changeObj}/>
                                    {typeObj === 'Text' ? <TextField name="Value" value={valueObj}
                                                                    onChange={changeObj}/> :
                                        <input type="file"/>}
                                    <select className={classes.chooseType} name="type" onChange={changeObj}>
                                        <option value="String">String</option>
                                        <option value="File">File</option>
                                        <option value="Text">Text</option>
                                    </select>
                                </div>
                                <div>
                                    <AddCircleOutlineIcon className={classes.modalBtn} onClick={addObj}/>
                                </div>
                            </div>
                            <TextField className={classes.input} label="Tag"/>
                            <button className={classes.addBtn}>ADD</button>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default Profile


