const Concerts = require('../models/concerts.model');


exports.getAll = async (req, res) =>{
    try{
        res.json(await Concerts.find());
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.getRandom = async (req, res) => {
    try{
        const count = await Concerts.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const concerts = await Concerts.findOne().skip(rand);
        if(!concerts) res.status(404).json({message: 'Not found'});
        else res.json(concerts);
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.getById = async (req, res) => {
    try{
        const concerts = await Concerts.findById(req.params.id);
        if(!concerts) res.status(404).json({message: 'Not found'});
        else res.json(concerts);
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.addOne = async(req, res) => {
    try{
        const {performer, genre, price, day, image} = req.body;
        const newConcert = new Concerts({performer: performer, genre: genre, price: price, day: day, image: image});
        await newConcert.save();
        const concerts = await Concerts.find();
        res.json({concerts});
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.updateOne = async(req, res) => {
    try{
        const {performer, genre, price, day, image} = req.body;
        const concertFound = await Concerts.findById(req.params.id);
        if(!concertFound) res.status(404).json({message: 'Not found'});
        else{
            await Concerts.updateOne({_id: req.params.id}, {$set: {performer: performer, genre: genre, price: price, day: day, image: image}});
            const concerts = await Concerts.find();
            res.json({concerts});
        }
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.deleteOne = async(req, res) => {
    try{
        const concertFound = await Concerts.findById(req.params.id);
        if(!concertFound) res.status(404).json({message: 'Not found'});
        else{
            await Concerts.deleteOne({_id: req.params.id});
            const concerts = await Concerts.find();
            res.json({concerts});
        }
    }catch(err){
        res.status(500).json({message: err});
    }
}