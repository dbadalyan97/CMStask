import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';


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
        marginLeft: '200px'
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
        width: '25ch',
    },
    key: {
        width: '40%',
        left: '2%'
    },
    value: {
        width: '40%',
        left: '5%'
    }

}));

function Profile() {


    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AddCircleOutlineIcon className={classes.btn} onClick={handleOpen}/>
            <TextField className={classes.input} label="Outlined"/>
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
                        <TextField id="standard-basic" label="Key" className={classes.key}/>
                        <TextField id="standard-basic" label="Value" className={classes.value}/>
                        {/*https://material-ui.com/components/menus/#selected-menus*/}
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Profile


