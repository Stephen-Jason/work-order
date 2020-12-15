
class Auth {
    constructor(){
        this.authenticated = false;
    }

    login(username, password){
        if(username === 'Admin' && password === '1234'){
            this.authenticated = true;
            return true;
        }
        else if(username === 'Jane' && password === '1234'){
            this.authenticated = true;
            return true;
        }
        else if(username === 'Alice' && password === '1234'){
            this.authenticated = true;
            return true;
        }
        else if(username === 'Timothy' && password === '1234'){
            this.authenticated = true;
            return true;
        }
    }

    logout(){
        this.authenticated = false;
    }

    isAuth(){
        return this.authenticated;
    }
}

export default new Auth();