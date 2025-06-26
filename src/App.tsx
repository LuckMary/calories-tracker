import { LocationProvider, Router, Route } from "preact-iso";

import Home from "./pages/Home";
import Recognition from "./pages/Recognition";
import NotFound from "./pages/_404";
import Tracker from "./pages/Tracker";
import { Layout } from "./components/Layout";

function App() {
  return (
    <LocationProvider>
      <Layout>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/tracker" component={Tracker} />
          <Route path="/recognition" component={Recognition} />
          <Route default component={NotFound} />
        </Router>
      </Layout>
    </LocationProvider>
  );
}

export default App;
