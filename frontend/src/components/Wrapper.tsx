import { Dispatch, useEffect, useState } from "react";
import Menu from "./Menu";
import Nav from "./Nav";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";

import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/userSlice";
import { useSelector } from "../redux/store";

const Wrapper = (props: any) => {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // TODO: called twice
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const { data } = await axios.get("user");

        dispatch(
          setUser(
            new User(
              data.id,
              data.first_name,
              data.last_name,
              data.email,
              data.role
            )
          )
        );
        setLoading(false);
      }
    } catch (e) {
      setRedirect(true);
    }
  };

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
