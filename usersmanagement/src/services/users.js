const users = [
    {id: 101, firstName: 'John', lastName: 'Smith', email: 'j.smith@mail.com'},
    {id: 202, firstName: 'Jim', lastName: 'Brown', email: 'j.brown@mail.com'},
    {id: 303, firstName: 'Samantha', lastName: 'Black', email: 's.black@mail.com'},
    {id: 404, firstName: 'Aston', lastName: 'Martin', email: 'a.martin@mail.com'},
    {id: 505, firstName: 'Harley', lastName: 'Davidson', email: 'h.davidsonmail.com'}];

const list = async () => {
    console.log('Get list of users');
    Object.assign([], users);
}

const get = async (id) => {
    console.log('Get user with id ' + id);
    const user = users.find(x => x.id == id);
    return Object.assign({}, user);
};

const UsersService = {
    list,
    get
};

module.exports = UsersService;