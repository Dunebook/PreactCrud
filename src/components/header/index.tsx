import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.scss";

const Header: FunctionalComponent = () => {
  return (
    <header class={style.header}>
      <h3>Codesource.io Tutorial - Preact TODO List app</h3>
      <nav>
        <Link activeClassName={style.active} href="/">
          Homepage
        </Link>
        <Link activeClassName={style.active} href="/list">
          My List
        </Link>
      </nav>
    </header>
  );
};

export default Header;
