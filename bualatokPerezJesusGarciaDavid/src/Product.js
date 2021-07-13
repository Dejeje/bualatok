export default class Product {
    constructor(name, price, description, photo, date, category, state) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.photo = photo;
        this.data = date;
        this.category = category;
        this.state = state;
        this.timesSeen = 0;
    }
}
