import { Routes, Route } from "react-router";
import {
  Dashboard,
  DashboardLayout,
  Home,
  LandingLayout,
  SendAsset,
  TransactionDetails,
} from "./pages";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/transaction/:id" element={<DashboardLayout />}>
          <Route index element={<TransactionDetails />} />
        </Route>
        <Route path="/send-asset" element={<DashboardLayout />}>
          <Route index element={<SendAsset />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
