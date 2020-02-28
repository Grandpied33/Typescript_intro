import Model from './model';
import Album from './album';

enum RelationType {
  BelongsTo = 'belongsTo',
  HasMany = 'hasMany',
}

export interface PhotoSchema {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

class Photo extends Model {
  static config ={
    path: '/phptos',
    relations: {
      user: {
        type: RelationType.BelongsTo,
        model: Album,
        foreignKey: 'albumId',
      },
    },
    endpoint: 'https://jsonplaceholder.typicode.com/photos',
  };
}
export default Photo;
