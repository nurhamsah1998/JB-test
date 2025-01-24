import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import DashboardLayout from "./components/dashboard-layout";
import { profile, useAtom } from "@/store/store";
import useFetch from "./hooks/useFetch";
import HeaderNavbar from "./components/header-navbar";

function App() {
  const cookie = new Cookies();
  const token = cookie.get("access_token");
  const [, setProfile] = useAtom(profile);
  // eslint-disable-next-line no-empty-pattern
  const {} = useFetch({
    api: "/my-profile",
    /// IF INVALIDATE HAS "_none " WHICH MEAN IS DISABLED INVALIDATE
    invalidateKey: "/my-profile_none",
    afterSuccess: (res) => {
      const { id, email, name, is_admin } = res.data?.data || {};
      setProfile({ id, email, name, is_admin });
    },
    enabled: Boolean(token),
  });
  return token ? (
    <div>
      <HeaderNavbar />
      <DashboardLayout />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;
