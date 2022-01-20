import React from "react";
import EditProductForm from "../components/EditProductForm";
import { useParams } from "react-router-dom";

function EditProduct() {
  const params = useParams();
  console.log(params.id);
  return (
    <>
      <main>
        <EditProductForm id={params.id} />
      </main>
    </>
  );
}

export default EditProduct;
