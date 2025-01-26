/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role:string;
};

export interface AdminModel extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>;
}
