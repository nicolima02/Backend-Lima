const fs = require('fs');
const path = require("path")

const file = path.resolve(__dirname, "../../productos.txt")
//Esto solo va a funcionar si el archivo ya existe
class Productos {
    constructor(nombreArchivo) {
    this.archivo = nombreArchivo;
}

async getData() {
    const data = await fs.promises.readFile(this.archivo, 'utf-8'); //data = '[]'
    return JSON.parse(data);
}

async saveData(data) {
    await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, '\t'));
}

async save(miObjeto) {
    const productos = await this.getData();
    const id = (productos[productos.length-1].id)+1

    const productoNuevo = {
        title: miObjeto.title,
        price: miObjeto.price,
        thumbnail: miObjeto.thumbnail,
        codigo: miObjeto.codigo,
        desc: miObjeto.desc,
        stock: miObjeto.stock,
        timestamp: miObjeto.timestamp,
        id
    };

    productos.push(productoNuevo);

    await this.saveData(productos);

    return productoNuevo;
}


async getAll() {
    const productos = await this.getData();

    return productos;
}

async deleteById(number) {
    const productos = await this.getData();

    const nuevoArray = productos.filter(
        (unProducto) => unProducto.id != number
    );

    await this.saveData(nuevoArray);
}

async deleteAll() {
    const nuevo = [];

    await this.saveData(nuevo);
}

async Update(id, nuevaData) {
    const productos = await this.getAll();

    const indice = productos.findIndex((unProducto) => unProducto.id === id);

    if (indice < 0) throw new Error('no existe el producto');

    const productUpdated = {
        id,
        ...nuevaData,
    };

    productos.splice(indice, 1, productUpdated);

    await this.saveData(productos);

    return productUpdated;
}
}

const ProductosController = new Productos('productos.txt');

module.exports = {
    ProductosController: ProductosController,
};