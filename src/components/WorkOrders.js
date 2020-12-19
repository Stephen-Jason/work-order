import { useState } from 'react'

const WorkOrders = () => {

    const [sortBy, setSortBy] = useState('All');
    const [filterBy, setFilterBy] = useState('All');

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
    }

    const sortedBy = (value) => {
        if (value === 'All') {
            return workOrders;
        }
        else if (value === 'Customer') {
            return workOrders.sort((a, b) => a.customerId - b.customerId);
        }
        else if (value === 'Technician') {
            return workOrders.sort((a, b) => a.assignedTechnician - b.assignedTechnician);
        }
        else if (value === 'Date') {
            return workOrders.sort((a, b) => a.dateCreated - b.dateCreated);
        }
    }

    const filteredBy = (cb, value) => {
        if (value === 'All') {
            return workOrders;
        }
        else if (value === 'Open') {
            return cb.filter(item => item.status === 'Open');
        }
        else if (value === 'Closed') {
            return cb.filter(item => item.status === 'Closed');
        }
        else if (value === 'Unclaimed') {
            return cb.filter(item => item.techClaimed === 'Unclaimed');
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
                    <option>Technician</option>
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
                        <label>TECHNICIAN CLAIMED</label>
                        <p className='workOrderInfo'>{item.techClaimed === 'Claimed' ? 'YES' : 'NO'}</p>
                    </div>
                </div>) : <p>no work orders</p>}
        </div>
    )
}

export default WorkOrders;