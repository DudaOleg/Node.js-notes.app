const {noteService} = require("../services");
const {ErrorHandler, code, errorMessage} = require("../errors");
module.exports = {
    check: async (req, res, next) => {
        try {

            const note = noteService.getOneItem(req.params.note_id);

            if (!note) {
                throw new ErrorHandler(code.NOT_FOUND, errorMessage.notFoundNote);
            }

            req.note = note;
            next()
        } catch (e) {
            next(e);
        }
    },

    validator: (validator) => (req, res, next) => {
        try {
            const {error} = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(code.NOT_VALID, error.details[0].message);
            }

          next()
        } catch (e) {
          next(e);
        }
    }
}


