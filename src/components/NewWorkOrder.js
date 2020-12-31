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
            setSuccessMessage(false);
            setErrorMessage(false);
            document.querySelector('.searchCustomerResultsCon').classList.remove('hide');
            let newWorkOrderCon = document.querySelector('.newWorkOrderCon');
            if (newWorkOrderCon) {
                newWorkOrderCon.classList.add('hide');
            }
        }
        else if (name === 'selectCustomerBtn') {
            let chosenCustomer = customers.filter(item => item.id === id);
            setSelectedCustomer(chosenCustomer);
            let newWorkOrderCon = document.querySelector('.newWorkOrderCon');
            if (newWorkOrderCon) {
                newWorkOrderCon.classList.remove('hide');
            }
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
                        dateContacted: dateReceived,
                        status: 'Open',
                        techClaimed: 'Unclaimed',
                        resolvedDate: false,
                        resolvedDescription: false
                    });
                    localStorage.setItem('workOrders', JSON.stringify(workOrderList));
                    setSuccessMessage(`Work Order ID: ${workOrdersLength + 1} was added to the system`);
                    let newWorkOrderCon = document.querySelector('.newWorkOrderCon');
                    if (newWorkOrderCon) {
                        newWorkOrderCon.classList.add('hide');
                    }
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
                        dateContacted: dateReceived,
                        status: 'Open',
                        techClaimed: 'Unclaimed'
                    });
                    localStorage.setItem('workOrders', JSON.stringify(workOrderList));
                    setSuccessMessage(`Work Order ID: 1 was added to the system`);
                    let newWorkOrderCon = document.querySelector('.newWorkOrderCon');
                    if (newWorkOrderCon) {
                        newWorkOrderCon.classList.add('hide');
                    }
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
                            <div className='customerCon' key={item.id}>
                                <p className='customerInfo'>NAME : {item.name}</p>
                                <p className='customerInfo'>SURNAME : {item.surname}</p>
                                <p className='customerInfo'>TELEPHONE : {item.telephone}</p>
                                <p className='customerInfo'>ADDRESS : {item.address}</p>
                                <p className='customerInfo'>ID : {item.id}</p>
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
                        <div>
                            <label>NAME</label>
                            <p className='workOrderInfo'>{item.name}</p>
                        </div>
                        <div>
                            <label>SURNAME</label>
                            <p className='workOrderInfo'>{item.surname}</p>
                        </div>
                        <div>
                            <label>TELEPHONE</label>
                            <p className='workOrderInfo'>{item.telephone}</p>
                        </div>
                        <div>
                            <label>ADDRESS</label>
                            <p className='workOrderInfo'>{item.address}</p>
                        </div>
                        <div>
                            <label>CUSTOMER ID</label>
                            <p className='workOrderInfo'>{item.id}</p>
                        </div>
                        <div>
                            <label>DATE RECEIVED</label>
                            <input
                                type='date'
                                name='newWorkOrderDateReceived'
                                className='workOrderInfo'
                                value={dateReceived}
                                onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <label>DESCRIPTION</label>
                            <textarea
                                name='newWorkOrderDescription'
                                className='newWorkOrderDescription'
                                value={workOrderDescription}
                                onChange={(e) => handleChange(e)}
                                cols='40'
                                rows='5'>
                            </textarea>
                        </div>
                        <div>
                            <label>TECHNICIAN</label>
                            <select
                                name='newWorkOrderTechnician'
                                value={technician}
                                onChange={(e) => handleChange(e)}>
                                <option>Jane</option>
                                <option>Alice</option>
                                <option>Timothy</option>
                            </select>
                        </div>
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