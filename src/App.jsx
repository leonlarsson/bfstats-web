import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Privacy from "./components/Privacy";
import Tos from "./components/Tos";
import DevBrowseUsers from "./components/DevBrowseUsers";
import DevBrowseOutputs from "./components/DevBrowseOutputs";
import Data from "./components/Data";
import NotFound from "./components/NotFound";

export default () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<Home />} />
                    <Route path="privacy" element={<Privacy />} />
                    <Route path="tos" element={<Tos />} />
                    <Route path="dev-browse-users" element={<DevBrowseUsers />} />
                    <Route path="dev-browse-outputs" element={<DevBrowseOutputs />} />
                    <Route path="data" element={<Data />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};