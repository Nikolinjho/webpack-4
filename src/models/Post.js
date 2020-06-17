export default class Post {
    constructor(title, img) {
        this.title = title;
        this.date = new Date();
        this.img = img;
    }
    toString() {
        return JSON.stringify({
            title: this.title,
            img: this.img,
            date: this.date.toJSON()
        }, null, 2)
    }

    get uppercaseTitle(){
        return this.title.toUpperCase()
    }
}