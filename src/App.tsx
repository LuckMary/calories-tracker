import { LocationProvider, Router, Route } from "preact-iso";

import Home from "./pages/Home";
import Recognition from "./pages/Recognition";
import NotFound from "./pages/_404";
import Tracker from "./pages/Tracker";

function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/tracker" component={Tracker} />
        <Route path="/recognition" component={Recognition} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}

export default App;
