const {notes} = require('../dataBase/index')

module.exports = {
    getStatsItem: () => notes.length,
    getAllItems: () => notes,
    getOneItem: id => notes.filter(value => value.id === id),
    deleteOneItem: id => notes.filter((value, index) => {
        if (value.id === id) notes.splice(index, 1)
    }),
    createItem: obj => notes.push(obj),
    updateItem: (id, newObject) => notes.filter((value, index) => {
        if (value.id === id)  notes.splice(index, 1), notes.push(newObject)
    })
}
