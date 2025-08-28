declare module 'mongoose' {
  interface Document {
    _id: any;
    save(): Promise<this>;
  }

  interface Model<T extends Document> {
    find(filter?: any): any;
    findById(id: any): any;
    findOne(conditions: any): any;
    create(doc: any): any;
    updateOne(filter: any, update: any, options?: any): any;
    deleteOne(filter: any): any;
    countDocuments(filter?: any): Promise<number>;
    // Add other methods you use from mongoose.Model
  }

  const models: {
    [key: string]: Model<any>;
  };

  function model<T extends Document>(
    name: string,
    schema?: any,
    collection?: string,
    skipInit?: boolean
  ): Model<T>;

  function connect(uri: string, options?: any): Promise<typeof import('mongoose')>;
  function disconnect(): Promise<void>;
  function connection: any;
  const Schema: any;
  const SchemaTypes: any;
  const Types: any;
}
