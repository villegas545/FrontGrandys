import React, {useState} from 'react';
import {FileUploader} from 'react-drag-drop-files';
import axios from 'axios';
import {url as urlconf} from '../config';

const fileTypes = ['only csv files', 'vnd.ms-excel'];

function Csv() {
    const [file, setFile] = useState(null);
    const [validacion, setValidacion] = useState(false);

    const url = `${urlconf}csvToJson`;

    const handleChange = (_file) => {
        setFile(_file);
        setValidacion(true);
    };

    const altaCsv = async () => {
        const f = new FormData();
        f.append('archivo', file);
        await axios.post(url, f);
    };

    return (
        <>
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
        </>
    );
}

export default Csv;
