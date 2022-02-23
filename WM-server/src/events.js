const express = require('express');

function createRouter(db) {
  const router = express.Router();

  // list all workshops
  router.get('/workshops', function (req, res, next) {
    db.query(
      'SELECT * FROM workshops ORDER BY start',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // list current workshops
  router.get('/workshops/current', function (req, res, next) {
    db.query(
      'SELECT * FROM workshops WHERE start<? AND end>? ORDER BY start',
      [new Date(), new Date()],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // list prior workshops
  router.get('/workshops/prior', function (req, res, next) {
    db.query(
      'SELECT * FROM workshops WHERE end<? ORDER BY start',
      [new Date()],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // list future workshops
  router.get('/workshops/future', function (req, res, next) {
    db.query(
      'SELECT * FROM workshops WHERE start>? ORDER BY start',
      [new Date()],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // list participants
  router.get('/participants', function (req, res, next) {
    db.query(
      'SELECT * FROM participants ORDER BY last_name, first_name',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // list equipment
  router.get('/equipment', function (req, res, next) {
    db.query(
      'SELECT * FROM equipment ORDER BY name',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // list equipment for workshop
  router.get('/workshop/:id/equipment', function (req, res, next) {
    db.query(
      'SELECT a.id AS id, name, storage_loc, year, image, eq_condition, participant_id, workshop_id FROM equipment a INNER JOIN participants b ON b.workshop_id = ? AND b.id = a.participant_id ORDER BY name;',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });


  // create workshop
  router.post('/workshops', function (req, res, next) {
    this.start = new Date(req.body.start);
    this.end = new Date(req.body.end);
    this.start.setHours(this.start.getHours() + 12);
    this.end.setHours(this.end.getHours() + 12);
    db.query(
        'INSERT INTO workshops (start, end, meet, location, numofpart, frequency) VALUES (?,?,?,?,?,?)',
        [this.start, this.end, req.body.meet, req.body.location, 0, req.body.frequency],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
    );
  });

  // update workshop
  router.put('/workshops/:id', function(req, res, next) {
    this.start = new Date(req.body.start);
    this.end = new Date(req.body.end);
    this.start.setHours(this.start.getHours() + 12);
    this.end.setHours(this.end.getHours() + 12);
    db.query(
      'UPDATE workshops SET start=?, end=?, meet=?, location=?, numofpart=?, frequency=? WHERE id=?',
      [this.start, this.end, req.body.meet, req.body.location, req.body.numofpart, req.body.frequency, req.params.id],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
    );
  });

  // delete workshop
  router.delete('/workshops/:id', function(req, res, next) {
    db.query(
      'DELETE FROM workshops WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


  // get workshop by ID
  router.get('/workshops/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM workshops WHERE id=?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // get participant by ID
  router.get('/participants/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM participants WHERE id=?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // get equipment by ID
  router.get('/equipment/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM equipment WHERE id=?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // view workshop
  router.get('/workshop/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM participants WHERE workshop_id=? ORDER BY last_name, first_name',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // view equipment for a participant
  router.get('/participant/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM equipment WHERE participant_id=? ORDER BY name',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });


  // add participant to workshop
  router.post('/participant/:workshopID', function (req, res, next) {
    db.query(
        'INSERT INTO participants (first_name, last_name, address, city, state, zip, email, phone, workshop_id) VALUES (?,?,?,?,?,?,?,?,?)',
        [req.body.first_name, req.body.last_name, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.email, req.body.phone, req.params.workshopID],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
    );
  });

  // delete participant from workshop
  router.delete('/participants/:id', function(req, res, next) {
    db.query(
      'DELETE FROM participants WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


  // update participant
  router.put('/participants/:id', function(req, res, next) {
    db.query(
      'UPDATE participants SET first_name=?, last_name=?, address=?, city=?, state=?, zip=?, email=?, phone=? WHERE id=?',
      [req.body.first_name, req.body.last_name, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.email, req.body.phone, req.params.id],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
    );
  });

  // add equipment to participant
  router.post('/equipment/:participantID', function (req, res, next) {
    if (req.params.participantID != 0) {
      db.query(
        'INSERT INTO equipment (name, storage_loc, year, image, eq_condition, participant_id) VALUES (?,?,?,?,?,?)',
        [req.body.name, req.body.storage_loc, req.body.year, req.body.image, req.body.eq_condition, req.params.participantID],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
      );
    } else {
      db.query(
        'INSERT INTO equipment (name, storage_loc, year, image, eq_condition) VALUES (?,?,?,?,?)',
        [req.body.name, req.body.storage_loc, req.body.year, req.body.image, req.body.eq_condition],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
      );
    }
  });

  // assign equipment

  // delete equipment from participant
  router.delete('/equipment/:id', function(req, res, next) {
    db.query(
      'DELETE FROM equipment WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  // update equipment
  router.put('/equipment/:id', function(req, res, next) {
    db.query(
      'UPDATE equipment SET name=?, storage_loc=?, year=?, image=?, eq_condition=? WHERE id=?',
      [req.body.name, req.body.storage_loc, req.body.year, req.body.image, req.body.eq_condition, req.params.id],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
    );
  });

  // update workshop count
  router.put('/workshops/:id/count', function(req, res, next) {
    db.query(
      'UPDATE workshops SET numofpart=(SELECT COUNT(workshop_id) FROM participants WHERE workshop_id=?) where id=?;',
      [req.params.id, req.params.id],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
    );
  });

  return router;
}

module.exports = createRouter;
