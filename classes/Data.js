module.exports = class Data {
    constructor() {
        this.events = [];
        this.users = [];
    }

    addUser(user) {
        for (let u of this.users) {
            if (u.pseudo === user.pseudo) {
                return false;
            }
        }
        this.users.push(user);
        return true;
    }

    delUser(user, pass) {
        let out = [];
        for (let u of this.users) {
            if (u.pseudo !== user.pseudo && u.connect(pass)) {
                out.push(u);
            }
        }
        this.users = out;
    }

    addEvent(event) {
        this.events.push(event);
    }

    delEvent(event) {
        let out = [];
        for (let e of this.events) {
            if (e.tCreate !== event.tCreate) {
                out.push(e);
            }
        }
        this.events = out;
    }

    getEvent(tCreate) {
        for (let i = 0; i < this.events.lenght; ++i) {
            if (tCreate === this.events[i].tCreate) {
                return this.events[i];
            }
        }
        return false;
    }

    getUser(pseudo) {
        for (let i = 0; i < this.users.lenght; ++i) {
            if (pseudo === this.users[i].pseudo) {
                return this.users[i];
            }
        }
        return false;
    }
}