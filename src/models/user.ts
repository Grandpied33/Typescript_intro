import Model from './model';
import Album from './album';

enum RelationType {
  BelongsTo = 'belongsTo',
  HasMany = 'hasMany',
}

export interface UserSchema {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: number; lng: number };
  };
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
}

class User extends Model {
  static config = {
    path: '/users',
    relations: {
      user: {
        type: RelationType.HasMany,
        model: Album,
        foreignKey: 'userId',
      },
    },
    endpoint: 'https://jsonplaceholder.typicode.com/users',

  };
}
export default User;
