import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

const App = () => {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
};

export default App;