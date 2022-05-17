import { type } from "os";
import React, { FC, ReactNode, useEffect, useState } from "react";
import Menu from "./Menu";
import Nav from "./Nav";
import axios from "axios";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const Wrapper: React.FC<Props> = (props) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("user");
      } catch (e) {
        setRedirect(true);
      }
    })();
  }, []);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Nav />

      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
