import { useState } from 'react'

const NewWorkOrder = () => {

    const [searchName, setSearchName] = useState('');
    const [customerList, setCustomerList] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(false);

    let customers = JSON.parse(localStorage.getItem('customers'));

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchName') {
            setSearchName(value);
        }
    }

    const handleClick = (e, id) => {
        const { name } = e.target;
        if (name === 'searchNameBtn') {
            let searchResults = customers.filter(item => item.name.toLowerCase().includes(searchName));
            setCustomerList(searchResults);
        }
        else if (name === 'selectCustomerBtn') {
            let chosenCustomer = customers.filter(item => item.id === id);
            setSelectedCustomer(chosenCustomer);
            document.querySelector('.searchCustomerResultsCon').classList.add('hide');
        }
    }

    return (
        <div>
            <div className='customerSearchCon'>
                <input
                    className='customerSearchInput'
                    name='searchName'
                    type='text'
                    onChange={(e) => handleChange(e)}
                    placeholder='search customer name' />
                <button
                    name='searchNameBtn'
                    value={searchName}
                    onClick={(e) => handleClick(e)}
                    className='customerSearchBtn'
                >Search</button>
            </div>
            <div className='searchCustomerResultsCon'>
                {
                    customerList ?
                        customerList.map(item =>
                            <div key={item.id}>
                                <p>NAME : {item.name}</p>
                                <p>SURNAME : {item.surname}</p>
                                <p>TELEPHONE : {item.telephone}</p>
                                <p>ADDRESS : {item.address}</p>
                                <p>ID : {item.id}</p>
                                <button
                                    name='selectCustomerBtn'
                                    className='selectCustomerBtn'
                                    onClick={(e) => handleClick(e, item.id)}>Select Customer</button>
                            </div>) : <p>No results found</p>
                }
            </div>
            <div className='newWorkOrderCon'>
                {selectedCustomer ? selectedCustomer.map(item =>
                    <div className='newWorkOrder' key={item.id}>
                        <p className='workOrderInfo'>NAME: {item.name}</p>
                        <p className='workOrderInfo'>SURNAME: {item.surname}</p>
                        <p className='workOrderInfo'>TELEPHONE: {item.telephone}</p>
                        <p className='workOrderInfo'>ADDRESS: {item.address}</p>
                        <p className='workOrderInfo'>DATE: {item.signUpDate}</p>
                        <p className='workOrderInfo'>CUSTOMER ID: {item.id}</p>
                    </div>) : null}
            </div>
        </div>
    )
}

export default NewWorkOrder;