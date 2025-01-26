import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespons';
import { UserServices } from './user.service';


const createUser = catchAsync(async (req, res) => {
  const user = req.body;

  const result = await UserServices.createUserIntoDB(user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'create user successfully',
    data: { _id: result?._id, name: result?.name, email: result?.email },
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await UserServices.createAdminIntoDB(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

export const userController = {
  createUser,
  createAdmin,
};
