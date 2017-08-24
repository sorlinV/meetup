class User {
    constructor(pseudo, pass, salt = null) {
        this.pseudo = pseudo;
        this.salt = salt;
        this.pass = pass;
        if (salt === null) {
            this.salt = math.Random();
            this.pass = md5(pass + this.salt);
        }
    }

    connect(pass) {
        if (md5(pass + this.salt) === this.pass) {
            return true;
        }
        return false;
    }
}