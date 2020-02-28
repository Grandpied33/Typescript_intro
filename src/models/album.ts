import axios from 'axios';
import fetch from 'node-fetch';
import { json } from 'body-parser';
import api from '../api';
import Model from './model';
import User from './user';
import Photo from './photos';

enum RelationType {
  BelongsTo = 'belongsTo',
  HasMany = 'hasMany',
}

class Album extends Model {
  constructor(id: number, userId: number, title: string) {
    super(id);
    this.userId = userId;
    this.title = title;
  }

  private title: string;

  private userId: number;


  static config = {
    path: '/albums',
    relations: {
      user: {
        type: RelationType.BelongsTo,
        model: User,
        foreignKey: 'userId',
      },
      photos: {
        type: RelationType.HasMany,
        model: Photo,
        foreignKey: 'albumId',
      },
    },
    endpoint: 'https://jsonplaceholder.typicode.com/albums',
  };
}
export default Album;
