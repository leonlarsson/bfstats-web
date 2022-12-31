import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Privacy from "./components/Privacy";
import Tos from "./components/Tos";
import DevUser from "./components/DevUser";
import DevOutput from "./components/DevOutput";
import NotFound from "./components/NotFound";

export default () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<Home />} />
                    <Route path="privacy" element={<Privacy />} />
                    <Route path="tos" element={<Tos />} />
                    <Route path="dev-user" element={<DevUser />} />
                    <Route path="dev-output" element={<DevOutput />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};