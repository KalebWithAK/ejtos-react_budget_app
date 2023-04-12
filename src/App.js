import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

//Code to import Budget.js
import Budget from './components/Budget';

// Add code to import the other components here under
import AllocationForm from './components/AllocationForm';

import { AppProvider } from './context/AppContext';
import ExpenseList from './components/ExpenseList';

const App = () => {
    return (
        <AppProvider>
            <div className='container'>
                <h1 className='mt-3'>Company's Budget Allocation</h1>
                    <div className='row mt-3'>
                        <Budget />        

                        {/* Add Remaining component here under */}        

                        {/* Add ExpenseTotal component here under */}        
                       
                        <ExpenseList />         

                        {/* Add ExpenseItem component here under */}        

                        {<AllocationForm />}        

                </div>
            </div>
        </AppProvider>
    );
};
export default App;
