import React from 'react';
import {Wizard} from 'react-use-wizard';
import SelectCashIn from '@app/pages/Employee/modals/wizard/SelectCashIn';
import SelectCashOut from '@app/pages/Employee/modals/wizard/SelectCashOut';
import CaptureVoucher from '@app/pages/Employee/modals/wizard/CaptureVoucher';
import CaptureSafe from '@app/pages/Employee/modals/wizard/CaptureSafe';
import Resume from '@app/pages/Employee/modals/wizard/Resume';

function WizardComponent({onHide}) {
    return (
        <>
            {' '}
            <Wizard>
                <SelectCashIn />
                <SelectCashOut />
                <CaptureVoucher />
                <CaptureSafe />
                <Resume onHide={onHide} />
            </Wizard>
        </>
    );
}

export default WizardComponent;
