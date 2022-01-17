const router = require('express').Router();

const {
    noteController: {
        getAllNotes,
        getSingleNote,
        getStats,
        createNote,
        deleteNote,
        updateNote
    }
} = require("../controllers");
const {noteMiddleware: {check, validator}} = require("../middlewares");
const {noteValidator: {create, update}} = require("../validators");


router.post('/', validator(create), createNote);
router.get('/', getAllNotes);
router.get('/stats', getStats);
router.get('/:note_id', check, getSingleNote);
router.patch('/:note_id', validator(update), check, updateNote);
router.delete('/:note_id', check, deleteNote);

module.exports = router;
