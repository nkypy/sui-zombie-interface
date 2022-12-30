import { Routes, Route } from "react-router-dom";

import { App } from "./App";
import { Home } from "./pages/Home";
import { ZombiePreview } from "./pages/ZombiePreview";
import { NotFound } from "./pages/NotFound";
import { MyZombie } from "./pages/MyZombie";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="my-zombie" element={<MyZombie />} />
                <Route path="zombie/:id" element={<ZombiePreview />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};