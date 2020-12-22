
class Auth {
    constructor() {
        this.authenticated = false;
        this.user = '';
    }

    login(username, password) {
        if (username === 'SuperAdmin' && password === '1234') {
            this.authenticated = true;
            this.user = 'SuperAdmin';
            return true;
        }
        else if (username === 'Admin' && password === '1234') {
            this.authenticated = true;
            this.user = 'Admin';
            return true;
        }
        else if (username === 'Jane' && password === '1234') {
            this.authenticated = true;
            this.user = 'Jane';
            return true;
        }
        else if (username === 'Alice' && password === '1234') {
            this.authenticated = true;
            this.user = 'Alice';
            return true;
        }
        else if (username === 'Timothy' && password === '1234') {
            this.authenticated = true;
            this.user = 'Timothy';
            return true;
        }
    }

    logout() {
        this.authenticated = false;
    }

    isAuth() {
        return this.authenticated;
    }
    getUser() {
        return this.user;
    }
}

export default new Auth();