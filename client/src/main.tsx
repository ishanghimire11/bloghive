import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistedStore, store } from "@/redux/store.ts";

import App from "@/App.tsx";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PersistGate persistor={persistedStore}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
