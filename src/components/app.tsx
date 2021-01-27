import { FunctionalComponent, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import Home from "../routes/home";
import ListPage from "../routes/ListPage";
import NotFoundPage from "../routes/notfound";
import TodosProvider from "./context";
import Header from "./header";

const App: FunctionalComponent = () => {
  let currentUrl: string;
  const handleRoute = (e: RouterOnChangeArgs) => {
    currentUrl = e.url;
  };

  return (
    <div id="app">
      <TodosProvider>
        <Header />
        <Router onChange={handleRoute}>
          <Route path="/" component={Home} />
          <Route path="/list" component={ListPage} />
          <NotFoundPage default />
        </Router>
      </TodosProvider>
    </div>
  );
};

export default App;
