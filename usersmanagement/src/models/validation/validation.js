const mongoose = require('mongoose');
const {InvalidIdError} = require('@dataErrors/');

const isIdValid = (id) => {
    if (!id) {
        return false;
    }

    try {
        mongoose.Types.ObjectId(id);
        return true;
    } catch (err) {
        return false;
    }
};

const withIdValidation = func => {
    return (id, ...rest) => {
        if (isIdValid(id)) {
            return func(id, ...rest);
        }

        throw new InvalidIdError();
    }
};

module.exports = {
    withIdValidation,
    isIdValid
};