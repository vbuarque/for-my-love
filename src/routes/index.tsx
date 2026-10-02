import { Route, Routes } from "react-router";

import { Heart } from "@/pages/Heart/Heart";
import { Home } from "@/pages/Home/Home";
import { NotFound } from "@/pages/NotFound/NotFound";
import { SyncTool } from "@/pages/SyncTool/SyncTool";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Heart" element={<Heart />} />
      {/* Ferramenta de sincronização: existe só no `npm run dev`. */}
      {import.meta.env.DEV && <Route path="/sync" element={<SyncTool />} />}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
