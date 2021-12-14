/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRestAction } from '@app/store/reducers/restsDucks';
import { url as urlconf } from '../config';

const fileTypes = ['only csv files', 'vnd.ms-excel'];

function Csv() {
    const dispatch = useDispatch();
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
    const [restName, setRestName] = useState(null);
    const [restDate, setRestDate] = useState(null);
    const [restTemp, setRestTemp] = useState(null);
    const [restWeat, setRestWeat] = useState(null);
    const [restCash, setRestCash] = useState(null);
    const [restInter, setRestInter] = useState(null);
    const [restOnb, setRestOnb] = useState(null);
    const [restTerm, setRestTerm] = useState(null);
    const [restTruck, setRestTruck] = useState(null);
    const [restTrans, setRestTrans] = useState(null);
    const [restCCP, setRestCCP] = useState(null);

    const rest = useSelector((store) => store.rest.array);
    const urlFile = `${urlconf}csvToJson`;
    // __________llamar restaurantes
    React.useEffect(async () => {
        await dispatch(getRestAction());
     
    }, []);

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
        const respuesta = await axios.post(`${urlFile}/file`, f);
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

    const submit = async (e) => {
        e.preventDefault();
        if(restName==null || restName==='empty' || restDate==null || restTemp==null || 
            restWeat==null || restCash==null || restInter==null || 
            restOnb==null || restTerm==null || restTruck==null || 
            restTrans==null || restCCP==null){
            alert('Please fill all the fields');
            return;
        }

    
        const data=[{
            restaurantId: restName,
            date:restDate,
            weatherTemp:restTemp,
            weatherW:restWeat,
            cash:restCash,
            candidatesInt:restInter,
            candidatesOnb:restOnb,
            candidatesTerm:restTerm,
            truck:restTruck,
            transfer:restTrans,
            storeCreditCardPursh:restCCP
        }];
        const respuesta = await axios.post(`${urlFile}/form`, {data});
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
        <div className="">
            <div className="row align-items-start">
                <div className="col-8">
                    <form onSubmit={(e) => submit(e)}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="Restaurant">Restaurant</label>
                                <select
                                    onChange={(e) =>
                                        setRestName(e.target.value)
                                    }
                                    className="form-control"
                                    value={restName}
                                    required
                                >
                                    <option value="empty">Seleccione una opcion</option>
                                    {rest.map((restaurant) => (
                                        <option
                                            value={restaurant.id}
                                            key={restaurant.id}
                                        >
                                            {restaurant.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input
                                    onChange={(e) =>
                                        setRestDate(e.target.value)
                                    }
                                    type="date"
                                    className="form-control"
                                    value={restDate}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="WeatherTemp">Temperature</label>
                                <input
                                    onChange={(e) =>
                                        setRestTemp(e.target.value)
                                    }
                                    type="text"
                                    className="form-control"
                                    placeholder="Temperature"
                                    value={restTemp}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Weather">Weather</label>
                                <input
                                    onChange={(e) =>
                                        setRestWeat(e.target.value)
                                    }
                                    type="text"
                                    className="form-control"
                                    placeholder="Weather"
                                    value={restWeat}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Cash">Cash</label>
                                <input
                                    onChange={(e) =>
                                        setRestCash(e.target.value)
                                    }
                                    type="text"
                                    className="form-control"
                                    placeholder="Cash"
                                    value={restCash}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Candidates Interviewed">
                                    Candidates Interview
                                </label>
                                <input
                                    onChange={(e) =>
                                        setRestInter(e.target.value)
                                    }
                                    type="text"
                                    className="form-control"
                                    placeholder="Candidates Interviewed"
                                    value={restInter}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Candidates Onboard">
                                    Candidates Onboard
                                </label>
                                <input
                                    onChange={(e) => setRestOnb(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    placeholder="Candidates Onboard"
                                    value={restOnb}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Candidates Terminated">
                                    Candidates Terminated
                                </label>
                                <input
                                    onChange={(e) =>
                                        setRestTerm(e.target.value)
                                    }
                                    type="text"
                                    className="form-control"
                                    placeholder="Candidates Terminated"
                                    value={restTerm}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Truck">Truck</label>
                                <input
                                    onChange={(e) =>
                                        setRestTruck(e.target.value)
                                    }
                                    type="text"
                                    className="form-control"
                                    placeholder="Truck"
                                    value={restTruck}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Transfer">Transfer</label>
                                <input
                                    onChange={(e) =>
                                        setRestTrans(e.target.value)
                                    }
                                    type="text"
                                    className="form-control"
                                    placeholder="Transfer"
                                    value={restTrans}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Store Credit Card Purchase">
                                    Store Credit Card Purchase
                                </label>
                                <input
                                    onChange={(e) => setRestCCP(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    placeholder="Store Credit Card Purchase"
                                    value={restCCP}
                                    required
                                />
                            </div>
                            <input
                                type="submit"
                                className="btn btn-danger"
                                value="Submit Form"
                            />
                        </div>
                        {/* <!-- /.card-body --> */}
                    </form>
                </div>
                <div className="col-4 mt-5">
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
                        value="Submit File"
                        onClick={(e) => altaCsv(e.target.file)}
                    />
                    <a href="../archivo.csv" className="btn btn-danger m-3">
                        Download Form File
                    </a>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Csv;
