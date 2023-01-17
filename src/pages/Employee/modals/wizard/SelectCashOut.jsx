/* eslint-disable indent */
import React, {useEffect, useState} from 'react';
import {useWizard} from 'react-use-wizard';
// eslint-disable-next-line no-unused-vars
import {currencyFormat, getToday} from '@app/services/utils';
import {getCashOutByDate} from '@app/services/';
import {useDispatch, useSelector} from 'react-redux';
import {wizardVoucher} from '@app/store/reducers/safeCashDucks';
import BlockUi from 'react-block-ui';

const SelectCashOut = ({setSubtitle}) => {
    // eslint-disable-next-line no-unused-vars
    const {handleStep, previousStep, nextStep} = useWizard();
    // eslint-disable-next-line no-unused-vars
    const [tableInfo, setTableInfo] = useState([]);
    const [totalState, setTotalState] = useState({
        drawerIn: 0,
        drawerOut: 0,
        drawerTotal: 0
    });
    const [listCashOut, setListCashOut] = useState([]);
    const dispatch = useDispatch();
    const wizDate = useSelector((store) => store.safeCash.wizardDate);
    const [block, setBlock] = useState(false);
    useState(() => {
        setSubtitle('Select Cash Out');
    }, [setSubtitle]);
    handleStep(() => {
        dispatch(
            wizardVoucher({
                type: 'wizardCashOuts',
                cashOuts: listCashOut
            })
        );
    });
    /*   const getTotal = (element) => {
        const coinsTotal =
            (element.pennies +
                element.nickels * 5 +
                element.dimes * 10 +
                element.quarters * 25) /
                100 +
            (element.penniesRoll * 50 +
                element.nickelsRoll * 5 * 40 +
                element.dimesRoll * 10 * 50 +
                element.quartersRoll * 25 * 40) /
                100;
        const billsTotal =
            element.ones +
            element.twos * 2 +
            element.fives * 5 +
            element.tens * 10 +
            element.twenties * 20 +
            element.fifties * 50 +
            element.hundreds * 100;
        return Number(coinsTotal) + Number(billsTotal);
    }; */
    const initValues = async (date) => {
        setBlock(true);
        const resp = await getCashOutByDate(date);
        setBlock(false);
        console.log(resp);
        /*  let totalTotal=0;
        resp.forEach(row =>{totalTotal+=getTotal(row)})
        setTotalState(totalTotal) */
        setTableInfo(resp);
    };
    useEffect(() => {
        initValues(wizDate);
    }, []);
    const addCashIn = (checked, row) => {
        if (checked) {
            setListCashOut((old) => [...old, row]);
        } else {
            console.log(listCashOut);
            setListCashOut(listCashOut.filter((element) => element !== row));
        }
    };
    useEffect(() => {
        let drawerInTotal = 0;
        let drawerOutTotal = 0;
        listCashOut.forEach((row) => {
            drawerInTotal += Number(row.totalJson.drawerIn.grandTotal);
            drawerOutTotal += Number(row.totalJson.drawerOut.grandTotal);
        });
        setTotalState({
            drawerIn: drawerInTotal,
            drawerOut: drawerOutTotal,
            drawerTotal: Number(drawerInTotal + drawerOutTotal)
        });
    }, [listCashOut]);
    return (
        <>
            <BlockUi tag="div" blocking={block} message="Please Wait">
                <div>
                    <div className="row">
                        <div className="col-6">
                            <span>
                                <b>
                                    CashOut In Total:
                                    {currencyFormat(totalState.drawerIn)}
                                </b>
                            </span>
                        </div>
                        <div className="col-6">
                            <span>
                                <b>
                                    {' '}
                                    CashOut Out Total:{' '}
                                    {currencyFormat(totalState.drawerOut)}
                                </b>
                            </span>{' '}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <span>
                                <b>
                                    {' '}
                                    CashOut Grand Total:{' '}
                                    {currencyFormat(totalState.drawerTotal)}
                                </b>
                            </span>{' '}
                        </div>
                        <div className="col-6">
                            <span>
                                <b> CashOut Count: {listCashOut.length}</b>
                            </span>{' '}
                        </div>
                    </div>
                    <table className="table table-light">
                        <thead>
                            <tr>
                                <th>Total Drawer In</th>
                                <th>Total Drawer Out</th>
                                <th>Employee</th>
                                <th>Status</th>
                                <th>Selected</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableInfo
                                ? tableInfo.map((row) => (
                                      <tr key={row.id}>
                                          <td>
                                              {currencyFormat(
                                                  Number(
                                                      row.totalJson.drawerIn
                                                          .grandTotal
                                                  )
                                              )}
                                          </td>
                                          <td>
                                              {currencyFormat(
                                                  Number(
                                                      row.totalJson.drawerOut
                                                          .grandTotal
                                                  )
                                              )}
                                              {console.log(row)}
                                          </td>
                                          <td>{row.User.name}</td>
                                          <td>{row.status}</td>
                                          <td>
                                              <div className="custom-control custom-checkbox">
                                                  <input
                                                      type="checkbox"
                                                      className="custom-control-input"
                                                      id={`customCheck${row.id}`}
                                                      onChange={(e) =>
                                                          addCashIn(
                                                              e.target.checked,
                                                              row
                                                          )
                                                      }
                                                  />
                                                  <label
                                                      className="custom-control-label"
                                                      htmlFor={`customCheck${row.id}`}
                                                  >
                                                      {}
                                                  </label>
                                              </div>
                                          </td>
                                      </tr>
                                  ))
                                : null}
                        </tbody>
                    </table>
                    <div className="float-right">
                        <button
                            className="btn btn-primary"
                            onClick={() => nextStep()}
                            type="submit"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </BlockUi>
        </>
    );
};

export default SelectCashOut;
