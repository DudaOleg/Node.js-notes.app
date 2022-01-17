const {noteService} = require("../services");
const {code, errorMessage} = require("../errors");

module.exports = {
    getStats: async (req, res, next) => {
        try {
            const stats = await noteService.getStatsItem();

            res.json(stats)
        } catch (e) {
            next(e)
        }
    },
    getAllNotes: async (req, res, next) => {
        try {
            const allNotes = await noteService.getAllItems();

            res.json(allNotes);
        } catch (e) {
            next(e);
        }
    },
    getSingleNote: (req, res, next) => {
        try {
            res.json(req.note);
        } catch (e) {
            next(e);
        }
    },
    createNote: async (req, res, next) => {
        try {
            const noteBody = req.body;
            const id = `${Date.now()}`

            let date = noteBody.content.split(' ').filter(value =>
                value?.includes('/') && value.length <= 10 && value.length >= 8)

            const note = {...noteBody, id, dates: date}

            await noteService.createItem(note)

            res.status(code.CREATE).json(errorMessage.ok);
        } catch (e) {
            next(e);
        }
    },
    deleteNote: async (req, res, next) => {
        try {
            const id = req.params.note_id

            await noteService.deleteOneItem(id);

            res.sendStatus(code.DELETE);
        } catch (e) {
            next(e);
        }
    },
    updateNote: async (req, res, next) => {
        try {
            const note = req.note[0];
            const newContent = req.body.content;
            let date = newContent.split(' ').filter(value =>
                value?.includes('/') && value.length <= 10 && value.length >= 8);

            if (date.length > 0) {
                note.dates.push(date[0])
                console.log(note)
                await noteService.updateItem(req.id, {...note, content: newContent}, date);
            }


            await noteService.updateItem(note.id, {...note, content: newContent});

            res.status(code.CREATE).json(errorMessage.ok);
        } catch (e) {
            next(e);
        }
    }
}
