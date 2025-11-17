const Seats = require('../models/seats.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) =>{
    try{
        res.json(await Seats.find());
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.getRandom = async (req, res) => {
    try{
        const count = await Seats.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const seats = await Seats.findOne().skip(rand);
        if(!seats) res.status(404).json({message: 'Not found'});
        else res.json(seats);
    }catch(err){
        res.status(500).json({message: err});
    }
}


exports.getById = async (req, res) => {
    try{
        const seats = await Seats.findById(sanitize(req.params.id));
        if(!seats) res.status(404).json({message: 'Not found'});
        else res.json(seats);
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.addOne = async(req, res) => {
    try{
        const {day, seat, client, email} = sanitize(req.body);
        const newSeat = new Seats({day: day, seat: seat, client: client, email: email});
        await newSeat.save();
        const seats = await Seats.find();
        res.json({seats});
        req.io.emit('seatsUpdated', seats);
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.updateOne = async(req, res) => {
    try{
        const {day, seat, client, email} = sanitize(req.body);
        const seatFound = await Seats.findById(sanitize(req.params.id));
        if(!seatFound) res.status(404).json({message: 'Not found'});
        else{
            await Seats.updateOne({_id: req.params.id}, {$set: {day: day, seat: seat, client: client, email: email}});
            const seats = await Seats.find();
            res.json({seats});
        }
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.deleteOne = async(req, res) => {
    try{
        const seatFound = await Seats.findById(sanitize(req.params.id));
        if(!seatFound) res.status(404).json({message: 'Not found'});
        else{
            await Seats.deleteOne({_id: req.params.id});
            const seats = await Seats.find();
            res.json({seats});
        }
    }catch(err){
        res.status(500).json({message: err});
    }
}