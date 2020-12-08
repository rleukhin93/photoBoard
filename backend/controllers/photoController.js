const Photo = require('../models/photos');
const fs = require('fs');
const Stream = require('stream');
const path = require("path");
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const photoController = {
    get: async (req, res, next) => {
        try {
            return res.send((await Photo.find({board: req.params.boardId})))
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const donwloads = await Promise.all(req.body.map( element => {
                return axios.get(element.url, {
                    responseType: 'stream'
                })
                .then(response => {
                    const path = `uploads/${uuidv4()}`;
                    response.data.pipe(fs.createWriteStream(path));
                    return {
                        url: element.url,
                        tags: element.tags,
                        board: req.params.boardId,
                        path: path
                    }
                })
            }));
            await Photo.create(donwloads);
            return res.send((await Photo.find({board: req.params.boardId})));
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const updatedPhoto = await Photo.findOne({ _id: req.params.id});
            updatedPhoto.tags = req.body.tags;
            await updatedPhoto.save();
            return res.send((await Photo.find({board: req.params.boardId})))
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    "delete": async (req, res, next) => {
        try {
            await Photo.findOneAndDelete({ _id: req.params.id});
            return res.send((await Photo.find({board: req.params.boardId})))
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getImage: async (req, res, next) => {
        try {
            const photo = await Photo.findOne({_id: req.params.id});
            const file = fs.createReadStream(  photo.path )
            const passThrough = new Stream.PassThrough()
            Stream.pipeline(
            file,
            passThrough,
            (err) => {
                if (err) {
                console.log(err) // No such file or any other kind of error
                return next(err); 
                }
            });

            return passThrough.pipe(res);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    tagging: async (req, res, next) => {
        try {
            const apiRequest = await Promise.allSettled(
                req.body.map( async(url,index) => {
                    return await new Promise( (resolve, reject) => setTimeout( () =>{
                        console.log(`Promise ${index}`, index*500);
                        return resolve(
                            axios.get(`https://api.imagga.com/v2/tags?image_url=${url}`, { 
                                auth: {
                                    username: process.env.API_KEY,
                                    password: process.env.API_SECRET
                                }
                            })
                            .then(response => ({
                                image: url,
                                tags: response.data.result
                            }))
                            .catch( error => ({
                                error: error.response.data
                            }))
                            )
                    }, 
                        index*500,
                    ));
                    }));
            return res.send(apiRequest);
        }
        catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = photoController;