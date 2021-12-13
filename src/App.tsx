import * as React from "react";
import "@fontsource/m-plus-rounded-1c/400.css";
import "@fontsource/m-plus-rounded-1c/700.css";
import { ChakraProvider, Box, Grid } from "@chakra-ui/react";
import theme from "./Theme";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import UserAuthRoute from "./components/routers/UserAuthRoute";
import UserLoginRoute from "./components/routers/UserLoginRoute";
import UserLogoutButton from "./components/common/UserLogoutButton";
import AdminAuthRoute from "./components/routers/AdminAuthRoute";
import AdminLoginRoute from "./components/routers/AdminLoginRoute";

import Home from "./pages/Home";
import Greeting from "./pages/Greeting";
import Stage from "./pages/Stage";
import Staff from "./pages/Staff";
import Gallery from "./pages/Gallery";
import KirariGallery from "./pages/KirariGallery";
import TGallery from "./pages/TGallery";
import SpecialEvent from "./pages/SpecialEvent";
import UserLogin from "./pages/UserLogin";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLogout from "./pages/admin/AdminLogout";
import AdminHome from "./pages/admin/AdminHome";
import GalleryEdit from "./pages/admin/GalleryEdit";
import StageEdit from "./pages/admin/StageEdit";
import StaffEdit from "./pages/admin/StaffEdit";
import TGalleryEdit from "./pages/admin/TGalleryEdit";

import { UserAuthProvider } from "./contexts/UserAuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import WithSubnavigation from "./components/layouts/Header";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <UserAuthProvider>
        <AdminAuthProvider>
          <WithSubnavigation />
          <Box textAlign="center" fontSize="xl">
            <Grid p={3}>
              {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <UserLoginRoute
                  path="/user_login"
                  component={UserLogin}
                ></UserLoginRoute>
                <UserAuthRoute
                  path="/greeting"
                  component={Greeting}
                ></UserAuthRoute>
                <UserAuthRoute path="/stage" component={Stage}></UserAuthRoute>
                <UserAuthRoute path="/staff" component={Staff}></UserAuthRoute>
                <UserAuthRoute
                  path="/gallery"
                  component={Gallery}
                ></UserAuthRoute>
                <UserAuthRoute
                  path="/kirari_gallery"
                  component={KirariGallery}
                ></UserAuthRoute>
                <UserAuthRoute
                  path="/t_gallery"
                  component={TGallery}
                ></UserAuthRoute>
                <UserAuthRoute
                  path="/special"
                  component={SpecialEvent}
                ></UserAuthRoute>
                <AdminLoginRoute
                  path="/admin_login"
                  component={AdminLogin}
                ></AdminLoginRoute>
                <AdminAuthRoute
                  path="/admin"
                  component={AdminHome}
                ></AdminAuthRoute>
                <AdminAuthRoute
                  path="/gallery_edit/:id"
                  component={GalleryEdit}
                ></AdminAuthRoute>
                <AdminAuthRoute
                  path="/stage_edit/:id"
                  component={StageEdit}
                ></AdminAuthRoute>
                <AdminAuthRoute
                  path="/staff_edit/:id"
                  component={StaffEdit}
                ></AdminAuthRoute>
                <AdminAuthRoute
                  path="/tgallery_edit/:id"
                  component={TGalleryEdit}
                ></AdminAuthRoute>
                <AdminAuthRoute
                  path="/admin_logout"
                  component={AdminLogout}
                ></AdminAuthRoute>
                <Redirect to="/"></Redirect>
              </Switch>
            </Grid>
            <UserLogoutButton />
          </Box>
        </AdminAuthProvider>
      </UserAuthProvider>
    </BrowserRouter>
  </ChakraProvider>
);
