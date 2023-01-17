import React from 'react';
import {Wizard} from 'react-use-wizard';
/* import SelectCashIn from '@app/pages/Employee/modals/wizard/SelectCashIn';
import SelectCashOut from '@app/pages/Employee/modals/wizard/SelectCashOut'; */
import CaptureVoucher from '@app/pages/Employee/modals/wizard/CaptureVoucher';
import DrawerInSummary from '@app/pages/Employee/modals/wizard/DrawerInSummary';
/* import CaptureDrawerOut from '@app/pages/Employee/modals/wizard/CaptureDrawerOut';
 */ import Summary from '@app/pages/Employee/modals/wizard/Summary';
import CaptureDrawerOut from '@app/pages/Employee/modals/wizard/CaptureDrawerOut';

function WizardComponent({onHide, setSubtitle}) {
    return (
        <>
            {' '}
            <Wizard>
                {/*  <SelectCashIn setSubtitle={setSubtitle} />
                <SelectCashOut setSubtitle={setSubtitle} /> */}
                {/* <CaptureDrawerOut setSubtitle={setSubtitle} /> */}
                <DrawerInSummary setSubtitle={setSubtitle} />
                <CaptureVoucher setSubtitle={setSubtitle} />
                <CaptureDrawerOut setSubtitle={setSubtitle} />
                <Summary onHide={onHide} setSubtitle={setSubtitle} />
            </Wizard>
        </>
    );
}

export default WizardComponent;
