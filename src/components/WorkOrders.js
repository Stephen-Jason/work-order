import { useState } from 'react'

const WorkOrders = () => {

    const [sortBy, setSortBy] = useState('All');
    const [filterBy, setFilterBy] = useState('All');
    const [searchBy, setSearchBy] = useState('Customer Name');
    const [searchInput, setSearchInput] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    let workOrders = JSON.parse(localStorage.getItem('workOrders'));
    let customers = JSON.parse(localStorage.getItem('customers'));

    const getCustomerInfo = (id) => {
        let customer = customers.filter(item => item.id === id);
        return customer[0];
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'sortBy') {
            setSortBy(value);
        }
        else if (name === 'filterBy') {
            setFilterBy(value);
        }
        else if (name === 'searchBy') {
            setSearchBy(value);
        }
        else if (name === 'searchInput') {
            setSearchInput(value);
        }
    }

    //will return a sorted array based on sort preference
    const sortedBy = (array) => {
        if (sortBy === 'All') {
            return array;
        }
        else if (sortBy === 'Customer') {
            return array.sort((a, b) => a.customerId - b.customerId);
        }
        else if (sortBy === 'Technician') {
            return array.sort((a, b) => a.assignedTechnician - b.assignedTechnician);
        }
        else if (sortBy === 'Date') {
            return array.sort((a, b) => a.dateCreated - b.dateCreated);
        }
    }
    //will return an array of workorders based on status chosen
    const filteredBy = (array) => {
        if (filterBy === 'All') {
            return array;
        }
        else if (filterBy === 'Open') {
            return array.filter(item => item.status === 'Open');
        }
        else if (filterBy === 'Closed') {
            return array.filter(item => item.status === 'Closed');
        }
        else if (filterBy === 'Unclaimed') {
            return array.filter(item => item.techClaimed === 'Unclaimed');
        }
    }

   

    //will return an array of workorders based on search input
    const handleSearchInputFiltering = () => {
        if (searchInput) {
            if (searchBy === 'Customer Name') {
                let searchInputCustomerNameResults = customers.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));
                let searchInputCustomerIds = searchInputCustomerNameResults.map(item => item.id);
                let arrayOfWorkOrders = [];
                searchInputCustomerIds.forEach(index => { arrayOfWorkOrders.push(...workOrders.filter(item => item.customerId === index)) });
                if (arrayOfWorkOrders) {
                   return arrayOfWorkOrders;
                }
                else {
                    setErrorMessage('No results found, try another field or check input');
                    return workOrders;
                }
            }
            else if(searchBy === 'Customer ID'){
                let searchInputCustomerIdResults = customers.filter(item=>item.id.toString().includes(searchInput.toString()));
                let searchInputCustomerIds = searchInputCustomerIdResults.map(item=>item.id);
                let arrayOfWorkOrders = [];
                searchInputCustomerIds.forEach(index=>{arrayOfWorkOrders.push(...workOrders.filter(item=>item.customerId === index))});
                if (arrayOfWorkOrders) {
                    return arrayOfWorkOrders;
                }
                else {
                    setErrorMessage('No results found, try another field or check input');
                    return workOrders;
                }
            }
            else if(searchBy === 'Work Order ID'){
                let searchInputWorkOrderIdResults = workOrders.filter(item=>item.workOrderId.toString().includes(searchInput.toString()));
                if (searchInputWorkOrderIdResults) {
                    return searchInputWorkOrderIdResults;
                }
                else {
                    setErrorMessage('No results found, try another field or check input');
                    return workOrders;
                }
            }
        }
        else {
            return workOrders;
        }
    }

    return (
        <div>
            <div className='workOrderSelectCon'>
                <label>Filter Options</label>
                <select
                    name='filterBy'
                    value={filterBy}
                    onChange={(e) => handleChange(e)}>
                    <option>All</option>
                    <option>Open</option>
                    <option>Closed</option>
                    <option>Unclaimed</option>
                </select>
                <label>Sorting Options</label>
                <select
                    name='sortBy'
                    value={sortBy}
                    onChange={(e) => handleChange(e)}>
                    <option>All</option>
                    <option>Customer</option>
                    <option>Technician</option>
                    <option>Date</option>
                </select>
            </div>
            <div className='workOrderSearchCon'>
                <select
                    name='searchBy'
                    value={searchBy}
                    onChange={(e) => handleChange(e)}>
                    <option>Customer Name</option>
                    <option>Customer ID</option>
                    <option>Work Order ID</option>
                </select>
                <input
                    type='text'
                    name='searchInput'
                    value={searchInput}
                    onChange={(e) => handleChange(e)} />
            </div>
            {workOrders ? sortedBy(filteredBy(handleSearchInputFiltering())).map(item =>
                <div className='workOrderCon' key={item.workOrderId}>
                    <div>
                        <label>CUSTOMER</label>
                        <p className='workOrderInfo'>{getCustomerInfo(item.customerId).name} {getCustomerInfo(item.customerId).surname}</p>
                    </div>
                    <div>
                        <label>CUSTOMER ID</label>
                        <p className='workOrderInfo'>{item.customerId}</p>
                    </div>
                    <div>
                        <label>DATE RECEIVED</label>
                        <p className='workOrderInfo'>{item.dateContacted}</p>
                    </div>
                    <div>
                        <label>DATE CREATED</label>
                        <p className='workOrderInfo'>{item.dateCreated}</p>
                    </div>
                    <div>
                        <label>TECHNICIAN</label>
                        <p className='workOrderInfo'>{item.assignedTechnician}</p>
                    </div>
                    <div>
                        <label>DESCRIPTION</label>
                        <p className='workOrderInfo'>{item.workOrderDescription}</p>
                    </div>
                    <div>
                        <label>WORK ORDER ID</label>
                        <p className='workOrderInfo'>{item.workOrderId}</p>
                    </div>
                    <div>
                        <label>STATUS</label>
                        <p className='workOrderInfo'>{item.status}</p>
                    </div>
                    <div>
                        <label>TECHNICIAN CLAIMED</label>
                        <p className='workOrderInfo'>{item.techClaimed === 'Claimed' ? 'YES' : 'NO'}</p>
                    </div>
                </div>) : <p>no work orders</p>}
        </div>
    )
}

export default WorkOrders;

/*
    
    
 */

/*
outline: Have a function that returns an array of the work orders based on the filter and search options.
step 1) Need to filter array based on any search input.
step 2) Need to filter array based on the sorted and filtered values from the dropdown selectors.
step 3) Return the filtered array.
*/