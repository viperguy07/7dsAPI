const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

// All GET requset go here:

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handeling GET request to /users'
    })
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json({
                doc
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        });
});

// All POST requset go here:

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        eDate: req.body.eDate
    });
    user.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Handeling POST request to /users',
            createdUser: user
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    });

    
});

// All POST requset go here:

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'So you want to edit this, umm Get lost!'
    })
});

// All DELETE requset go here:

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'So you want to delete this, umm Get lost!'
    })
});

module.exports = router;