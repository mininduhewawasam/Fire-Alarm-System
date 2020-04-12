'use strict'
const router = require('express').Router();

router.get('/api', (req, res) => {
    res.status(200);
    res.json({ data: '1.0.0' })
});

// router.get('/api/error', (req, res) => {
//     res.status(400).json({data: false });
// })

router.use('/api', require('../../service_sensor/routes'));
router.use('/api', require('../../service_user/routes'));

module.exports = router;