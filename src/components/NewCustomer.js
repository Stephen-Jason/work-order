import { useState } from 'react'

const NewCustomer = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [telephone, setTelephone] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const customers = JSON.parse(localStorage.getItem('customers'));

    const handleClick = () => {
        if (name && surname && telephone && address) {
            setErrorMessage(false);
            setSuccessMessage(false);
            if (customers) {
                let customersList = [...customers];
                let customersLength = customersList.length;
                let date = new Date();
                let today = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                customersList.push(
                    {
                        id: customersLength + 1,
                        name: name,
                        surname: surname,
                        telephone: telephone,
                        address: address,
                        signUpDate: today
                    });
                localStorage.setItem('customers', JSON.stringify(customersList));
                setSuccessMessage(`${name} ${surname} has been added to the system`);
            }
            else {
                let customersList = [];
                let date = new Date();
                let today = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                customersList.push(
                    {
                        id: 1,
                        name: name,
                        surname: surname,
                        telephone: telephone,
                        address: address,
                        signUpDate: today
                    });
                localStorage.setItem('customers', JSON.stringify(customersList));
                setSuccessMessage(`${name} ${surname} has been added to the system`);
            }
        }
        else {
            setErrorMessage('Please fill out all fields');
            setSuccessMessage(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        }
        else if (name === 'surname') {
            setSurname(value);
        }
        else if (name === 'telephone') {
            setTelephone(value);
        }
        else if (name === 'address') {
            setAddress(value);
        }
    }


    return (

        <div className='newCustomerCon'>
            {errorMessage ? <div className='error'>{errorMessage}</div> : null}
            <div>
                <label className='customerLabel'>Name</label>
                <input
                    type='text'
                    className='customerInput'
                    name='name'
                    value={name}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label className='customerLabel'>Surname</label>
                <input
                    type='text'
                    className='customerInput'
                    name='surname'
                    value={surname}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label className='customerLabel'>Telephone</label>
                <input
                    type='tel'
                    className='customerInput'
                    name='telephone'
                    value={telephone}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label className='customerLabel'>Address</label>
                <input
                    type='text'
                    className='customerInput'
                    name='address'
                    value={address}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <button
                className='addCustomerBtn'
                onClick={() => handleClick()}>Add Customer</button>
            {successMessage ? <div className='addedCustomerMessage'>{successMessage}</div> : null}
        </div>

    )
}

export default NewCustomer;