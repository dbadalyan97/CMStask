import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {useHistory} from "react-router-dom";
import axios from "axios";
import DataProvider from '../Context/GetData'

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
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25vh',
    },
    obj: {
        display: "flex",
        flexDirection: "column",
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
        backgroundColor: "#3c3434",
        width: "100%",
        fontSize: "36px",
        color: "white"
    },
    addBtn: {
        backgroundColor: '#4a4343',
        color: 'white',
        width: '150px',
        fontSize: "30px",
        padding: '16px 30px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        marginTop: "170px",
        marginLeft: '-250px',
    },

    addTagBtn: {
        backgroundColor: '#797171',
        color: 'black',
        width: '127px',
        fontSize: '13px',
        padding: '13px 20px',
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
        justifyContent: "space-between",
    },
    createObj: {
        margin: "10px"
    }
}));

function Profile() {
    const [userObj, setUserObj] = useState({});

    const [fieldsObj, setFieldsObj] = useState({});

    const [open, setOpen] = useState(false);

    const [keyObj, setKeyObj] = useState('');
    const [valueObj, setValueObj] = useState('');
    const [typeObj, setTypeObj] = useState('Object');
    const [nameObj, setNameObj] = useState('');
    const [tagsObj, setTagsObj] = useState('');
    const [nestedKey, setNestedKey] = useState('');
    const [nestedValue, setNestedValue] = useState('');

    const history = useHistory();
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logOut = () => {
        localStorage.removeItem('logIn');
        history.push('');
    }

    const changeObj = (event) => {
        if (event.target.name === 'key') setKeyObj(event.target.value);
        else if (event.target.name === 'value') setValueObj(event.target.value);
        else if (event.target.name === 'type') {
            setTypeObj(event.target.value);
            setKeyObj('');
            setValueObj('');
        } else if (event.target.name === 'name') setNameObj(event.target.value);
        else if (event.target.name === 'tagsObj') setTagsObj(event.target.value);
        else if (event.target.name === 'nestedKey') setNestedKey(event.target.value)
        else if (event.target.name === 'nestedValue') setNestedValue(event.target.value)
    }

    const addFields = () => {
        if (typeObj === "String" || typeObj === "Text" || typeObj === "File") {
            setFieldsObj({...fieldsObj, [keyObj]: valueObj})
        } else if (typeObj === "Array") {
            setFieldsObj({...fieldsObj, [keyObj]: valueObj.split(",")})
        } else if (typeObj === "Object") {
            setFieldsObj({...fieldsObj, [keyObj]: {[nestedKey]: nestedValue}})
        }
    }


    const addObj = (e) => {
        setUserObj({...userObj, [nameObj]: {...fieldsObj, tags: tagsObj.split(",")}});
        passDataAPI(e);
    }

    const passDataAPI = (e) => {
        e.preventDefault()
        const data = {[nameObj]: {...fieldsObj, tags: tagsObj.split(",")}}
        axios.post("http://localhost:9000/profile", JSON.stringify(data))
            .then(res => null)
            .catch(err => alert(err))
    }

    const getData = useContext(DataProvider)
    const dataMap = getData.current[0];
    console.log(dataMap)
    return ( 
        <>
            <header>
                <div className={classes.logOutBlock}>
                    <button className={classes.logOut} onClick={logOut}>Log Out</button>
                </div>
            </header>
            <div className={classes.root}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <TextField className={classes.input} label="Filter"/>
                    <AddCircleOutlineIcon className={classes.btn} onClick={handleOpen}/>
                </div>
                <div>
                    {dataMap.map((val) => <a href="">{val}</a>)}
                </div>
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
                    }}>
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <TextField
                                id="standard-full-width"
                                label="Name"
                                style={{margin: 8}}
                                placeholder="Name"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="name"
                                value={nameObj}
                                onChange={changeObj}
                            />
                            <div className={classes.objBlock}>
                                <div className={classes.obj}>
                                    <select className={classes.chooseType} name="type"
                                            onChange={changeObj}>
                                        <option value="Object">Object</option>
                                        <option value="String">String</option>
                                        <option value="File">File</option>
                                        <option value="Text">Text</option>
                                        <option value="Array">Array</option>
                                    </select>
                                    <TextField className={classes.createObj} name="key" label="Key"
                                               value={keyObj}
                                               onChange={changeObj}/>
                                    {typeObj === 'File' ? <input className={classes.createObj} type="file"/>
                                        : typeObj === 'Text' ?
                                            <textarea onChange={changeObj} className={classes.createObj}/>
                                            : typeObj === 'String' ?
                                                <TextField className={classes.createObj} name="value" label="Value"
                                                           value={valueObj}
                                                           onChange={changeObj}/>
                                                : typeObj === 'Object' ?
                                                    <div className={classes.obj}>
                                                        <TextField className={classes.createObj} name="nestedKey"
                                                                   label="NestedKey"
                                                                   value={nestedKey}
                                                                   onChange={changeObj}/>
                                                        <TextField className={classes.createObj} name="nestedValue"
                                                                   label="NestedValue"
                                                                   value={nestedValue}
                                                                   onChange={changeObj}/>

                                                    </div>
                                                    : typeObj === 'Array' ?
                                                        <TextField name="value" label="Value" value={valueObj}
                                                                   onChange={changeObj} className={classes.createObj}/>
                                                        : null}
                                </div>
                                <div>
                                    <AddCircleOutlineIcon className={classes.modalBtn} onClick={addFields}/>
                                </div>
                            </div>
                            <div style={{display: "flex"}}>
                                <TextField className={classes.input} name="tagsObj" placeholder="" label="Tags"
                                           value={tagsObj}
                                           onChange={changeObj}/>
                                <button className={classes.addBtn} onClick={e => addObj(e)}>ADD</button>
                            </div>
                        </div>
                    </Fade>
                </Modal>

            </div>

        </>
    )
}

export default Profile