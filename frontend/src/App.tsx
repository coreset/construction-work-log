import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "14px",
            borderRadius: "6px",
            // Toast colours read from CSS variables so they also theme correctly
            background: "var(--color-bg-component)",
            color: "var(--color-text-heading)",
            border: "1px solid var(--color-border)",
          },
          success: {
            style: {
              background: "var(--color-success-bg)",
              border: "1px solid var(--color-success-border)",
              color: "var(--color-text-heading)",
            },
          },
          error: {
            style: {
              background: "var(--color-error-bg)",
              border: "1px solid var(--color-error-border)",
              color: "var(--color-text-heading)",
            },
          },
        }}
      />
      <AppRoutes />
    </>
  );
}
