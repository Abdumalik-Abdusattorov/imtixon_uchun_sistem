const Students = require("../../model/studentModel");
const CustomError = require("../../utils/errorCheck");


const userCheck = async (req, res, next) => {
    try {
        const { decoded } = req;
        const student = await Students.findOne({ phoneNumber: decoded.phoneNumber })
        if (!student) {
            throw new CustomError(403, "Permission denied");
        }
        req.student = student;
        next()
    } catch (err) {
        res.status(403).json({ message: err.message });
        next(err);
    }
}
module.exports = userCheck;