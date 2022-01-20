import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

function EditProductForm({ id }) {
  const initProductState = {
    name: "",
    category: "",
    price: "",
    tags: [],
  };
  const [product, setProduct] = useState(initProductState); //กำหนดค่าเริ่มต้นของ state
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/" + id)
      .then((response) => {
          setProduct(response.data);
      });
  }, [id]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    if (name == "tags") {
      value = value.split(",");
    }
    setProduct({ ...product, [name]: value }); //... = Specoperater
  };
  const saveProduct = () => {
    //เตรียมข้อมูล
    const param = {
      name: product.name,
      category: product.category,
      price: product.price,
      tags: product.tags,
    };
    //เรียกใช้ API
    axios
      .put("http://localhost:5000/api/products/"+product._id, param)
      .then((response) => {
        console.log(response.data);
        setProduct({...product, param }); //เคลียข้อความในแบบฟอม
        setSubmitted(true); //เซ็ตให้ถูกต้อง
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const newProduct = () => {
    setSubmitted(false);
  };

  return (
    <Container>
      <Row>
        <h3>แก้ไขสินค้า</h3>
      </Row>

      {submitted ? (
        <>
          <Alert>ระบบได้ทำการแก้ไขสินค้าตัวใหม่สำเร็จ !!</Alert>
          <Button className="btn btn-success" onClick={newProduct}>
            ok
          </Button>
        </>
      ) : (
        <Row>
          <Form>
            <FormGroup>
              <Label for="productName">ชื่อสินค้า</Label>
              <Input
                type="text"
                name="name"
                id="productName"
                value={product.name || ""}
                onChange={handleInputChange}
                placeholder="Enter Product Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="productCategory">หมวดหมู่สินค้า</Label>
              <Input
                type="text"
                name="category"
                id="productCategory"
                value={product.category || ""}
                onChange={handleInputChange}
                placeholder="Enter Product Category"
              />
            </FormGroup>
            <FormGroup>
              <Label for="productPrice">ราคาสินค้า</Label>
              <Input
                type="text"
                name="price"
                id="productPrice"
                value={product.price || ""}
                onChange={handleInputChange}
                placeholder="Enter Product Price"
              />
            </FormGroup>
            <FormGroup>
              <Label for="productTags">แท็กสินค้า</Label>
              <Input
                type="text"
                name="tags"
                id="productTags"
                value={product.tags || ""}
                onChange={handleInputChange}
                placeholder="Enter Product Tags"
              />
            </FormGroup>
            <Button className="btn btn-success" onClick={saveProduct}>
              แก้ไข
            </Button>
          </Form>
        </Row>
      )}
    </Container>
  );
}

export default EditProductForm;
