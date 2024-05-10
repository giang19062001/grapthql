import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import { Outlet, useLoaderData } from "react-router-dom";
import Notification from "../components/Notification";

const Home = () => {

  const {folders} = useLoaderData() 
  // lấy dữ liệu  khi vừa vào trang của route trong file router/index.jsx 
  // ( thay thế cho cách useFfect call api )

  return (
    <div>
      <Typography variant="h4" sx={{ mb: "20px" }}>
        NOTE APP
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems:"center", my: 5 }}>
        <UserMenu></UserMenu>
        <Notification></Notification>
      </Box>
      <Paper sx={{ padding: 2 }}>
        <Grid container sx={{ height: "50vh" }}>
          <Grid item xs={3} sx={{ height: "100%" }}>
            <FolderList
              folders={folders}
            />
          </Grid>
          <Grid item xs={9} sx={{ height: "100%" }}>
            <Outlet />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Home;
