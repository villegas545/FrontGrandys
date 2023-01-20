import React from 'react';
import {Wizard} from 'react-use-wizard';
import CaptureVoucher from '@app/pages/Employee/modals/wizard/CaptureVoucher';
import DrawerInSummary from '@app/pages/Employee/modals/wizard/DrawerInSummary';
import Summary from '@app/pages/Employee/modals/wizard/Summary';
import CaptureDrawerOut from '@app/pages/Employee/modals/wizard/CaptureDrawerOut';

function WizardComponent({onHide, setSubtitle}) {
    return (
        <>
            <Wizard>
                <CaptureVoucher setSubtitle={setSubtitle} />
                <DrawerInSummary setSubtitle={setSubtitle} />
                <CaptureDrawerOut setSubtitle={setSubtitle} />
                <Summary onHide={onHide} setSubtitle={setSubtitle} />
            </Wizard>
        </>
    );
}

export default WizardComponent;
