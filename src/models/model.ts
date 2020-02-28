import { NonFunctionKeys } from 'utility-types';
import { Resolver } from 'dns';
import { read, readSync } from 'fs';

const axios = require('axios').default;

type SchemaOf<T extends object> = Pick<T, NonFunctionKeys<T>>;

enum QueryFilterOrder {
  Asc = 'asc',
  Desc = 'desc',
}
interface QueryFilter {
  where?: Record<string, any>;
  limit?: number;
  page?: number;
  sort?: string;
  order?: QueryFilterOrder;
}
interface FindByIdOptions {
  includes: string[];
}
type ModelIdType = number | string;
enum RelationType {
  BelongsTo = 'belongsTo',
  HasMany = 'hasMany',
}

/**
 * Define the configuration of a relation
 */
interface Relation {
  /** Type of the relation: hasMany, belongsTo, ... */
  type: RelationType;
  /** The target Model */
  model: any;
  /**
   * The key containing the relation link
   * - on the target model if hasMany
   * - on the current model if belongsTo
   */
  foreignKey: string;
}
interface ModelConfig {
  /**
   * The endpoint on the remote API, example 'users'
   */
  endpoint: string;

  /**
   * The definition of the relations
   */
  relations?: Record<string, Relation>;
}
abstract class Model {
    protected static config: ModelConfig;

    constructor(id: string | number) {
      this.id = id;
    }

    id: string | number;

    static async create<T extends Model>(dataOrModel: SchemaOf<T> | T): Promise<T[]> {
      const res = await axios.post(this.config.endpoint, dataOrModel);
      return res.data;
    }

    static async find<T extends Model>(filter?: QueryFilter): Promise<T[]> {
      if (filter != null) {
        const res = await axios.patch(`${this.config.endpoint}?${
          filter.limit}` ? `?limit=${filter.limit}` : `${
            filter.where}` ? `?where=${filter.where}` : `${
              filter.page}` ? `?page=${filter.page}` : `${
                filter.sort}` ? `?sort=${filter.sort}` : `${
                  filter.order}` ? `?order=${filter.order}` : '');
        return res.data;
      }
    }

    static async findById<T extends Model>(id: ModelIdType, options?: FindByIdOptions): Promise<T> {
      const res = await axios.get(`${this.config.endpoint}/${id}`);
      return res.data;
    }


    // static async updateById<T extends Model>(model: T): Promise<T[]>;

    // static async updateById<T extends Model>(id: T | ModelIdType, data?: Partial<SchemaOf<T>>): Promise<T>;

    static async updateById<T extends Model>(modelOrId: T | ModelIdType, data?: Partial<SchemaOf<T>>): Promise<T> {
      const res = await axios.patch(this.config.endpoint + modelOrId, data);
      return res.data;
    }


    static async deleteById(id: ModelIdType): Promise<boolean> {
      const res = await axios.delete(this.config.endpoint + id);
      return res.data;
    }

  // /**
  //  * Push changes that has occured on the instance
  //  */
  /*
    save<T extends Model>(): Promise<T> {
      const res = axios.all();
      return res.data;
    }
    */
  // /**
  //  * Push given changes, and update the instance
  //  */
  // update<T extends Model>(data: Partial<SchemaOf<T>>): Promise<T>{
  // }
  // /**
  //  * Remove the remote data
  //  */
  // remove(): Promise<void>{
  // }
}
export default Model;
