import type { FindUserProps, FindUserResponseProps } from "@/types";

const mapFindUsers = (dbFriends: FindUserResponseProps[]): FindUserProps[] => 
  dbFriends.map(user => ({
    userId: user.user_id,
    userLogin: user.user_login,
    userAvatar: user.user_avatar,
}));

export default mapFindUsers;