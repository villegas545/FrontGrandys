import React, {useState} from 'react';
import {FileUploader} from 'react-drag-drop-files';
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {getRestActionByApi} from '@app/store/reducers/restsDucks';
import {changeReactLoading} from '@app/store/reducers/reactLoadingDucks';
import {url as urlconf} from '../config';
import '../styles/csv.scss';

const fileTypes = ['only csv files', 'vnd.ms-excel'];

const Csv = () => {
    const dispatch = useDispatch();

    const [file, setFile] = useState(null);
    const [validacion, setValidacion] = useState(false);
    const [restName, setRestName] = useState(null);
    const [restDate, setRestDate] = useState(null);
    const [restTemp, setRestTemp] = useState(null);
    const [restWeat, setRestWeat] = useState(null);
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
        await dispatch(
            getRestActionByApi(localStorage.getItem('restaurantApi'))
        );
        setRestName(rest.api);
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
            toast.success('Uploaded success!');
        } catch (err) {
            console.log('todo salio mal');
        }
        dispatch(changeReactLoading(false));
    };
    const altaCsv = async () => {
        const f = new FormData();
        f.append('archivo', file);
        const api = localStorage.getItem('restaurantApi');

        const respuesta = await axios.post(`${urlFile}/file/${api}`, f, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        console.log(respuesta);
        if (respuesta.data.message === 'ok') {
            // alert('Archivo cargado correctamente');

            toast.success('Uploaded success!');
        } else {
            const numberDates = respuesta.data.dateList.length;
            confirmAlert({
                title: `${numberDates} dates are missing`,
                message: `Do you want to download them? This may take about ${numberDates} minutes, please be patient`,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            dispatch(changeReactLoading(true));
                            /*  datePopulate(respuesta.data.dateList); */
                            toast.error(
                                'date not available, please wait for the next update'
                            );
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
            restDate == null ||
            restTemp == null ||
            restWeat == null ||
            restTruck == null ||
            restTrans == null ||
            restCCP == null ||
            qPromo == null ||
            tips == null
        ) {
            toast.error('Please fill all the fields');
            return;
        }

        const data = [
            {
                restaurantId: restName,
                date: restDate,
                weatherTemp: restTemp,
                weatherW: restWeat,
                truck: restTruck,
                transfer: restTrans,
                storeCreditCardPursh: restCCP,
                quarterlyProm1: qPromo,
                Dep1: tips,
                transferType: transfer
            }
        ];
        const api = localStorage.getItem('restaurantApi');
        const respuesta = await axios.post(
            `${urlFile}/form/${api}`,
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
            toast.success('Uploaded success!');
        } else {
            const numberDates = respuesta.data.dateList.length;
            confirmAlert({
                title: `${numberDates} dates are missing`,
                message: `Do you want to download them? This may take about ${numberDates} minutes, please be patient`,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            dispatch(changeReactLoading(true));
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
                                <input
                                    type="text"
                                    className="form-control"
                                    value={rest.name}
                                    readOnly
                                />
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
                                <label htmlFor="Truck">Truck</label>
                                <input
                                    onChange={(e) =>
                                        setRestTruck(e.target.value)
                                    }
                                    type="number"
                                    className="form-control"
                                    placeholder="Truck"
                                    value={restTruck}
                                    step="0.01"
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
                                <span className="input-group-text">Amount</span>
                                <input
                                    onChange={(e) =>
                                        setRestTrans(e.target.value)
                                    }
                                    type="number"
                                    className="form-control"
                                    placeholder="Transfer"
                                    value={restTrans}
                                    step="0.01"
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
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>
                        <div className="ownform">
                            <div className="form-group">
                                <label htmlFor="qPromo">Waste</label>
                                <input
                                    onChange={(e) => setQPromo(e.target.value)}
                                    type="number"
                                    className="form-control"
                                    placeholder="Waste"
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
                                    step="0.01"
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
        </>
    );
};

export default Csv;
