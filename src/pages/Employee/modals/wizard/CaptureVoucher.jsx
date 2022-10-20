/* eslint-disable indent */
import {currencyFormat} from '@app/services/utils';
import React, {useState} from 'react';
import CurrencyFormat from 'react-currency-format';
import nextId from 'react-id-generator';
import {useWizard} from 'react-use-wizard';
import {useDispatch} from 'react-redux';
import {wizardVoucher} from '@app/store/reducers/safeCashDucks';

const CaptureVoucher = () => {
    const [form, setForm] = useState({
        pennies: 0,
        nickels: 0,
        dimes: 0,
        quarters: 0,
        ones: 0,
        twos: 0,
        fives: 0,
        tens: 0,
        twenties: 0,
        fifties: 0,
        hundreads: 0,
        total: 0,
        comentaries: '',
        type: 'In'
    });
    const [vouchers, setVouchers] = useState([]);
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState();
    const {nextStep, handleStep} = useWizard();
    handleStep(() => {
        console.log({
            type: 'wizardCashIns',
            cashIns: vouchers
        });
        dispatch(
            wizardVoucher({
                type: 'wizardVouchers',
                vouchers
            })
        );
    });
    const addVoucher = async () => {
        try {
            console.log(form);
            const formulario = form;
            formulario.id = nextId();
            formulario.total =
                Number(form.ones) +
                Number(form.twos * 2) +
                Number(form.fives * 5) +
                Number(form.tens * 10) +
                Number(form.twenties * 20) +
                Number(form.fifties * 50) +
                Number(form.hundreads * 100) +
                (Number(form.pennies) +
                    Number(form.nickels * 5) +
                    Number(form.dimes * 10) +
                    Number(form.quarters * 25)) /
                    100;
            setVouchers((old) => [...old, formulario]);
            setForm({
                pennies: 0,
                nickels: 0,
                dimes: 0,
                quarters: 0,
                ones: 0,
                twos: 0,
                fives: 0,
                tens: 0,
                twenties: 0,
                fifties: 0,
                hundreads: 0,
                total: 0,
                comentaries: '',
                type: 'In'
            });
        } catch (err) {
            console.log(err);
        }
    };
    const removeVoucher = (id) => {
        console.log(id);
        setVouchers(vouchers.filter((voucher) => voucher.id !== id));
    };
    const getTotalVouchers = (vouchersTotal) => {
        console.log(vouchersTotal);
        let total = 0;
        vouchersTotal.forEach((voucher) => {
            if (voucher.type === 'In') {
                total += Number(voucher.total);
            } else {
                total -= Number(voucher.total);
            }
        });
        return total;
        //  const total = vouchers.forEach();
    };
    return (
        <>
            <div className="card-body">
                <div className="d-flex justify-content-end">
                    <div className="d-flex align-items-center">
                        <span
                            className="input-group-text"
                            style={{minWidth: '50px'}}
                        >
                            Type
                        </span>
                        <select
                            className="form-control"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    type: e.target.value
                                })
                            }
                            value={form.type}
                        >
                            <option>In</option>
                            <option>Out</option>
                        </select>
                    </div>
                </div>
                <div className="table_details">
                    <div className="d-flex p-2 text-center">
                        <div />
                        <div>Coins</div>
                        <div>Rolls</div>
                        <div>Total</div>
                    </div>
                    <div className="d-flex p-2">
                        <div> Pennies</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        pennies: e.target.value
                                    })
                                }
                                value={form.pennies}
                                className="form-control"
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={Math.floor(form.pennies / 50)}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.pennies}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> Nickels</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        nickels: e.target.value
                                    })
                                }
                                value={form.nickels}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={Math.floor(form.nickels / 40)}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.nickels * 5}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> Dimes</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        dimes: e.target.value
                                    })
                                }
                                value={form.dimes}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={Math.floor(form.dimes / 50)}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.dimes * 10}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> quarters</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        quarters: e.target.value
                                    })
                                }
                                value={form.quarters}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={Math.floor(form.quarters / 40)}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.quarters * 25}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2 text-center">
                        <div />
                        <div>Bills</div>
                        <div />
                        <div>Total</div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 1`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        ones: e.target.value
                                    })
                                }
                                value={form.ones}
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.ones}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 2`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        twos: e.target.value
                                    })
                                }
                                value={form.twos}
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.twos * 2}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 5`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        fives: e.target.value
                                    })
                                }
                                value={form.fives}
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.fives * 5}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 10`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        tens: e.target.value
                                    })
                                }
                                value={form.tens}
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.tens * 10}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 20`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        twenties: e.target.value
                                    })
                                }
                                value={form.twenties}
                            />{' '}
                        </div>
                        <div> </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.twenties * 20}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 50`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        fifties: e.target.value
                                    })
                                }
                                value={form.fifties}
                            />{' '}
                        </div>
                        <div> </div>
                        <div>
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.fifties * 50}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 100`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        hundreads: e.target.value
                                    })
                                }
                                value={form.hundreads}
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.hundreads * 100}
                                disabled
                            />{' '}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-around">
                    <div className="flex-row p-2 justify-content-around">
                        <div className="d-flex justify-content-around mb-3">
                            <div>
                                <span
                                    className="input-group-text"
                                    style={{minWidth: '100px'}}
                                >
                                    Coins Total
                                </span>
                                <CurrencyFormat
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                    className="form-control input-sm mr-3"
                                    style={{minWidth: '50px'}}
                                    value={
                                        (Number(form.pennies) +
                                            Number(form.nickels * 5) +
                                            Number(form.dimes * 10) +
                                            Number(form.quarters * 25)) /
                                        100
                                    }
                                    disabled
                                />
                            </div>
                            <div>
                                <span
                                    className="input-group-text"
                                    style={{minWidth: '100px'}}
                                >
                                    Bills Total
                                </span>
                                <CurrencyFormat
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                    className="form-control input-sm mr-3"
                                    style={{minWidth: '50px'}}
                                    value={
                                        Number(form.ones) +
                                        Number(form.fives * 5) +
                                        Number(form.tens * 10) +
                                        Number(form.twenties * 20) +
                                        Number(form.fifties * 50) +
                                        Number(form.hundreads * 100)
                                    }
                                    disabled
                                />
                            </div>
                            <div>
                                <span
                                    className="input-group-text"
                                    style={{minWidth: '100px'}}
                                >
                                    Grand Total
                                </span>
                                <CurrencyFormat
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                    className="form-control input-sm mr-3"
                                    style={{minWidth: '50px'}}
                                    value={
                                        Number(form.ones) +
                                        Number(form.fives * 5) +
                                        Number(form.tens * 10) +
                                        Number(form.twenties * 20) +
                                        Number(form.fifties * 50) +
                                        Number(form.hundreads * 100) +
                                        (Number(form.pennies) +
                                            Number(form.nickels * 5) +
                                            Number(form.dimes * 10) +
                                            Number(form.quarters * 25)) /
                                            100
                                    }
                                    disabled
                                />
                            </div>
                        </div>
                        <div style={{minWidth: '300px'}}>
                            <span
                                className="input-group-text"
                                style={{minWidth: '100px'}}
                            >
                                Comments
                            </span>
                            <textarea
                                title="Comments"
                                type="text"
                                className="form-control input-sm mr-3"
                                style={{minWidth: '50px'}}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        comentaries: e.target.value
                                    })
                                }
                                value={form.comentaries}
                            />
                        </div>
                    </div>

                    <div className="d-flex flex-wrap justify-content-around">
                        <table className="table table-light text-center">
                            <thead>
                                <tr>
                                    <th>Total</th>
                                    <th>In/Out</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vouchers.map((voucher) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <tr key={voucher.id}>
                                        <td>{currencyFormat(voucher.total)}</td>
                                        <td>{voucher.type}</td>
                                        <td>
                                            {' '}
                                            <a
                                                href="#"
                                                onClick={() =>
                                                    removeVoucher(voucher.id)
                                                }
                                            >
                                                <i className="fas fa-trash-alt text-danger " />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>{}</th>
                                    <th>Total:</th>
                                    <th>
                                        {currencyFormat(
                                            getTotalVouchers(vouchers)
                                        )}
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <p className="text-danger"> {error || null}</p>
                <div>
                    <input
                        type="submit"
                        className="btn btn-dark btn-lg"
                        value="Add Voucher"
                        onClick={() => addVoucher()}
                    />
                </div>
                <div className="float-right">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => nextStep()}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default CaptureVoucher;
React.memo(CaptureVoucher);
