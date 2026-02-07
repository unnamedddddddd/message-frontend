import type { ServerProps, ServerResponse } from "@/interfaces";

const mapServers = (dbServers: ServerResponse[]): ServerProps[] => 
  dbServers.map(s => ({
    serverId: s.server_id,
    name: s.server_name,
    avatar: s.server_avatar
}));

export default mapServers;