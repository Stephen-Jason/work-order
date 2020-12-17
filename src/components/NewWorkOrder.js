import { useState } from 'react'

const NewWorkOrder = () => {

    const [searchName, setSearchName] = useState('');
    const [customerList, setCustomerList] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(false);
    const [workOrderDescription, setWorkOrderDescription] = useState('');
    const [technician, setTechnician] = useState('Jane');
    const [dateReceived, setDateReceived] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    let customers = JSON.parse(localStorage.getItem('customers'));
    let workOrders = JSON.parse(localStorage.getItem('workOrders'));

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchName') {
            setSearchName(value);
        }
        else if (name === 'newWorkOrderDescription') {
            setWorkOrderDescription(value);
        }
        else if (name === 'newWorkOrderTechnician') {
            setTechnician(value);
        }
        else if (name === 'newWorkOrderDateReceived') {
            setDateReceived(value);
        }
    }

    const handleClick = (e, id) => {
        const { name } = e.target;
        if (name === 'searchNameBtn') {
            let searchResults = customers.filter(item => item.name.toLowerCase().includes(searchName));
            setCustomerList(searchResults);
            document.querySelector('.searchCustomerResultsCon').classList.remove('hide');
            document.querySelector('.newWorkOrderCon').classList.add('hide');
        }
        else if (name === 'selectCustomerBtn') {
            let chosenCustomer = customers.filter(item => item.id === id);
            setSelectedCustomer(chosenCustomer);
            document.querySelector('.newWorkOrderCon').classList.remove('hide');
            document.querySelector('.searchCustomerResultsCon').classList.add('hide');
        }
        else if (name === 'createWorkOrderBtn') {
            setErrorMessage(false);
            setSuccessMessage(false);
            let date = new Date();
            let today = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            if (workOrderDescription && dateReceived) {
                if (workOrders) {
                    let workOrderList = [...workOrders];
                    let workOrdersLength = workOrderList.length;
                    workOrderList.push({
                        customerId: selectedCustomer[0].id,
                        workOrderId: workOrdersLength + 1,
                        workOrderDescription: workOrderDescription,
                        assignedTechnician: technician,
                        dateCreated: today,
                        dateContacted: dateReceived
                    });
                    localStorage.setItem('workOrders', JSON.stringify(workOrderList));
                    setSuccessMessage(`Work Order ID: ${workOrdersLength + 1} was added to the system`);
                    document.querySelector('.newWorkOrderCon').classList.add('hide');
                    setWorkOrderDescription('');
                    setDateReceived('');
                }
                else {
                    //create work orders then push and store to localstorage.
                    let workOrderList = [];
                    workOrderList.push({
                        customerId: selectedCustomer[0].id,
                        workOrderId: 1,
                        workOrderDescription: workOrderDescription,
                        assignedTechnician: technician,
                        dateCreated: today,
                        dateContacted: dateReceived
                    });
                    localStorage.setItem('workOrders', JSON.stringify(workOrderList));
                    setSuccessMessage(`Work Order ID: 1 was added to the system`);
                    document.querySelector('.newWorkOrderCon').classList.add('hide');
                    setWorkOrderDescription('');
                    setDateReceived('');
                }
            }
            else {
                //set error message that fields cant be empty.
                setErrorMessage('Fields cannot be empty, please make sure to choose a date and provide a description');
            }
        }
    }

    return (
        <div>
            {errorMessage ? <div className='error'>{errorMessage}</div> : null}
            {successMessage ? <div className='addedWorkOrderMessage'>{successMessage}</div> : null}
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
                        <label>DATE RECEIVED :</label>
                        <input
                            type='date'
                            name='newWorkOrderDateReceived'
                            className='workOrderInfo'
                            onChange={(e) => handleChange(e)} />
                        <p className='workOrderInfo'>CUSTOMER ID: {item.id}</p>
                        <label>DESCRIPTION</label>
                        <textarea
                            name='newWorkOrderDescription'
                            className='newWorkOrderDescription'
                            value={workOrderDescription}
                            onChange={(e) => handleChange(e)}>
                        </textarea>
                        <label>TECHNICIAN</label>
                        <select
                            name='newWorkOrderTechnician'
                            value={technician}
                            onChange={(e) => handleChange(e)}>
                            <option>Jane</option>
                            <option>Alice</option>
                            <option>Timothy</option>
                        </select>
                        <button
                            name='createWorkOrderBtn'
                            className='createWorkOrderBtn'
                            onClick={(e) => handleClick(e)}>Create Work Order</button>
                    </div>) : null}
            </div>
        </div>
    )
}

export default NewWorkOrder;