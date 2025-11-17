const Testimonials = require('../models/testimonials.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) =>{
    try {
        res.json(await Testimonials.find());
    }catch(err) {
        res.status(500).json({message: err});
    }
}

exports.getRandom = async (req, res) => {
    try{
        const count = await Testimonials.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const tes = await Testimonials.findOne().skip(rand);
        if(!tes) res.status(404).json({message: 'Not found'});
        else res.json(tes);
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.getById = async (req, res) => {
    try{
        const tes = await Testimonials.findById(sanitize(req.params.id));
        if(!tes) res.status(404).json({message: 'Not found'});
        else res.json(tes);
    }catch(err) {
        res.status(500).json({message: err});
    }
}

exports.addOne = async(req, res) => {
    try{
        const {author, text} = sanitize(req.body);
        const newTestimonial = new Testimonials({author: author, text: text});
        await newTestimonial.save();
        const testimonials = await Testimonials.find();
        res.json({testimonials});
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.updateOne = async(req, res) => {
    try{
        const {id} = sanitize(req.params);
        const tes = await Testimonials.findById(id);
        if(!tes) res.status(404).json({message: 'Not found'});
        else{
            await Testimonials.updateOne({_id: id}, {$set: {author: sanitize(req.body.author), text: sanitize(req.body.text)}});
            const testimonials = await Testimonials.find();
            res.json({testimonials});
        }
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.deleteOne = async(req, res) => {
    try{
        const tes = await Testimonials.findById(sanitize(req.params.id));
        if(!tes) res.status(404).json({message: 'Not found'});
        else{
            await Testimonials.deleteOne({_id: req.params.id});
            const testimonials = await Testimonials.find();
            res.json({testimonials});
        }
    }catch(err){
        res.status(500).json({message: err});
    }
}