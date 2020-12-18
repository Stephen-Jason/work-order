
const WorkOrders = () => {

    let workOrders = JSON.parse(localStorage.getItem('workOrders'));

    return (
        <div>
            {workOrders ? workOrders.map(item =>
                <div className='workOrderCon'>
                    <p className='workOrderInfo'>DATE RECEIVED: {item.dateContacted}</p>
                    <p className='workOrderInfo'>DATE CREATED: {item.dateCreated}</p>
                    <p className='workOrderInfo'>TECHNICIAN: {item.assignedTechnician}</p>
                    <p className='workOrderInfo'>DESCRIPTION: {item.workOrderDescription}</p>
                    <p className='workOrderInfo'>WORK ORDER ID: {item.workOrderId}</p>
                </div>) : <p>no work orders</p>}
        </div>
    )
}

export default WorkOrders;