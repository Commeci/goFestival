import { Outlet, useLocation } from "react-router-dom";
import { Header, Navigation } from "./components";

function App() {
    const location = useLocation();
    const isSearchPage = location.pathname.startsWith("/search");
    return (
        <div className="max-w-[480px] mx-auto w-full bg-white p-0 flex-col relative dark:bg-custom-darkmode ">
            {!isSearchPage && <Header />}
            <main className="flex-grow overflow-auto pt-header-height pb-navigation-height px-3 dark:bg-custom-darkmode">
                <Outlet />
            </main>
            <Navigation />
        </div>
    );
}
export default App;
