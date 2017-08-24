module.exports = class Data {
    constructor() {
        this.events = [];
        this.users = [];
    }

    adduser(user) {
        for (let u of this.users) {
            if (u.pseudo === user.pseudo) {
                return false;
            }
        }
        this.users.push(user);
        return true;
    }

    deluser(user, pass) {
        let out = [];
        for (let u of this.users) {
            if (u.pseudo !== user.pseudo && u.connect(pass)) {
                out.push(u);
            }
        }
        this.users = out;
    }

    addevent(event) {
        this.events.push(event);
    }

    delevent(event) {
        let out = [];
        for (let e of this.events) {
            if (e.tCreate !== event.tCreate) {
                out.push(e);
            }
        }
        this.events = out;
    }
}