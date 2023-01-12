import React from 'react';
import {Wizard} from 'react-use-wizard';
import SelectCashIn from '@app/pages/Employee/modals/wizard/SelectCashIn';
import SelectCashOut from '@app/pages/Employee/modals/wizard/SelectCashOut';
import CaptureVoucher from '@app/pages/Employee/modals/wizard/CaptureVoucher';
import CaptureSafe from '@app/pages/Employee/modals/wizard/CaptureSafe';
import Resume from '@app/pages/Employee/modals/wizard/Resume';

function WizardComponent({onHide, setSubTitle}) {
    return (
        <>
            {' '}
            <Wizard>
                <SelectCashIn setSubTitle={setSubTitle} />
                <SelectCashOut setSubTitle={setSubTitle} />
                <CaptureVoucher setSubTitle={setSubTitle} />
                <CaptureSafe setSubTitle={setSubTitle} />
                <Resume onHide={onHide} setSubTitle={setSubTitle} />
            </Wizard>
        </>
    );
}

export default WizardComponent;
