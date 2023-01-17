/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
import React, {useEffect, useState} from 'react';
import {useWizard} from 'react-use-wizard';
// eslint-disable-next-line no-unused-vars
import {currencyFormat, getToday} from '@app/services/utils';
import {getCashInByDate} from '@app/services/';
import {useDispatch} from 'react-redux';
import BlockUi from 'react-block-ui';
import {wizardVoucher} from '@app/store/reducers/safeCashDucks';

const SelectCashIn=({setSubtitle}) =>{
    // eslint-disable-next-line no-unused-vars
    const {handleStep, previousStep, nextStep} = useWizard();
    // eslint-disable-next-line no-unused-vars
    const [tableInfo, setTableInfo] = useState([]);
    const [totalState, setTotalState] = useState(0);
    const [listCashIn, setListCashIn] = useState([]);
    const [block, setBlock] = useState(false);
    const [wizDate, setWizDate] = useState(getToday());
    const dispatch = useDispatch();
    useState(() => {
        setSubtitle('Select Cash In');
    }, [setSubtitle]);
    handleStep(() => {
        console.log({
            type: 'wizardCashIns',
            date: wizDate,
            cashIns: listCashIn
        });
        dispatch(
            wizardVoucher({
                type: 'wizardCashIns',
                date: wizDate,
                cashIns: listCashIn
            })
        );
    });
    const getTotal = (element) => {
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
            element.hundreads * 100;
        return Number(coinsTotal) + Number(billsTotal);
    };
    const initValues = async (date) => {
        console.log('hihihi');
        setBlock(true);
        const resp = await getCashInByDate(date);
        setBlock(false);
        /*  let totalTotal=0;
        resp.forEach(row =>{totalTotal+=getTotal(row)})
        setTotalState(totalTotal) */
        setTableInfo(resp);
    };
    useEffect(() => {
        initValues(getToday());
    }, []);
    const addCashIn = (checked, row) => {
        if (checked) {
            setListCashIn((old) => [...old, row]);
        } else {
            console.log(listCashIn);
            setListCashIn(listCashIn.filter((element) => element !== row));
        }
    };
    useEffect(() => {
        let totalTotal = 0;
        listCashIn.forEach((row) => {
            totalTotal += getTotal(row);
        });
        setTotalState(totalTotal);
    }, [listCashIn]);
    return (
        <BlockUi tag="div" blocking={block} message="Please Wait">
            <div>
                <div
                    className=""
                    style={{
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        flex: '1 10%'
                    }}
                >
                    {' '}
                    <span
                        className="input-group-text"
                        style={{minWidth: '100px'}}
                    >
                        Date
                    </span>
                    <input
                        type="date"
                        className="form-control mr-3"
                        onChange={(e) => {
                            setWizDate(e.target.value);
                            initValues(e.target.value);
                        }}
                        defaultValue={getToday()}
                    />
                </div>
                <span>
                    <b> CashIn Total: {currencyFormat(totalState)}</b>
                </span>{' '}
                <span>
                    <b> CashIn Count: {listCashIn.length}</b>
                </span>{' '}
                <table className="table table-light">
                    <thead>
                        <tr>
                            <th>Total</th>
                            <th>Employee</th>
                            <th>Status</th>
                            <th>Selected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableInfo
                            ? tableInfo.map((row) => (
                                  <tr key={row.id}>
                                      <td>{currencyFormat(getTotal(row))}</td>
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
                {/* <button className='btn btn-primary' onClick={() => previousStep()}>Previous ⏮️</button> */}
                <div className="float-right">
                    <button
                        className="btn btn-primary"
                        onClick={() => nextStep()}
                    >
                        Next
                    </button>
                </div>
            </div>
        </BlockUi>
    );
}

export default SelectCashIn;
