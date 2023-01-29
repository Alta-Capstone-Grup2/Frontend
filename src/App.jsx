import DashboardAdmin from "./pages/Admin/dashboardAdmin";
import ListOrderAdmin from "./pages/Admin/listOrder";
import Profile from "./pages/Admin/profile";
import VerifyPartner from "./pages/Admin/verifyPartner";
import Login from "./pages/login";
import AddService from "./pages/Partner/addService";
import ConfirmOrder from "./pages/Partner/confirmorder";
import Dashboard from "./pages/Partner/dashboard";
import EditService from "./pages/Partner/editService";
import ListOrder from "./pages/Partner/listOrder";
import RevisiRegister from "./pages/Partner/revisiRegister";
import RegisterPartner from "./pages/Partner/registerPartner";
import RegisterUser from "./pages/Clients/registerUser";
import PageNotFound from "./404";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Clients/Detail";
import OrderUser from "./pages/Clients/OrderUser";
import TransactionList from "./pages/Clients/TransactionList";
import Rating from "./pages/Clients/Rating";
import ProfileUser from "./pages/Clients/ProfileUser";
import Payment from "./pages/Clients/Payment";
import ProfilePartner from "./pages/Partner/profilePartner";
import AddAdditional from "./pages/Partner/addAdditional";
import EditAdditional from "./pages/Partner/editAdditional";
import ProfilePartnerUser from "./pages/Clients/ProfilePartnerUser";
import Discussion from "./pages/Partner/discussion";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./store/store";
import DetailTransaction from "./pages/Clients/DetailTransaction";
import ServiceAdditional from "./pages/Partner/ServiceAdditional";
import Oauth from "./pages/Oauth/oAuth";
import ValidationGoogle from "./pages/ValidationGoogle";
import About from "./pages/Clients/About";
import ListRegister from "./pages/Admin/listRegister";

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/oauth" element={<Oauth />} />
            <Route path="/login/oauth/google" element={<ValidationGoogle />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/orderuser" element={<OrderUser />} />
            <Route path="/transaction" element={<TransactionList />} />
            <Route path="/detail-transaction" element={<DetailTransaction />} />
            <Route path="/orderdetail" element={<Rating />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<ProfileUser />} />
            <Route path="/profilepartner" element={<ProfilePartnerUser />} />
            <Route path="/login" element={<Login role="admin" />} />
            <Route path="/register/user" element={<RegisterUser />} />
            <Route path="/register/partner" element={<RegisterPartner />} />
            <Route path="/admin/" element={<DashboardAdmin />} />
            <Route path="/admin/list-register" element={<ListRegister />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/list-order" element={<ListOrderAdmin />} />
            <Route path="/admin/verify-partner" element={<VerifyPartner />} />
            <Route path="/partner/" element={<Dashboard />} />
            <Route path="/partner/add-service" element={<AddService />} />
            <Route
              path="/partner/add-service-additional"
              element={<ServiceAdditional />}
            />
            <Route path="/partner/add-additional" element={<AddAdditional />} />
            <Route path="/partner/edit-service" element={<EditService />} />
            <Route
              path="/partner/edit-additional"
              element={<EditAdditional />}
            />
            <Route path="/partner/list-order" element={<ListOrder />} />
            <Route path="/partner/profile" element={<ProfilePartner />} />
            <Route path="/partner/confirm-order" element={<ConfirmOrder />} />
            <Route
              path="/partner/revisi-registrasi"
              element={<RevisiRegister />}
            />
            <Route path="/partner/discussion" element={<Discussion />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
