const db = require("../config/database");
const Product = require("../models/product");

module.exports = class Product {
    constructor(title, description, price, imageUrl) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    save(){
        return db.execute(`INSERT INTO products (title, description, price, imageUrl) VALUES(?, ?, ?, ?)`,[this.title, this.description, this.price, this.imageUrl]);
    }

    static retrieve(id){
        return db.execute(`SELECT * FROM products WHERE id = ${id}`);
    }

    static list(){
        return db.execute("SELECT * FROM products");
    }

    static destroy(id){
        return db.execute(`DELETE FROM products WHERE id=${id}`);
    }

    static update(id, title, description, price, imageUrl){
        return db.execute(`UPDATE products set title = ?, description = ?, price = ?, imageUrl = ? WHERE id = ?`, [title,description,price,imageUrl, id]);
    }
}