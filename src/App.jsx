import * as React from "react";
import { Outlet, Link } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <h1>Kevin Smith</h1>
      <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}
