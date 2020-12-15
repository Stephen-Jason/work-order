
class Auth {
    constructor(){
        this.authenticated = false;
    }

    login(username, password){
        if(username == 'stephen' && password == '1234'){
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