import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SupabaseProvider } from "/src/integrations/supabase/index.js";
import { SupabaseAuthProvider } from "/src/integrations/supabase/auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SupabaseProvider>
      <SupabaseAuthProvider>
        <App />
      </SupabaseAuthProvider>
    </SupabaseProvider>
  </React.StrictMode>,
);
