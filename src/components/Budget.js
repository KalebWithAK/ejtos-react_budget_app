import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { BiDownArrow } from 'react-icons/bi'
import Select from 'react-select';
import '../styles/budget.css';

export default function Budget() {
  const { budget, currency, expenses, dispatch } = useContext(AppContext);
  const [new_budget, setNewBudget] = useState(budget);
  const [showOptions, setShowOptions] = useState(false);

  const currencies = [
    { value: '£', label: '£ Pound' },
    { value: '$', label: '$ USD' },
    { value: '€', label: '€ Euro' },
    { value: '₹', label: '₹ Rupee' },
  ]


  let starter_currency;
  for (let i = 0; i < currencies.length; i++) {
    if (currency === currencies[i].value) {
      starter_currency = currencies[i].label;
    }
  }

  const [selected_currency, selectCurrency] = useState(starter_currency);

  const total_expenses = expenses.reduce((total, item) => {
    return total + item.cost
  }, 0);
  const remaining = budget - total_expenses;

  const handleBudgetChange = (e) => {
    setNewBudget(e.target.value);

    setTimeout(() => {
      let new_budget = Number(e.target.value);

      if (new_budget < 0) {
        setNewBudget(0);
      }
      else if (new_budget < total_expenses) {
        alert('You cannot reduce the budget value lower than the spending amount');
        setNewBudget(budget);
      }
      else if (new_budget > 20000) {
        alert('The budget cannot exceed ' + currency + '20,000')
      }
      else {
        dispatch({
          type: 'SET_BUDGET',
          payload: new_budget
        })
      }
    }, 2000);
  }

  const handleCurrencyChange = (new_currency) => {
    for (let i = 0; i < currencies.length; i++) {
      if (new_currency === currencies[i].value) {
        selectCurrency(currencies[i].label);
      }
    }

    dispatch({
      type: 'CHG_CURRENCY',
      payload: new_currency
    })
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  } 

  return (
    <div className='budget-row'>
      <div className='set-budget'>
        Budget: {currency}
        <input type='number' step='10' onChange={(e) => handleBudgetChange(e)} value={new_budget} />
      </div>

      <div className='budget-remaining'>
        Remaining: {currency}{Number(remaining).toFixed(2)}
      </div>

      <div className='budget-spent'>
        Spent so far: {currency}{Number(total_expenses).toFixed(2)}
      </div>
      <div className='currency-select'>
        <div className='select-control' onClick={() => toggleOptions()}>Currency ({selected_currency})<BiDownArrow style={{ marginLeft: 'auto' }}/></div>

        <div className={showOptions ? 'select-options-container' : 'select-options-container hidden'}>
          {currencies.map(c => <div className='select-option' key={c.value} onClick={() => handleCurrencyChange(c.value)}>{c.label}</div>)}
        </div>
      </div>
    </div>
  )
}