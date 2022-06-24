import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./component/Home";
import Footer from "./component/layout/Footer";
import NotFound from "./component/errors/NotFound";
import NewContact from "./component/contacts/FormContact";
import { ToastContainer } from "react-toastify";
import ListContact from "./component/contacts/ListContact";
import Login from "./component/login/Login";
import React, { useState, useEffect } from "react";
import PrivateRoute from "./component/private-route/PrivateRoute";
import ChangePassword from "./component/users/ChangePassword";
import ImportContacts from "./component/contacts/ImportContacts";
import {
  getCookies,
  removeCookies,
  setCookies,
} from "./component/services/PlineTools";
import SipTrunkList from "./component/sip/sip-trunks/SipTrunkList";
import SipTrunkForm from "./component/sip/sip-trunks/SipTrunkForm";
import UserGroupForm from "./component/sip/sip-user-groups/UserGroupForm";
import UserGroupList from "./component/sip/sip-user-groups/UserGroupList";
import SipUserForm from "./component/sip/sip-user/SipUserForm";
import SipUserList from "./component/sip/sip-user/SipUserList";
import SipProfilesList from "./component/sip/sip-profiles/SipProfilesList";
import SipProfileForm from "./component/sip/sip-profiles/SipProfileForm";
import SipProfileDetails from "./component/sip/sip-profile-details/SipProfileDetails";
import SipProfileParameters from "./component/sip/sip-profile-parameters/SipProfileParameters";
import SipProfileParameterForm from "./component/sip/sip-profile-parameters/SipProfileParameterForm";
import SystemVariables from "./component/system-variables/SystemVariables";
import SystemVariableForm from "./component/system-variables/SystemVariableForm";
const App = () => {
  const navigate = useNavigate();
  const [, setState] = useState({ menuHide: false });

  useEffect(() => {
    setState({ menuHide: getCookies("isAuth") });
  }, []);

  const login = (result) => {
    setCookies("auth", true);
    setCookies("username", result.username);
    setCookies("user_id", result.user_id);
    setCookies("token", result.token);
    setState({});
    navigate("/");
  };

  const logout = () => {
    removeCookies("auth");
    removeCookies("username");
    removeCookies("token");
    removeCookies("user_id");

    setCookies("name", "");
    setCookies("username", "");
    setCookies("token", "");
    setCookies("user_id", "");

    setState({});
    navigate("/login");
  };

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        ltr
        pauseOnFocusLoss
        draggable
        pauseOnHover
        Row
        theme="colored"
      />
      <Container style={{ paddingBottom: "3.5vw" }}>
        <Routes>
          <Route element={<PrivateRoute LogoutAction={logout} />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact/create" element={<NewContact />} />
            <Route path="/contact/edit/:id" element={<NewContact />} />
            <Route path="/contact/index" element={<ListContact />} />
            <Route path="/contact/import" element={<ImportContacts />} />
            <Route path="/user/change-password" element={<ChangePassword />} />
            <Route path="/spp/index" element={<SipProfileParameters />} />
            <Route path="/spp/create" element={<SipProfileParameterForm />} />
            <Route path="/spp/edit/:id" element={<SipProfileParameterForm />} />
            <Route path="/variables/index" element={<SystemVariables />} />
            <Route path="/variables/create" element={<SystemVariableForm />} />
            <Route
              path="/variables/edit/:id"
              element={<SystemVariableForm />}
            />

            <Route
              path="/sip-profile-details/:id"
              element={<SipProfileDetails />}
            />
            <Route path="/sip-trunks/index" element={<SipTrunkList />} />
            <Route path="/sip-trunks/create" element={<SipTrunkForm />} />
            <Route path="/sip-trunks/edit/:id" element={<SipTrunkForm />} />
            <Route path="/sip-user-groups/create" element={<UserGroupForm />} />
            <Route
              path="/sip-user-groups/edit/:id"
              element={<UserGroupForm />}
            />
            <Route path="/sip-user-groups/index" element={<UserGroupList />} />
            <Route path="/sip-users/index" element={<SipUserList />} />
            <Route path="/sip-users/edit/:id" element={<SipUserForm />} />
            <Route path="/sip-users/create" element={<SipUserForm />} />
            <Route path="/sip-profiles/index" element={<SipProfilesList />} />
            <Route path="/sip-profiles/create" element={<SipProfileForm />} />
            <Route path="/sip-profiles/edit/:id" element={<SipProfileForm />} />
          </Route>

          <Route path="/login" element={<Login LoginAction={login} />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/notfound" />} />
        </Routes>
        <Footer />
      </Container>
    </div>
  );
};

export default App;
