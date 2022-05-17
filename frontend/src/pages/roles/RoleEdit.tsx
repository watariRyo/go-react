import React, { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Permission } from "../../models/permission";
import { Navigate, useParams } from "react-router-dom";
import { pipeline } from "stream";

const RoleEdit = (props: any) => {
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([] as number[]);
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const id = parseInt(useParams<{ id: string }>().id!!);

  useEffect(() => {
    (async () => {
      const response = await axios.get("permissions");

      setPermissions(response.data);

      const { data } = await axios.get(`roles/${id}`);

      setName(data.name);
      setSelected(data.permissions.map((p: Permission) => p.id));
    })();
  }, []);

  const check = (id: number) => {
    if (selected.some((i) => i === id)) {
      console.log("checked");
      setSelected(selected.filter((i) => i !== id));
    } else {
      console.log("unchecked");
      setSelected([...selected, id]);
    }
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`roles/${id}`, {
      name,
      permissions: selected,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/roles" />;
  }

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Permissions</label>
          <div className="col-sm-10">
            {permissions.map((p: Permission) => {
              return (
                <div className="form-check form-check-inline col-3" key={p.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={p.id}
                    checked={selected.some((s) => s === p.id)}
                    onChange={() => check(p.id)}
                  />
                  <label className="form-check-label">{p.name}</label>
                </div>
              );
            })}
          </div>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default RoleEdit;
