
import { User } from '../user/user.model';

const blockUserService = async (userId: string) => {
  const blockUser = User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
  return blockUser;
};

// const deleteAnyBlogService = async (blogId: string) => {
//   const blog = await Blog.findById(blogId);
//   if (!blog) {
//     throw new Error('Blog not found');
//   }

//   await blog.deleteOne();

//   return blog;
// };

export const AdminService = {
  blockUserService,
//   deleteAnyBlogService,
};
