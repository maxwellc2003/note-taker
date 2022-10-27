const router = require('express').Router();
const uuid = require('uuid');
const { deleteNote, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/notes');

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
  });

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = uuid.v4();

    if (!validateNote(req.body)) {
      res.status(400).send('The note is not properly formatted.');
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes)
    res.end();
});

module.exports = router;