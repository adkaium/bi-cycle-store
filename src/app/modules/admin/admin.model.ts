import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin, AdminModel>({
  id: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// adminSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await Admin.findOne({ id });
//   return existingUser;
// };
export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
