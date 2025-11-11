const express = require('express');
const router = express.Router();
const ConcertsController = require('./../controllers/concerts.controller');

router.get('/concerts', ConcertsController.getAll);

router.get('/concerts/random', ConcertsController.getRandom);

router.get('/concerts/:id', ConcertsController.getById);

router.post('/concerts', ConcertsController.addOne);

router.put('/concerts/:id', ConcertsController.updateOne);

router.delete('/concerts/:id', ConcertsController.deleteOne);


module.exports = router;