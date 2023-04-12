import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineDelete} from 'react-icons/ai'
import '../styles/expenseItem.css';

export default function ExpenseItem({ department, cost }) {
  const { currency, dispatch } = useContext(AppContext);

  const increaseExpense = () => {
    dispatch({
      type: 'ADD_EXPENSE',
      payload: { name: department, cost: 10 }
    });
  }

  const decreaseExpense = () => {
    dispatch({
      type: 'RED_EXPENSE',
      payload: { name: department, cost: 10 }
    });
  }

  const deleteExpense = () => {
    dispatch({
      type: 'DELETE_EXPENSE',
      payload: department
    });
  }

  const button_style = {width: '2rem', height: '2rem'}

  return (
    <tr>
      <td>{department}</td>
      <td>{currency}{cost}</td>
      <td><AiOutlinePlusCircle style={{...button_style, color: 'green' }} onClick={increaseExpense} /></td>
      <td><AiOutlineMinusCircle style={{ ...button_style, color: 'red'}} onClick={decreaseExpense} /></td>
      <td><AiOutlineDelete style={{...button_style, }} onClick={deleteExpense} /></td>
    </tr>
  )
}