import { createRoot } from "react-dom/client";
import { App } from "@/app/App";

// biome-ignore lint/style/noNonNullAssertion: default react root mount operation
createRoot(document.getElementById("root")!).render(<App />);
