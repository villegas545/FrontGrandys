import React, {useState} from 'react';
import {FileUploader} from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF', 'JPEG'];

function Csv() {
    const [file, setFile] = useState(null);
    const [validacion, setValidacion] = useState(false);

    const handleChange = (_file) => {
        setFile(_file);
        setValidacion(true);
    };

    const altaCsv = () => {
        console.log(file);
    };

    return (
        <>
            <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
            />
            {validacion ? (
                <span>{file.name}</span>
            ) : (
                <span>Csv no seleccionado</span>
            )}

            <input type="submit" value="mostrar" onClick={() => altaCsv()} />
        </>
    );
}

export default Csv;
