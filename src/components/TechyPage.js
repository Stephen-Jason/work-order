import logout from '../logout.png'


const TechyPage = (props) => {
    return(
        <div>
            <header className='pageHeader'>
                <p className='pageHeaderText'>{props.name}</p>
                <div className='logoutCon'>
                    <img className='logoutPic' src={logout} alt='logout'/>
                    <button>Logout</button>
                </div>
            </header>
        </div>
    )
}

export default TechyPage;