/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {FileUploader} from 'react-drag-drop-files';
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import ReactLoading from 'react-loading';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from 'react-redux';
import {getRestAction} from '@app/store/reducers/restsDucks';
import {url as urlconf} from '../config';
import '../styles/csv.scss';

const fileTypes = ['only csv files', 'vnd.ms-excel'];

function Csv() {
    const dispatch = useDispatch();
    const notify = () =>
        toast('Uploaded success!!!!', {
            theme: 'colored',
            type: 'success',
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    const notify2 = () =>
        toast('Uploaded success!!!!', {
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
    const [restTruck, setRestTruck] = useState(null);
    const [restTrans, setRestTrans] = useState(null);
    const [restCCP, setRestCCP] = useState(null);
    const [qPromo, setQPromo] = useState(null);
    const [tips, setTips] = useState(null);
    const [transfer, setTransfer] = useState('+');

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
                recibeDates,
                {
                    headers: {
                        authorization: `bearerHeader: ${localStorage.getItem(
                            'token'
                        )}`
                    }
                }
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
        const respuesta = await axios.post(`${urlFile}/file`, f, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        console.log(respuesta);
        if (respuesta.data.message === 'ok') {
            // alert('Archivo cargado correctamente');
            notify2();
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
        if (
            restName == null ||
            restName === 'empty' ||
            restDate == null ||
            restTemp == null ||
            restWeat == null ||
            restCash == null ||
            restTruck == null ||
            restTrans == null ||
            restCCP == null ||
            qPromo == null ||
            tips == null
        ) {
            alert('Please fill all the fields');
            return;
        }

        const data = [
            {
                restaurantId: restName,
                date: restDate,
                weatherTemp: restTemp,
                weatherW: restWeat,
                cash: restCash,
                truck: restTruck,
                transfer: restTrans,
                storeCreditCardPursh: restCCP,
                quarterlyProm1: qPromo,
                Dep1: tips,
                transferType: transfer
            }
        ];

        const respuesta = await axios.post(
            `${urlFile}/form`,
            {data},
            {
                headers: {
                    authorization: `bearerHeader: ${localStorage.getItem(
                        'token'
                    )}`
                }
            }
        );
        console.log(respuesta);
        if (respuesta.data.message === 'ok') {
            notify();
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
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link btn-danger font-weight-bold text-uppercase active"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                    >
                        Form
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link btn-danger font-weight-bold text-uppercase"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                    >
                        Document Csv
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                >
                    <form onSubmit={(e) => submit(e)} className="wraper">
                        <div className="ownform">
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
                                    <option value="empty">
                                        Select a option
                                    </option>
                                    {rest.map((restaurant) => (
                                        <option
                                            value={restaurant.api}
                                            key={restaurant.id}
                                        >
                                            {restaurant.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="ownform">
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
                        </div>

                        <div className="ownform">
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
                        </div>
                        <div className="ownform">
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
                        </div>
                        <div className="ownform">
                            <div className="form-group">
                                <label htmlFor="Cash">Cash +/-</label>
                                <input
                                    onChange={(e) =>
                                        setRestCash(e.target.value)
                                    }
                                    type="number"
                                    className="form-control"
                                    placeholder="Cash +/-"
                                    value={restCash}
                                    required
                                />
                            </div>
                        </div>
                        <div className="ownform">
                            <div className="form-group">
                                <label htmlFor="Truck">Truck</label>
                                <input
                                    onChange={(e) =>
                                        setRestTruck(e.target.value)
                                    }
                                    type="number"
                                    className="form-control"
                                    placeholder="Truck"
                                    value={restTruck}
                                    required
                                />
                            </div>
                        </div>
                        <div className="ownform">
                            <div className="input-group mb-3">
                                <label htmlFor="Store Credit Card Purchase">
                                    Transfer
                                </label>
                                <div className="px-5">
                                    <select
                                        onChange={(e) =>
                                            setTransfer(e.target.value)
                                        }
                                        name=""
                                        id=""
                                        className="form-control"
                                        value={transfer}
                                    >
                                        <option value="+">In</option>
                                        <option value="-">Out</option>
                                    </select>
                                </div>
                                <span className="input-group-text">
                                    Ammount
                                </span>
                                <input
                                    onChange={(e) =>
                                        setRestTrans(e.target.value)
                                    }
                                    type="number"
                                    className="form-control"
                                    placeholder="Transfer"
                                    value={restTrans}
                                    required
                                />
                            </div>
                        </div>
                        <div className="ownform">
                            <div className="form-group">
                                <label htmlFor="Store Credit Card Purchase">
                                    Store Credit Card Purchase
                                </label>
                                <input
                                    onChange={(e) => setRestCCP(e.target.value)}
                                    type="number"
                                    className="form-control"
                                    placeholder="Store Credit Card Purchase"
                                    value={restCCP}
                                    required
                                />
                            </div>
                        </div>
                        <div className="ownform">
                            <div className="form-group">
                                <label htmlFor="qPromo">Quarterly Promo</label>
                                <input
                                    onChange={(e) => setQPromo(e.target.value)}
                                    type="number"
                                    className="form-control"
                                    placeholder="Quaterly Promo"
                                    value={qPromo}
                                    required
                                />
                            </div>
                        </div>
                        <div className="ownform">
                            <div className="form-group">
                                <label htmlFor="Tips">Tips</label>
                                <input
                                    onChange={(e) => setTips(e.target.value)}
                                    type="number"
                                    className="form-control"
                                    placeholder="Tips"
                                    value={tips}
                                    required
                                />
                            </div>
                        </div>
                        <div className="ownform">
                            <input
                                type="submit"
                                className="btn btn-danger mt-3"
                                value="Submit Form"
                            />
                        </div>
                    </form>
                </div>
                <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                >
                    <div className="wraper mt-5">
                        <div className="ownformcsv">
                            <FileUploader
                                handleChange={handleChange}
                                name="archivo"
                                types={fileTypes}
                                className="fullwidth"
                            />
                            {validacion ? (
                                <span>{file.name}</span>
                            ) : (
                                <span> </span>
                            )}
                        </div>
                        <div className="ownformcsv">
                            <input
                                type="submit"
                                className="btn btn-danger fullwidth"
                                value="Submit File"
                                onClick={(e) => altaCsv(e.target.file)}
                            />
                        </div>
                        <div className="ownformcsv ">
                            <a
                                href="../archivo.csv"
                                className="btn btn-danger mt-3 fullwidth"
                            >
                                Download Form File
                            </a>
                        </div>
                    </div>
                </div>
            </div>

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
            <ToastContainer />
        </>
    );
}

export default Csv;
