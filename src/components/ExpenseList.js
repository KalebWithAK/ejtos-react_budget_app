import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList() {
  const { expenses } = useContext(AppContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Department</th>
          <th>Allocated Budget</th>
          <th>Increase by 10</th>
          <th>Decrease by 10</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(expense => <ExpenseItem key={expense.id} department={expense.name} cost={expense.cost} />)}
      </tbody>
    </table>
  )
}