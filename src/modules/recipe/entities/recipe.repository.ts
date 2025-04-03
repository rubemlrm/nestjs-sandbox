export interface Repository {
  create(recipe: any): Promise<any>;
  update(id: number, recipe: any): Promise<any>;
  findOne(id: number): Promise<any>;
  findAll(): Promise<any[]>;
  delete(id: number): Promise<void>;
}
