const db = require ("../models");
const Item = db.items;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Tá vazio, meu camarada, preenche aí!"
        });
        return;
    }

    const item = {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        is_flammable: req.body.is_flammable ? req.body.is_flammable: false
    }

    Item.create(item)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Deu b.o na criação do item."
        })
    })
};


exports.findAll = (req, res) => {
    const name = req.body.name;
    var condition = name ? { name: { [Op.like]: `%${name}%`} } :null;

    items.findAll({where: condition})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Deu b.o na listagem dos item."
        })
    })
};

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};

exports.findAllFlammabes = (req, res) => {

};
