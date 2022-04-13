const express = require('express');
const multer = require('multer');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const fs = require('fs')

var fileDir = './uploaded_images';

// Configure Storage
var storage = multer.diskStorage({

  // Setting directory on disk to save uploaded files
  destination: function (req, file, cb) {
      cb(null, fileDir)
  },

  // Setting name of file saved
  filename: function (req, file, cb) {
      cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[1]);
  }
})

var upload = multer({
  storage: storage
})


function createRouter(db) {
  const router = express.Router();

  // GET users listing
  router.post('/register', async function (req, res, next) {
    try {
      let { username, password } = req.body; 
      const hashed_password = md5(password.toString())
      const checkUsername = `Select username FROM users WHERE username = ?`;
      console.log(hashed_password);
      db.query(checkUsername, [username], (err, result, fields) => {
        if(!result.length){
          const sql = `Insert Into users (username, password) VALUES ( ?, ? )`
          db.query(
            sql, [username, hashed_password],
          (err, result, fields) =>{
            if(err){
              res.send({ status: 0, data: err });
            }else{
              let token = jwt.sign({ data: result }, 'secret')
              res.send({ status: 1, data: result, token : token });
            }
          
          })
        }
      });
    } catch (error) {
      console.log("NO");
      res.send({ status: 0, error: error });
    }
  });

  // post login
  router.post('/login', async function (req, res, next) {
    try {
      let { username, password } = req.body; 
      console.log(req.body.password);
      const hashed_password = md5(password.toString())
      console.log(hashed_password);
      const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
      db.query(
        sql, [username, hashed_password],
        function(err, result, fields){
          if(err || result[0] == null) {
            res.send({ status: 0, data: err });
          } else {
            let token = jwt.sign({ data: result }, 'secret')
            res.send({ status: 1, data: result, token: token });
          }
      })
    } catch (error) {
      res.send({ status: 0, error: error });
    }
  });

  // upload file to server
  router.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })
  }, (error, req, res, next) => {
      res.status(400).send({
          error: error.message
      })
  })

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

  // list assigned participants
  router.get('/participants/view/assigned', function (req, res, next) {
    db.query(
      'SELECT * FROM participants WHERE workshop_id IS NOT NULL ORDER BY last_name, first_name',
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
  
  // list unassigned participants
  router.get('/participants/view/unassigned', function (req, res, next) {
    db.query(
      'SELECT * FROM participants WHERE workshop_id IS NULL ORDER BY last_name, first_name',
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

  // list equipment checked out
  router.get('/equipment/view/checked', function (req, res, next) {
    db.query(
      'SELECT * FROM equipment WHERE participant_id IS NOT NULL ORDER BY name',
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

  // list equipment not checked out
  router.get('/equipment/view/unchecked', function (req, res, next) {
    db.query(
      'SELECT * FROM equipment WHERE participant_id IS NULL ORDER BY name',
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
    if (req.params.workshopID != -1)
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
    else {
      db.query(
        'INSERT INTO participants (first_name, last_name, address, city, state, zip, email, phone) VALUES (?,?,?,?,?,?,?,?)',
        [req.body.first_name, req.body.last_name, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.email, req.body.phone],
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
    if (req.body.workshop_id != -1) {
      db.query(
        'UPDATE participants SET first_name=?, last_name=?, address=?, city=?, state=?, zip=?, email=?, phone=?, workshop_id=? WHERE id=?',
        [req.body.first_name, req.body.last_name, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.email, req.body.phone, req.body.workshop_id, req.params.id],
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
        'UPDATE participants SET first_name=?, last_name=?, address=?, city=?, state=?, zip=?, email=?, phone=?, workshop_id=NULL WHERE id=?',
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
    }
  });

  // add equipment to participant
  router.post('/equipment/:participantID', upload.single('image'), function (req, res, next) {
    if (req.params.participantID != -1) {
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

  // delete equipment from participant
  router.delete('/equipment/:id/:filename', function(req, res, next) {
    console.log("ID: " + req.params.id);
    console.log("Filename: " + req.params.filename);
    db.query(
      'DELETE FROM equipment WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          if (req.params.filename != "none") {
            fs.unlinkSync(fileDir + '/' + req.params.filename), (err) => {
              if (err) {
                console.error(err)
                return
              }
              //file removed
            }
          }
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  // update equipment
  router.put('/equipment/:id', function(req, res, next) {
    // image=?, req.body.image, 
    if (req.body.participant_id != -1) {
      db.query(
        'UPDATE equipment SET name=?, storage_loc=?, year=?, eq_condition=?, participant_id=? WHERE id=?',
        [req.body.name, req.body.storage_loc, req.body.year, req.body.eq_condition, req.body.participant_id, req.params.id],
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
        'UPDATE equipment SET name=?, storage_loc=?, year=?, eq_condition=?, participant_id=NULL WHERE id=?',
        [req.body.name, req.body.storage_loc, req.body.year, req.body.eq_condition, req.params.id],
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
