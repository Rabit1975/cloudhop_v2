import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Dashboard } from "./components/Dashboard";
import { GamesLibrary } from "./components/GamesLibrary";
import { Profile } from "./components/Profile";
import { Friends } from "./components/Friends";
import { Store } from "./components/Store";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "library", Component: GamesLibrary },
      { path: "store", Component: Store },
      { path: "friends", Component: Friends },
      { path: "profile", Component: Profile },
    ],
  },
]);
