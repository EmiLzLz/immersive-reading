"use client";

import { useEffect } from "react";
import { toast } from "sonner";

interface LogoutToastProps {
  loggedOut: boolean;
}

function LogoutToast({ loggedOut }: LogoutToastProps) {

  useEffect(() => {
    if (loggedOut) {
      toast.success("You logged out successfuylly");
    } 
  }, [loggedOut]);

  return null;
}

export default LogoutToast;
