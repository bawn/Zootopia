

import realm from './realm';

export const getToken = () => {
  let users = realm.objects('User');
  let user = users[0];
  return user['token'];
};

export const getUser = () => {
  let users = realm.objects('User');
  if (users.length >= 1) {
    return true;
  }
  else {
    return false;
  }
};

export default {
  container: {
    flex: 1,
    backgroundColor: '#F3F5F6',
  },
}
