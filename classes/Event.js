class Event {
    constructor(title, author, date, desc) {
        this.title = title;
        this.author = author;
        this.date = date;
        this.desc = desc;
        let currentdate = new Date();
        this.tCreate = currentdate.today() + " " + currentdate.timeNow();
    }
}