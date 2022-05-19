import React, { SyntheticEvent, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

const ProductCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("products", {
      title,
      description,
      image,
      price,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/products" />;
  }

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Image</label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                className="form-control"
                disabled={true}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <ImageUpload uploaded={setImage} />
            </div>
          </div>
        </div>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Price</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductCreate;
