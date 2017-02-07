import mongoose from 'mongoose';
import '../models/User';
import config from '../../etc/config.json'

const User = mongoose.model('User');

export function setupConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`)
}

export function listUsers(query) {
    let filters = {};
    for (let filter in query.filter) {
        filters[filter] = new RegExp(`${query.filter[filter]}`, "i");
    }

    return User.find(filters)
        .sort(query.sort ?
                query.sort[0] !== '-' ?
                    {[query.sort] : 1}
                        :
                    {[query.sort.slice(1)] : -1}
                :
                {})

}

export function getUser(_id) {
    return User.findOne({_id});
}

export function updateUser(_id, body) {
    return User.update({_id}, {$set: body});
}

export function createUser(data) {
    const user = new User({
        name: data.name,
        birthday: data.birthday,
        adress: data.adress,
        city: data.city,
        phone: data.phone
    });

    return user.save();
}

export function deleteUser(id) {
    return User.findById(id).remove();
}