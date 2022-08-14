import React from 'react';
import Char from '@app/components/chart/Chart';
import {Modal} from 'react-bootstrap';

const ChartModal = (props) => {
    const {onHide, show, data, field, nameField} = props;
    console.log('modal recargado');

    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <Char data={data} field={field} nameField={nameField} />
            </Modal.Body>
        </Modal>
    );
};
export default React.memo(ChartModal);
