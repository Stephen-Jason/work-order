import { useState } from 'react'
import auth from './auth'
import { useHistory } from 'react-router-dom'

const LoginPage = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        }
        else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleClick = () => {
        if (auth.login(username, password)) {
            history.push(`/home/${username}`);
        }
    }

    return (
        <div className='loginPage'>
            <div className='users'>
                <p className='userInfo'>User Name: Admin <br></br> Password: 1234</p>
                <p className='userInfo'>User Name: Jane <br></br> Password: 1234</p>
                <p className='userInfo'>User Name: Alice <br></br> Password: 1234</p>
                <p className='userInfo'>User Name: Timothy <br></br> Password: 1234</p>
            </div>
            <form className='loginForm'>
                <label className='loginLabel'>User Name</label>
                <input
                    type='text'
                    placeholder='User Name'
                    required
                    className='loginUser'
                    name='username'
                    value={username}
                    onChange={(e) => handleChange(e)}></input>
                <label className='loginLabel'>Password</label>
                <input
                    type='password'
                    placeholder='Password'
                    required
                    className='loginPassword'
                    name='password'
                    value={password}
                    onChange={(e) => handleChange(e)}></input>
                <button 
                className='loginSubmitBtn'
                onClick={handleClick}>Login</button>
            </form>


        </div>

    );
}

export default LoginPage;