// import mongoose from 'mongoose';
import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import { Admin } from '../admin/admin.model';
import { TAdmin } from '../admin/admin.interface';


// import AppError from '../../errors/AppError';

const createUserIntoDB = async (payload: TUser) => {
  // const {name,email,password} = payload
  const newUser = await User.create(payload);
  return newUser;
};

const createAdminIntoDB = async (payload: TAdmin) => {
  if (!payload) {
    throw new AppError(401, 'Payload is missing.');
  }

  // Ensure payload contains the required fields
  if (!payload.name || !payload.email) {
    throw new AppError(401, 'Missing required fields: `name` and `email`.');
  }

  const userData: Partial<TUser> = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: 'admin',
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create user
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(401, 'Failed to create user');
    }

    // Link user to admin
    payload.user = newUser[0]._id;

    // Create admin
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(401, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const UserServices = {
  createUserIntoDB,
  createAdminIntoDB,
};
