import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";

const container = document.querySelector("#root");
const root = createRoot(container as any);

root.render(<App />);
