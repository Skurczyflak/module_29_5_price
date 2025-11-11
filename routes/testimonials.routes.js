const express = require('express');
const router = express.Router();
const TestimonialsController = require('./../controllers/testimonials.controller');

router.get('/testimonials', TestimonialsController.getAll);

router.get('/testimonials/random', TestimonialsController.getRandom);

router.get('/testimonials/:id', TestimonialsController.getById);

router.post('/testimonials', TestimonialsController.addOne);

router.put('/testimonials/:id', TestimonialsController.updateOne);

router.delete('/testimonials/:id', TestimonialsController.deleteOne);


module.exports = router;