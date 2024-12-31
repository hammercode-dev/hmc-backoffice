import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./app/routes";
import { store } from "./app/store";
import { ConfigProvider } from "antd";
import { theme } from "./theme";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
