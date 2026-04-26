import type { MembersProps, MembersResponseProps } from "@/types";

const mapMembers = (dbFriends: MembersResponseProps[]): MembersProps[] => 
  dbFriends.map(m => ({
    id: m.user_id,
    name: m.user_login,
    avatar: m.user_avatar
}));

export default mapMembers;