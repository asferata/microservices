const {User: UserModel} = require('./mongoose');
const {Validation} = require('@dataValidation/');

async function remove(id) {
    const result = await UserModel.deleteOne({_id: id});
    return result.n !== 0;
}

async function get(id, keysToPopulate) {
    let user = await UserModel.findById(id);
    if (keysToPopulate) {
        user = await UserModel.populate(user, keysToPopulate);
    }

    return user;
}

// TODO: Natalie - this is wrong. Need to change options
async function find(options) {
    return UserModel.find(options);
}

async function list() {
    return UserModel.find();
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

const User = {
    remove: Validation.withIdValidation(remove),
    list,
    get: Validation.withIdValidation(get),
    add,
    update : Validation.withIdValidation(update),
    updateProfile: Validation.withIdValidation(updateProfile),
    find
};

module.exports = User;