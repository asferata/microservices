const {User: UserModel} = require('./mongoose');
const {Validation} = require('@dataValidation/');
const _ = require('lodash');

async function remove(id) {
    const result = await UserModel.deleteOne({_id: id});
    return result.n !== 0;
}

async function get(id, keysToPopulate) {
    let user = await UserModel.findById(id);
    if (keysToPopulate) {
        user = await UserModel.populate(user, keysToPopulate).toJSON();
    }
    else {
        user = user.toJSON();
    }

    return user;
}

// TODO: Natalie - this is wrong. Need to change options
async function find(options) {
    return UserModel.find(options);
}

async function list() {
    const results = await UserModel.find();
    return results.map(x => x.toJSON());
}

async function add(user) {
    return UserModel.create(user);
}

async function update(id, user) {
    return UserModel.updateOne(id, user);
}

// TODO: Natalie - throw NotFound if user or profile not found?
async function updateProfile(id, profile) {
    let user = await findOne(id);
    let existingProfile = user.profiles.id(profile._id);
    existingProfile = Object.assign(existingProfile, profile);
    return user.save();
}

/*const replaceIds = func => {
    return async (id, ...rest) => {
        let result = await func(id, ...rest);
        let map = result.map(x => replaceId(x));
        return map;
        //return replaceId(result);
    }
};

const replaceId = value => {
    let replacedValue = value;
    if(replacedValue && _.has(replacedValue, '_id')) {
        replacedValue = Object.assign({}, replacedValue, {id: replacedValue["_id"]});
        replacedValue = _.unset(replacedValue, '_id');
    }

    return replacedValue;
};*/

const User = {
    remove: Validation.withIdValidation(remove),
    // list: replaceIds(list),
    list,
    // get: replaceIds(Validation.withIdValidation(get)),
    get: Validation.withIdValidation(get),
    // add: replaceIds(add),
    add,
    // update : replaceIds(Validation.withIdValidation(update)),
    update : Validation.withIdValidation(update),
    //updateProfile: Validation.withIdValidation(updateProfile),
    // find: replaceIds(find)
    find
};

module.exports = User;