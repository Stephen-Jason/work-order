import { useParams } from 'react-router-dom'
import { useState } from 'react'

const CustomerEdit = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [telephone, setTelephone] = useState('');
    const [address, setAddress] = useState('');
    const [signUpDate, setSignUpDate] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    const id = useParams();

    const customers = JSON.parse(localStorage.getItem('customers'));

    let curCustomer = customers.filter(item => item.id === parseInt(id.id));

    const handleChange = (e) => {
        const {name,value} = e.target;
        if(name === 'name'){
            setName(value);
        }
        else if(name === 'surname'){
            setSurname(value);
        }
        else if(name === 'telephone'){
            setTelephone(value);
        }
        else if(name === 'address'){
            setAddress(value);
        }
        else if(name === 'signUpDate'){
            setSignUpDate(value);
        }
    }

    const handleClick = () => {
        let customersCopy = [...customers];
        let customer = [...curCustomer];
        let index = customers.indexOf(curCustomer[0]);
        if(name){
            customer[0].name = name;
        }
        if(surname){
            customer[0].surname = surname;
        }
        if(telephone){
            customer[0].telephone = telephone;
        }
        if(address){
            customer[0].address = address;
        }
        if(signUpDate){
            customer[0].signUpDate = signUpDate;
        }
        customersCopy.splice(index,1,customer[0]);
        localStorage.setItem('customers', JSON.stringify(customersCopy));
        setSuccessMessage(`Customer ${id.id} information has been updated`);
        setName('');
        setSurname('');
        setTelephone('');
        setAddress('');
        setSignUpDate('');
    }

    return (
        <div>
            {successMessage ? <p className='successMessage'>{successMessage}</p> : null}
            {curCustomer ? curCustomer.map(item =>
                <div className='customerCon' key={item.id}>
                    <p className='customerInfo'>NAME: {item.name}</p>
                    <input
                    name='name'
                    value={name}
                    onChange={(e)=>handleChange(e)}/>
                    <p className='customerInfo'>SURNAME: {item.surname}</p>
                    <input
                    name='surname'
                    value={surname}
                    onChange={(e)=>handleChange(e)}/>
                    <p className='customerInfo'>TELEPHONE: {item.telephone}</p>
                    <input
                    name='telephone'
                    value={telephone}
                    onChange={(e)=>handleChange(e)}/>
                    <p className='customerInfo'>ADDRESS: {item.address}</p>
                    <input
                    name='address'
                    value={address}
                    onChange={(e)=>handleChange(e)}/>
                    <p className='customerInfo'>SIGN UP DATE: {item.signUpDate}</p>
                    <input
                    name='signUpDate'
                    value={signUpDate}
                    onChange={(e)=>handleChange(e)}/>
                    <p className='customerInfo'>CUSTOMER ID: {item.id}</p>
                    <button
                    onClick={()=>handleClick()}>Save Changes</button>
                </div>) : <p>something went wrong</p>}
        </div>
    )
}

export default CustomerEdit;