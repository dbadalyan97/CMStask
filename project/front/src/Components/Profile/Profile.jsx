import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import {v4 as uuid_v4} from "uuid";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


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
        width: "40px",
        height: "70px",
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
    }
}));

function Profile(props) {
    const [open, setOpen] = useState(false);
    const [countObj, setCountObj] = useState([{}]);

    const [name, setName] = useState([]);
    const [key, setKey] = useState();
    const [value, setValue] = useState()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addObj = () => {
        setCountObj([...countObj, {}])
    }

    const classes = useStyles();

    const sendToBack = () => {

    }

    //
    // const getValue = (event) => {
    //     setType(event.target.value);
    // }
    return (
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
                        />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between"
                        }}>
                            <div style={{
                                height: '300px',
                                overflow: 'auto',
                                width: '90%'
                            }}>
                                {countObj.map(() => (
                                    <div className={classes.obj} key={uuid_v4()}>
                                        <TextField id="standard-basic" label="Key"/>
                                        <TextField id="standard-basic" label="Value"/>
                                        <select className={classes.chooseType}>
                                            <option value="String">String</option>
                                            <option value="File">File</option>
                                            <option value="Text">Text</option>
                                        </select>
                                    </div>
                                ))}
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
    )
}

export default Profile


