import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespons';
import { AdminService } from './admin.service';


const blockUser = catchAsync(async (req, res): Promise<void> => {
  const { userId } = req.params;

  const user = await AdminService.blockUserService(userId);

  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      statusCode: 404,
    });
    return;
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User blocked successfully',
    data: {},
  });
});

// const deleteBlog = catchAsync(async (req, res): Promise<void> => {
//   const { id } = req.params;

//   const blog = await AdminService.deleteAnyBlogService(id);

//   if (!blog) {
//     res.status(404).json({
//       success: false,
//       message: 'Blog not found',
//       statusCode: 404,
//     });
//     return;
//   }
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Blog deleted successfully',
//     data: {},
//   });
// });

export const AdminController = {
//   deleteBlog,
  blockUser,
};
