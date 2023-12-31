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
                err.message || "Algo deu errado na criação do item."
        });
    });
};


exports.findAll = (req, res) => {
    const name = req.body.name;
    var condition = name ? { name: { [Op.like]: `%${name}%`} } :null;

    Item.findAll({where: condition})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Deu b.o na listagem dos item."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Item.findByPk(id)
      .then(data => {
          if (data) {
              res.send(data);
          } else {
              res.status(404).send({
                  message: `Não foi possível encontrar um item com o id=${id}.`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Ocorreu um erro ao tentar encontrar um item com o id=" + id
          });
      });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Item.update(req.body, {
        where: {id: id}
    })
      .then(num => {
          if(num == 1 ){
              res.send({
                  message: "Deu bom na atualização do item."
              });
          } else {
              res.send({
                  message: `Não foi possível atualizar o item com o id=${id}.`
              });
          } 
      })
      .catch(err => {
          res.status(500).send({
              message: "Algum erro ocorreu ao tentar atualizar o item com o id=" + id
          });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Item.destroy({
        where: { id: id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "O item foi excluído com sucesso!"
            });
        } else { 
            res.send({
                message: `Não foi possivel excluir o item com o id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Ocorreu um erro ao tentar apagar o item com o id= " + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Item.destroy({
        where: {},
        truncate: false
    })
     .then(nums => {
         res.send({message: `${nums} Itens foram apagados com sucesso.`});
     })
     .catch(err => {
         res.status(500).send({
             message:
             err.message || "Algum erro ocorreu ao tentar apagar todos os itens."
         });
     });
};

exports.findAllFlammabes = (req, res) => {
    Item.findAllFlammabes({ where: { isFlammable: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => { 
        res.status(500).send({
            message:
            err.message || "Algum erro ocorreu ao tentar pesquisar todos os itens inflamáveis."
        });
    });
};
