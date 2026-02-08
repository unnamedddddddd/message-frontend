import { getServers } from "@/api/chat";
import type { ServerProps } from "@/types";
import { mapServers } from "@/utils";
import { useCallback, useEffect, useState } from "react";

const useServers = () => {
  const [servers, setServers] = useState<ServerProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadServers = useCallback(async () => {
     setIsLoading(true); 
    try {
      const res = await getServers();
      if (res.success) setServers(mapServers(res.servers));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServers();
  }, [loadServers])

  return { servers, isLoading };
}

export default useServers;