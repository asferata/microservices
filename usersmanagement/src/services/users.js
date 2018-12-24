let User = require('@models/user');
let {EntityNotFoundError, EntitySaveError} = require('@serviceErrors/');
const {InvalidIdError} = require('@dataErrors/');
const moment = require('moment');

const print = message => {
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS Z');
    console.log(dateTime + ' ' + message);
};

const list = async () => {
    print('Get list of users');
    return await User.list();
};

const get = async (id, keysToPopulate) => {
    print('Get user with id ' + id);
    if (Array.isArray(keysToPopulate)) {
        keysToPopulate = keysToPopulate.map(s => s.trim()).join(' ');
    }

    let user = await User.get(id, keysToPopulate);
    if (!user) {
        throw new EntityNotFoundError("User with specified id was not found");
    }

    return user;
};

// TODO: Natalie - validate options. Somehow
const find = async (options) => {
    return User.find(options);
};

const add = async user => {
    try {
        return User.add({...user});
    }
    catch (e) {
        throw new EntitySaveError("Failed to save user");
    }
};

const update = async (id, user) => {
    try {
        await User.update({_id: id}, {$set: {...user}});
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("User with specified id was not found");
        }

        throw new EntitySaveError("Failed to update user");
    }

    return get(id);
};

const updateProfile = async (id, profile) => {
    try {
        await User.updateProfile({_id: id}, {...profile});
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("User with specified id was not found");
        }

        throw new EntitySaveError("Failed to update user");
    }

    return get(id);
};

const remove = async id => {
    let result;
    try {
        result = await User.remove({_id: id});
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("User with specified id was not found");
        }

        throw new EntitySaveError("Failed to remove user");
    }

    if (!result) {
        throw new EntityNotFoundError();
    }
};

const UsersService = {
    list,
    get,
    add,
    update,
    updateProfile,
    remove,
    find
};

module.exports = UsersService;


/*

const users = [
    {id: 101, firstName: 'John', lastName: 'Smith', email: 'j.smith@mail.com'},
    {id: 202, firstName: 'Jim', lastName: 'Brown', email: 'j.brown@mail.com'},
    {id: 303, firstName: 'Samantha', lastName: 'Black', email: 's.black@mail.com'},
    {id: 404, firstName: 'Aston', lastName: 'Martin', email: 'a.martin@mail.com'},
    {id: 505, firstName: 'Harley', lastName: 'Davidson', email: 'h.davidsonmail.com'}];


const list = async () => {
    print('Get list of users');
    Object.assign([], users);
}

const get = async (id) => {
    print('Get user with id ' + id);
    const user = users.find(x => x.id == id);
    return Object.assign({}, user);
};

const UsersService = {
    list,
    get
};

module.exports = UsersService;*/