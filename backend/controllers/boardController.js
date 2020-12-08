const Board = require('../models/board');

const photoController = {
    get: async (req, res, next) => {
        try {
            return res.send((await Board.find()))
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            await Board.create(req.body);
            return res.send((await Board.find()))
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const updatedBoard = await Board.find({ _id: req.params.id});
            updatedBoard.name = req.body.name;
            await updatedBoard.save();
            return res.send((await Board.find()))
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    "delete": async (req, res, next) => {
        try {
            await Board.findOneAndDelete({ _id: req.params.id});
            return res.send((await Board.find()))
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = photoController;