import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/allocationForm.css'

export default function AllocationForm() {
  const { budget, currency, expenses, dispatch } = useContext(AppContext);

  const total_expenses = expenses.reduce((total, item) => {
    return total + item.cost
  }, 0);
  const remaining = budget - total_expenses;

  const [department, setDepartment] = useState('Marketing');
  const [allocationType, setAllocationType] = useState('ADD_EXPENSE');
  const [cost, setCost] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cost > remaining) {
      alert('You cannot allocate more than the remaining budget.');
    }
    else if (!department) {
      alert('Select a department.')
    }
    else {
      dispatch({
        type: allocationType,
        payload: { name: department, cost: Number(cost) }
      })
    }
  }


  return (
    <div className='allocation-form'>
      <h3>Change Allocation</h3>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='department' className='label'>Department</label>
        <select id='department' onChange={e => setDepartment(e.target.value)}>
          {expenses.map(expense => <option key={expense.id} value={expense.name}>{expense.name}</option>)}
        </select>

        <label htmlFor='allocation-type' className='label'>Allocation</label>
        <select id='allocation-type' onChange={e => setAllocationType(e.target.value)}>
          <option value='ADD_EXPENSE'>Increase</option>
          <option value='RED_EXPENSE'>Decrease</option>
        </select>

        <label htmlFor='amount'>{currency}</label>
        <input id='amount' type='number' step='10' onChange={e => setCost(e.target.value)} value={cost} />

        <input type='submit' value='Save'/>
      </form>
    </div>
  )
}