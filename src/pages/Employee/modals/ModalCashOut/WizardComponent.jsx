/* eslint-disable no-unused-vars */
import {Wizard} from 'react-use-wizard';
import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {Modal} from 'react-bootstrap';
import '../modalDetailsStyles.scss';
import {useDispatch} from 'react-redux';
import {
    addCashOutService,
    cashOutApiInfo,
    getCashInByEmployeeAndDate,
    getCashRegisterEndupsByDayAndEmployeeAndRejected
} from '@app/services/';
import {getCashOutAction} from '@app/store/reducers/cashOutDucks';
import {getToday} from '@app/services/utils';
import Resume from '@app/pages/Employee/modals/ModalCashOut/Resume';
import ModalDrawerIn from './ModalDrawerIn';
import ModalDrawerOut from './ModalDrawerOut';

const WizardComponent = ({onHide, show, idRow, action, user}) => {
    const [drawer, setDrawer] = useState('');
    const [subTitle, setSubTitle] = useState('Please Register The Drawer In');
    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Details Balance - {user.user || null}{' '}
                    {user ? user.name : null}
                    Drawer {drawer}
                    <br />
                    <h6>{subTitle}</h6>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Body
                    idRow={idRow}
                    action={action}
                    user={user}
                    onHide={onHide}
                    setDrawer={setDrawer}
                    setSubTitle={setSubTitle}
                    drawer={drawer}
                />
            </Modal.Body>
        </Modal>
    );
};

function Body({idRow, user, onHide, setDrawer, setSubTitle, drawer}) {
    const [block, setBlock] = useState(false);
    const dispatch = useDispatch();
    const [formIn, setFormIn] = useState({
        pennies: 0,
        nickels: 0,
        dimes: 0,
        quarters: 0,
        penniesRoll: 0,
        nickelsRoll: 0,
        dimesRoll: 0,
        quartersRoll: 0,
        ones: 0,
        twos: 0,
        fives: 0,
        tens: 0,
        twenties: 0,
        fifties: 0,
        hundreds: 0,
        comments: '',
        date: getToday(),
        idEmployee: user.id
    });
    const [formOut, setFormOut] = useState({
        pennies: 0,
        nickels: 0,
        dimes: 0,
        quarters: 0,
        penniesRoll: 0,
        nickelsRoll: 0,
        dimesRoll: 0,
        quartersRoll: 0,
        ones: 0,
        twos: 0,
        fives: 0,
        tens: 0,
        twenties: 0,
        fifties: 0,
        hundreds: 0,
        comments: '',
        date: getToday(),
        idEmployee: user.id
    });
    const [apiInfo, setApiInfo] = React.useState();
    const [cashIn, setCashIn] = React.useState(0);
    const [error, setError] = React.useState();
    const [dateState, setDateState] = useState(getToday());
    // eslint-disable-next-line no-unused-vars
    const getApiInfo = async (date) => {
        try {
            setBlock(true);
            setApiInfo(await cashOutApiInfo(date));
            const resCashIn = await getCashInByEmployeeAndDate(date);
            if (resCashIn) {
                const coinsTotal =
                    (resCashIn.pennies +
                        resCashIn.nickels * 5 +
                        resCashIn.dimes * 10 +
                        resCashIn.quarters * 25) /
                        100 +
                    (resCashIn.penniesRoll * 50 +
                        resCashIn.nickelsRoll * 5 * 40 +
                        resCashIn.dimesRoll * 10 * 50 +
                        resCashIn.quartersRoll * 25 * 40) /
                        100;
                const billsTotal =
                    resCashIn.ones +
                    resCashIn.twos * 2 +
                    resCashIn.fives * 5 +
                    resCashIn.tens * 10 +
                    resCashIn.twenties * 20 +
                    resCashIn.fifties * 50 +
                    resCashIn.hundreads * 100;
                const totalTotal = Number(coinsTotal) + Number(billsTotal);
                setDrawer(resCashIn.drawer);
                setCashIn(totalTotal);
            } else {
                alert("Cash In hasn't been approved or is not available");
                onHide();
                setCashIn(0);
            }

            setBlock(false);
        } catch (err) {
            console.log(err);
        }
    };
    // cargar si esta cancelado
    useEffect(() => {
        (async () => {
            const res = await getCashRegisterEndupsByDayAndEmployeeAndRejected(
                dateState
            );
            await getApiInfo(dateState);
            console.log(res);
            if (res) {
                const {
                    pennies,
                    nickels,
                    dimes,
                    quarters,
                    penniesRoll,
                    nickelsRoll,
                    dimesRoll,
                    quartersRoll,
                    ones,
                    twos,
                    fives,
                    tens,
                    twenties,
                    fifties,
                    hundreds,
                    comments
                } = res;
                /*    setForm({
                    ...form,
                    pennies,
                    nickels,
                    dimes,
                    quarters,
                    penniesRoll,
                    nickelsRoll,
                    dimesRoll,
                    quartersRoll,
                    ones,
                    twos,
                    fives,
                    tens,
                    twenties,
                    fifties,
                    hundreds,
                    comments
                }); */
            }
        })();
    }, [dateState]);

    /* GET PIPO TOTAL */
    const getPipoTotal = (apiData) => {
        try {
            let pipoTotal = 0;
            apiData.userPipo.forEach((element) => {
                if (element.pipo_type === 'pay out') {
                    pipoTotal -= element.amount;
                } else {
                    pipoTotal += element.amount;
                }
            });
            return pipoTotal;
        } catch (err) {
            return 0;
        }
    };

    /* GET SALES TYPE */
    const owedTotal = (apiData) => {
        try {
            let cashOwed = 0;
            let creditOwed = 0;
            apiData.owed2House[0].payments.forEach((element) => {
                if (element.payment_type === 'Credit') {
                    creditOwed = element.amount;
                }
                if (element.payment_type === 'Cash') {
                    cashOwed = element.amount;
                }
            });
            return {cashOwed, creditOwed};
        } catch (err) {
            return {cashOwed: 0, creditOwed: 0};
        }
    };

    //! Envio de formulario
    const submit = async () => {
        try {
            const coinsTotalIn =
                (Number(formIn.pennies) +
                    Number(formIn.nickels * 5) +
                    Number(formIn.dimes * 10) +
                    Number(formIn.quarters * 25)) /
                    100 +
                (Number(formIn.penniesRoll * 50) +
                    Number(formIn.nickelsRoll * 5 * 40) +
                    Number(formIn.dimesRoll * 10 * 50) +
                    Number(formIn.quartersRoll * 25 * 40)) /
                    100;
            const billsTotalIn =
                Number(formIn.ones) +
                Number(formIn.twos * 2) +
                Number(formIn.fives * 5) +
                Number(formIn.tens * 10) +
                Number(formIn.twenties * 20) +
                Number(formIn.fifties * 50) +
                Number(formIn.hundreds * 100);
            const grandTotalIn = Number(coinsTotalIn) + Number(billsTotalIn);

            const coinsTotalOut =
                (Number(formOut.pennies) +
                    Number(formOut.nickels * 5) +
                    Number(formOut.dimes * 10) +
                    Number(formOut.quarters * 25)) /
                    100 +
                (Number(formOut.penniesRoll * 50) +
                    Number(formOut.nickelsRoll * 5 * 40) +
                    Number(formOut.dimesRoll * 10 * 50) +
                    Number(formOut.quartersRoll * 25 * 40)) /
                    100;
            const billsTotalOut =
                Number(formOut.ones) +
                Number(formOut.twos * 2) +
                Number(formOut.fives * 5) +
                Number(formOut.tens * 10) +
                Number(formOut.twenties * 20) +
                Number(formOut.fifties * 50) +
                Number(formOut.hundreds * 100);
            const grandTotalOut = Number(coinsTotalOut) + Number(billsTotalOut);

            const pipo = getPipoTotal(apiInfo);
            const cashSales = owedTotal(apiInfo).cashOwed;
            const creditSales = owedTotal(apiInfo).creditOwed;
            const expected = Number(cashIn) + Number(cashSales) + Number(pipo);
            const difference =
                Number(grandTotalIn) + Number(grandTotalOut) - Number(expected);
            const dataFormIn = formIn;
            dataFormIn.coinsTotal = Number(coinsTotalIn).toFixed(2);
            dataFormIn.billsTotal = Number(billsTotalIn).toFixed(2);
            dataFormIn.grandTotal = Number(grandTotalIn).toFixed(2);
            const dataFormOut = formOut;
            dataFormOut.coinsTotal = Number(coinsTotalOut).toFixed(2);
            dataFormOut.billsTotal = Number(billsTotalOut).toFixed(2);
            dataFormOut.grandTotal = Number(grandTotalOut).toFixed(2);
            const request = {
                pipo: Number(pipo).toFixed(2),
                cashSales: Number(cashSales).toFixed(2),
                creditSales: Number(creditSales).toFixed(2),
                expected: Number(expected).toFixed(2),
                difference: Number(difference).toFixed(2),
                cashIn: Number(cashIn).toFixed(2),
                grandTotal:
                    Number(formIn.grandTotal) + Number(formOut.grandTotal),
                drawer,
                date: formIn.date,
                idEmployee: formIn.idEmployee,
                totalJson: {drawerIn: dataFormIn, drawerOut: dataFormOut}
            };

            setBlock(true);
            const response = await addCashOutService(request);
            setBlock(false);
            if (response.message === 'existentEmployees') {
                setError(
                    `The employee already has an Open Cash Out Registry, "Please Close It First"`
                );
            } else {
                dispatch(getCashOutAction('reload'));
                toast.success('The registry is saved');
                onHide();
            }
        } catch (err) {
            console.log(err);
            setError('err.data.error');
        }
    };

    return (
        <>
            {' '}
            <Wizard>
                <ModalDrawerIn
                    idRow={idRow}
                    block={block}
                    setForm={setFormIn}
                    form={formIn}
                    setDateState={setDateState}
                    setSubTitle={setSubTitle}
                    error={error}
                />
                <ModalDrawerOut
                    idRow={idRow}
                    block={block}
                    setForm={setFormOut}
                    form={formOut}
                    error={error}
                    setSubTitle={setSubTitle}
                />
                <Resume
                    idRow={idRow}
                    block={block}
                    formIn={formIn}
                    formOut={formOut}
                    error={error}
                    setSubTitle={setSubTitle}
                    submit={submit}
                />
            </Wizard>
        </>
    );
}

export default WizardComponent;
