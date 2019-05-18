const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle_model');
const logger = require('../../logger/logger');
const util = require('util');



//get all the vehicles from DB when client loads page
router.get('/',(req, res) => {
    logger.info(`query/ ${util.inspect(req.query,false,null)}`)
    Vehicle.find({}).then(response => {
        logger.info(`GET response ${response}`);
        res.status(200).json({
            message: 'OK',
            vehicles: response
        })
    }).catch(err => {
        logger.error(`GET error!: ${err}`);
        res.status(500).json({
            message: 'ERROR'
        })
    })  
});
//add a new vehicle to DB
router.post('/',(req, res) => {

    console.log('in post');
    logger.info(`post body${util.inspect(req.body,false,null)}`);

    const vehicle = new Vehicle({
        id: undefined,
        name: 123,
        created: undefined,
        type: 123,
    })

    vehicle.save().then(resp => {
        logger.info(`POST response ${resp}`);
        res.status(200).json({
            message: 'OK',
            createdVehicle: vehicle
        })
    }).catch(err => {
        logger.debug(`POST Error ${err}`)
        res.status(403).json({
            message: 'ERROR'
        })

    })
})

//edits a vehicle to DB
router.put('/:vehicleid',(req,res) => {

    logger.info(`PUT params ${util.inspect(req.params,false,null)} PUT body ${util.inspect(req.body,false,null)}`)

    const id = req.params.vehicleid;
    Vehicle.findByIdAndUpdate(id, req.body, {new: true})
    .then(resp => {
        logger.info(`PUT response ${resp}`)
        res.status(200).json({
            message: "OK",
            vehicle: resp
        })
    }).catch(err => {
        logger.debug(`PUT error ${err}`)
        res.status(404).json({
            message: "ERROR"
        })
    })
})

//delete a vehicle from DB
router.delete('/:vehicleid',(req,res) => {
    const id = req.params.vehicleid;
    logger.info(`DELETE Vehicle ID=${id}`)
    Vehicle.deleteOne({ _id: id }).then(resp => {
        logger.info(`DELETE response ${util.inspect(resp,false,null)}`)
        res.status(200).json({
            message: 'OK'
        })
    }).catch(err => {
        logger.debug(`DELETE error ${err}`)
        res.status(500).json({
            message: 'Error'
        })
    })
})

module.exports = router;