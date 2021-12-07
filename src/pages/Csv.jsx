import React, {useState} from 'react';
import {FileUploader} from 'react-drag-drop-files';
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import ReactLoading from 'react-loading';
import {ToastContainer, toast} from 'react-toastify';
import {url as urlconf} from '../config';
import 'react-toastify/dist/ReactToastify.css';

const fileTypes = ['only csv files', 'vnd.ms-excel'];

function Csv() {
    const notify = () =>
        toast('Downloaded!!!!, Please press "Search Button" again', {
            theme: 'colored',
            type: 'success',
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });

    const [file, setFile] = useState(null);
    const [validacion, setValidacion] = useState(false);
    const [cargando, setCargando] = React.useState(false);
    const url = `${urlconf}csvToJson`;

    const handleChange = (_file) => {
        setFile(_file);
        setValidacion(true);
    };
    const datePopulate = async (recibeDates) => {
        console.log(recibeDates);
        try {
            const respuesta = await axios.post(
                `${urlconf}datepopulate`,
                recibeDates
            );
            console.log(respuesta);
            notify();
        } catch (err) {
            console.log('todo salio mal');
        }
        setCargando(false);
    };
    const altaCsv = async () => {
        const f = new FormData();
        f.append('archivo', file);
        const respuesta = await axios.post(url, f);
        console.log(respuesta);
        if (respuesta.data.message === 'ok') {
            alert('Archivo cargado correctamente');
        } else {
            const numberDates = respuesta.data.dateList.length;
            confirmAlert({
                title: `${numberDates} dates are missing`,
                message: `Do you want to download them? This may take about ${numberDates} minutes, please be patient`,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            setCargando(true);
                            datePopulate(respuesta.data.dateList);
                        }
                    },
                    {
                        label: 'No'
                    }
                ]
            });
        }
    };

    return (
        <>
            <ReactLoading
                style={{
                    display: cargando ? 'block' : 'none',
                    position: 'absolute',
                    zIndex: '9999',
                    top: '30%',
                    left: '50%',
                    height: '150px',
                    width: '150px',
                    color: '#D11F1F'
                }}
                color="#D11F1F"
                width="300px"
                type="spinningBubbles"
                height="100px"
            />
            <FileUploader
                handleChange={handleChange}
                name="archivo"
                types={fileTypes}
            />
            {validacion ? <span>{file.name}</span> : <span> </span>}

            <input
                type="submit"
                className="btn btn-danger"
                value="Submit"
                onClick={(e) => altaCsv(e.target.file)}
            />
            <a href="../archivo.csv" className="btn btn-danger m-3">
                Download Form File
            </a>
            <ToastContainer />
        </>
    );
}

export default Csv;
