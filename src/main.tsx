import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReactSmartRating from "./ReactSmartRating";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReactSmartRating />
	</StrictMode>
);
