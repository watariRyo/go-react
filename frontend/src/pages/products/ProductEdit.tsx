import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

const ProductEdit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const id = parseInt(useParams<{ id: string }>().id!!);

  useEffect(() => {
    (async () => {
      if (isNaN(id)) {
        setRedirect(true);
        return;
      }

      const { data } = await axios.get(`products/${id}`);

      setTitle(data.title);
      setDescription(data.description);
      setImage(data.image);
      setPrice(data.price);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`products/${id}`, {
      title,
      description,
      image,
      price,
    });

    setRedirect(true);
  };

  const updateImage = (url: string) => {
    if (ref.current) {
      ref.current.value = url;
    }
    setImage(url);
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
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              defaultValue={description}
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
                ref={ref}
                disabled={true}
                defaultValue={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <ImageUpload uploaded={updateImage} />
            </div>
          </div>
        </div>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Price</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="number"
              defaultValue={price}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductEdit;
