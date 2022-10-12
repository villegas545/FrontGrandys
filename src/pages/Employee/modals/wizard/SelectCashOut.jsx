/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
import React, {useEffect, useState} from 'react';
import {useWizard} from 'react-use-wizard';
// eslint-disable-next-line no-unused-vars
import {currencyFormat, getToday} from '@app/services/utils';
import {getCashOutByDate} from '@app/services/';
import {useDispatch,useSelector} from 'react-redux';
import {wizardVoucher} from "@app/store/reducers/safeCashDucks"

function SelectCashOut() {
    // eslint-disable-next-line no-unused-vars
    const {handleStep, previousStep, nextStep} = useWizard();
    // eslint-disable-next-line no-unused-vars
    const [tableInfo, setTableInfo] = useState([]);
    const [totalState,setTotalState]=useState(0)
    const [listCashOut,setListCashOut]=useState([])
    const dispatch=useDispatch()
    const wizDate = useSelector((store) => store.safeCash.wizardDate);

    handleStep(() => {
        dispatch(wizardVoucher({
            type:"wizardCashOuts",
            cashOuts:listCashOut
        })) 
    });
    const getTotal=(element)=>{
        const coinsTotal =
                (element.pennies +
                    element.nickels * 5 +
                    element.dimes * 10 +
                    element.quarters * 25) /
                100;
        const billsTotal =
                element.ones +
                element.fives * 5 +
                element.twenties * 20 +
                element.fifties * 50 +
                element.hundreds * 100;
        return( Number(coinsTotal) + Number(billsTotal))
    }
    const initValues = async(date)=>{
        const resp = await getCashOutByDate(date);
        console.log(resp)
        /*  let totalTotal=0;
        resp.forEach(row =>{totalTotal+=getTotal(row)})
        setTotalState(totalTotal) */
        setTableInfo(resp);
    }
    useEffect(() => {
        initValues(wizDate)
    }, []);
    const addCashIn =(checked,row)=>{
        if(checked){
            setListCashOut(old=>[...old,row])
        }else{
            console.log(listCashOut)
            setListCashOut(listCashOut.filter(element=>element!==row))
        }
        
    }
    useEffect(()=>{
        let totalTotal=0;
        listCashOut.forEach(row =>{totalTotal+=getTotal(row)})
        setTotalState(totalTotal)
    },[listCashOut])
    return (
        <div>
            <span>
                <b> CashIn Total: { currencyFormat(totalState) }</b>
            </span>{' '}
            <span>
                <b> CashIn Count: {listCashOut.length}</b>
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
                            <tr key={row.id} >
                                <td>{currencyFormat(getTotal(row))}</td>
                                <td>{row.User.name}</td>
                                <td>{row.status}</td>
                                <td>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={`customCheck${row.id}`} onChange={(e)=>addCashIn(e.target.checked,row)} />
                                        <label className="custom-control-label" htmlFor={`customCheck${row.id}`}>{}</label>
                                    </div>                              
                                </td>
                            </tr>
                        ))
                        : null}
                </tbody>
            </table>
            {/* <button className='btn btn-primary' onClick={() => previousStep()}>Previous ⏮️</button> */}
            <div className='float-right'><button className='btn btn-primary' onClick={() => nextStep()}>Next</button></div>
            
        </div>
    );
}

export default SelectCashOut;
