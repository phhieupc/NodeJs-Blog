const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../until/mongoose');

class MeController {
    // [GET] /me/stored/courses
    show(req, res, next) {
        Promise.all([Course.find({}).sortable(req), Course.countDocumentsWithDeleted({ deleted: true })])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/courses
    trash(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((courses) => {
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
