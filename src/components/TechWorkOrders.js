import { useState, useEffect } from 'react'

const TechWorkOrders = (props) => {

    const [sortBy, setSortBy] = useState('All');
    const [filterBy, setFilterBy] = useState('All');
    const [displayWorkOrders, setDisplayWorkOrders] = useState(JSON.parse(localStorage.getItem('workOrders')).filter(item => item.assignedTechnician === props.name));
    const [resoloutionDescription, setResoloutionDescription] = useState('');

    let workOrders = [...displayWorkOrders];
    let technician = props.name;
    let customers = JSON.parse(localStorage.getItem('customers'));

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'sortBy') {
            setSortBy(value);
        }
        else if (name === 'filterBy') {
            setFilterBy(value);
        }
    }

    const handleClick = (e, id) => {
        const { name } = e.target;
        if (name === 'claim') {
            let date = new Date();
            let today = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            let workOrdersList = [...workOrders];
            let curWorkOrder = workOrdersList.filter(item => item.workOrderId === id);
            let index = workOrdersList.indexOf(curWorkOrder[0]);
            curWorkOrder[0].techClaimed = 'Claimed';
            curWorkOrder[0].techClaimedDate = today;
            workOrdersList.splice(index, 1, curWorkOrder[0]);
            localStorage.setItem('workOrders', JSON.stringify(workOrdersList));
            setDisplayWorkOrders(JSON.parse(localStorage.getItem('workOrders')).filter(item => item.assignedTechnician === props.name));
        }
        else if (name === 'resoloutionBtn') {
            let resoloutionDescription = document.querySelector(`.resoloutionDescription-${id}`);
            let date = new Date();
            let today = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            let workOrdersList = [...workOrders];
            let curWorkOrder = workOrdersList.filter(item => item.workOrderId === id);
            let index = workOrdersList.indexOf(curWorkOrder[0]);
            curWorkOrder[0].resolvedDescription = resoloutionDescription.value;
            curWorkOrder[0].resolvedDate = today;
            curWorkOrder[0].status = 'Closed';
            workOrdersList.splice(index, 1, curWorkOrder[0]);
            localStorage.setItem('workOrders', JSON.stringify(workOrdersList));
            setDisplayWorkOrders(JSON.parse(localStorage.getItem('workOrders')).filter(item => item.assignedTechnician === props.name));
        }
    }

    const getCustomerInfo = (id) => {
        let customer = customers.filter(item => item.id === id);
        return customer[0];
    }

    const sortedBy = (value) => {
        if (value === 'All') {
            return workOrders;
        }
        else if (value === 'Customer') {
            return workOrders.sort((a, b) => a.customerId - b.customerId);
        }
        else if (value === 'Date') {
            return workOrders.sort((a, b) => a.dateCreated - b.dateCreated);
        }
    }

    const filteredBy = (sortBy, value) => {
        if (value === 'All') {
            return workOrders.filter(item => item.assignedTechnician === technician);
        }
        else if (value === 'Open') {
            return sortBy.filter(item => item.status === 'Open' && item.assignedTechnician === technician);
        }
        else if (value === 'Closed') {
            return sortBy.filter(item => item.status === 'Closed' && item.assignedTechnician === technician);
        }
        else if (value === 'Unclaimed') {
            return sortBy.filter(item => item.techClaimed === 'Unclaimed' && item.assignedTechnician === technician);
        }
        else if (value === 'Claimed') {
            return sortBy.filter(item => item.techClaimed === 'Claimed' && item.assignedTechnician === technician);
        }
    }


    return (
        <div>
            <div className='workOrderSelectCon'>
                <select
                    name='sortBy'
                    value={sortBy}
                    onChange={(e) => handleChange(e)}>
                    <option>All</option>
                    <option>Customer</option>
                    <option>Date</option>
                </select>
                <select
                    name='filterBy'
                    value={filterBy}
                    onChange={(e) => handleChange(e)}>
                    <option>All</option>
                    <option>Open</option>
                    <option>Closed</option>
                    <option>Unclaimed</option>
                    <option>Claimed</option>
                </select>
            </div>
            {workOrders ? filteredBy(sortedBy(sortBy), filterBy).map(item =>
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
                        {item.techClaimed !== 'Claimed' ?
                            <button
                                name='claim'
                                className='claimOrderBtn'
                                onClick={(e) => handleClick(e, item.workOrderId)}>Claim Order</button> :
                            <div>
                                <label>CLAIMED</label>
                                <p className='workOrderInfo'>{item.techClaimedDate}</p>
                            </div>}
                        {!item.resolvedDescription && item.techClaimed ?
                            <div>
                                <label>RESOLOUTION</label>
                                <textarea
                                    name='resoloutionDescription'
                                    className={`resoloutionDescription-${item.workOrderId}`}></textarea>
                                <button
                                    name='resoloutionBtn'
                                    className='resoloutionBtn'
                                    onClick={(e) => handleClick(e, item.workOrderId)}>Resolve Order</button>
                            </div> :
                            <div>
                                <label>RESOLOUTION DATE</label>
                                <p className='workOrderInfo'>>{item.resolvedDate}</p>
                                <label>RESOLOUTION DESCRIPTION</label>
                                <p className='workOrderInfo'>>{item.resolvedDescription}</p>
                            </div>}
                    </div>
                </div>) : <p>no work orders</p>}
        </div>
    )
}

export default TechWorkOrders;

// filter the items 
// put the filtered list into state
// map out the items based on state