const router = require('express').Router();

// 5 update path for the require
const Hubs = require('./hubs-model.js');

// 3
// this router handles requests beginning with /api/hubs
// so we remove that part of the URI and replace it with a /

// 4 rename server. to router.
router.get('/', (req, res) => {
    // google.com?term=express&sort=desc&field=date

    const query = req.query;

    Hubs.find(query)
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the hubs',
            });
        });
});

router.get('/:id', (req, res) => {
    Hubs.findById(req.params.id)
        .then(hub => {
            if (hub) {
                res.status(200).json(hub);
            } else {
                res.status(404).json({ message: 'Hub not found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the hub',
            });
        });
});

router.post('/', (req, res) => {
    Hubs.add(req.body)
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error adding the hub',
            });
        });
});

router.delete('/:id', (req, res) => {
    Hubs.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The hub has been nuked' });
            } else {
                res.status(404).json({ message: 'The hub could not be found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error removing the hub',
            });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Hubs.update(req.params.id, changes)
        .then(hub => {
            if (hub) {
                res.status(200).json(hub);
            } else {
                res.status(404).json({ message: 'The hub could not be found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error updating the hub',
            });
        });
});

module.exports = router;

// router.get(':channel/messages', (req, res) => {
// router.get('channel/messages', (req, res) => {
// router.get('/hubs/messages', (req, res) => {
// router.get('/hubs/messages/:id', (req, res) => {
router.get('/:id/messages', (req, res) => { });

router.post('/:id/messages', (req, res) => {
    const message = { ...req.body, hubId: req.params.id };

    // save the message
});

router.get('/:id/users', (req, res) => { });

router.get('/:id/threads', (req, res) => { });

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

// export default router; // ES Modules