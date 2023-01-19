
'use strict';
import Realm from 'realm';

class User extends Realm.Object {}

User.schema = {
    name: 'User',
    primaryKey: 'user',
    properties: {
      user: 'string',
      _id: 'string',
      created: 'string',
      token: 'string',
      gender: {type: Realm.Types.INT, default: 0},
      nickname: {type: Realm.Types.STRING, default: ''},
      avatar: {type: Realm.Types.STRING, default: ''}
    }
};

export default new Realm({schema: [User]});
