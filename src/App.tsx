import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Menu } from "antd";
import { DatabaseFilled, HomeFilled, InboxOutlined, LogoutOutlined, NotificationFilled, SecurityScanFilled, SettingOutlined, UsergroupDeleteOutlined } from "@ant-design/icons";
import HomePage from "./pages/home";
import { BlogPostEdit } from "./pages/blog-posts";
import UsersPage from "./pages/users";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={notificationProvider}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            routerProvider={routerBindings}
            resources={[]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2
                      Header={() => <Header sticky />}
                      Sider={(props, logout) => (
                        <ThemedSiderV2
                          render={(logout) => {
                            return (
                              <>
                                <Menu.Item key="home" icon={<HomeFilled />}>
                                  <Link to={"/"}>Home</Link>
                                </Menu.Item>

                                <Menu.Item key="users" icon={<UsergroupDeleteOutlined />}>
                                  <Link to={"/users"}>Users</Link>
                                </Menu.Item>


                                <Menu.Item key="posts" icon={<InboxOutlined />}>
                                  <Link to={"/posts"}>Posts</Link>
                                </Menu.Item>

                                <Menu.Item key="analytics" icon={<DatabaseFilled />}>
                                  <Link to={"/analytics"}>Analytics</Link>
                                </Menu.Item>

                                <Menu.Item key="notifications" icon={<NotificationFilled />}>
                                  <Link to={"/notifications"}>Notifications</Link>
                                </Menu.Item>

                                <Menu.Item key="settings" icon={<SettingOutlined />}>
                                  <Link to={"/settings"}>Settings</Link>
                                </Menu.Item>

                                <Menu.Item key="security" icon={<SecurityScanFilled />}>
                                  <Link to={"/security"}>Security</Link>
                                </Menu.Item>

                                <Menu.Item key="logout" icon={<LogoutOutlined />}>
                                  <Link to={"/logout"}>Logout</Link>
                                </Menu.Item>



                              </>
                            );
                          }}
                        />
                      )}
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          text="Insight"
                          icon={<AppIcon />}
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
           

                <Route path="/" element={<HomePage/>} />
                <Route path="/users" element={<UsersPage/>} />

                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>

            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
