import type { FriendProps } from "@/types";
import type FriendsResponse from "@/types/response/FriendsResponseProps";

const mapFriends = (dbFriends: FriendsResponse[]): FriendProps[] => 
  dbFriends.map(f => ({
    id: f.id,
    friendId: f.friend_id,
    name: f.user_login,
    avatar: f.user_avatar,
    online: false,
}));

export default mapFriends;