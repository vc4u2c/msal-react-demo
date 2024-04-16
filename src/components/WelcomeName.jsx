import Typography from "@mui/material/Typography";
import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";

export const WelcomeName = () => {
  const { instance } = useMsal();
  const [userName, setuserName] = useState("");
  useEffect(() => {
    const currentAccount = instance.getActiveAccount();
    if (currentAccount) {
      setuserName(currentAccount.name);
    }
  }, [instance]);
  return <Typography variant="h6">Welcome, {userName}</Typography>;
};
