import React from 'react';
import {Modal} from 'react-bootstrap';

export const ModalReceivedCreatedInfo = ({onHide, show, idRow, text}) => {
    return (
        <Modal
            onHide={onHide}
            show={show}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <BodyInfo onHide={onHide} idRow={idRow} text={text} />
            </Modal.Body>
        </Modal>
    );
};

const BodyInfo = ({onHide, idRow, text}) => {
    return (
        <>
            <span>
                <b>
                    {text} By: <br />
                </b>
                {text === 'Created'
                    ? idRow.row.original.user
                    : idRow.row.original.received}
            </span>
            <br />
            <span>
                <b>{text} Hour: </b>
                <br />
                {text === 'Created'
                    ? idRow.row.original.createdHour
                    : idRow.row.original.receivedHour}
            </span>
            <br />
            <span>
                <b>{text} Comments: </b>
                <br />
                {text === 'Created'
                    ? idRow.row.original.createdCommentaries
                    : idRow.row.original.receivedCommentaries}
            </span>
            <br />
            <br />
            <button
                className="btn btn-secondary w-100"
                type="button"
                onClick={() => onHide()}
            >
                Close{' '}
            </button>
        </>
    );
};

export default ModalReceivedCreatedInfo;
