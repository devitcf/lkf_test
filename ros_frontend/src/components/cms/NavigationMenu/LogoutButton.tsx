"use client";
import { Button } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions";

const LogoutButton = () => {
  const router = useRouter();

  const onClick = async () => {
    await logoutAction();
    router.refresh();
  };

  return (
    <>
      <Button
        onClick={onClick}
        sx={{
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 1,
          paddingBottom: 1,
          minWidth: 0,
          width: { xs: 40, sm: "100%" },
        }}
        variant="outlined"
      >
        <LogoutOutlinedIcon />
        <span className={"hidden md:block"}>Log out</span>
      </Button>
    </>
  );
};

export default LogoutButton;
