import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  FormText,
  Progress,
} from "reactstrap";

function AddProductForm() {
  const initProductState = {
    name: "",
    category: "",
    price: "",
    tags: [],
    flie: "",
    imageURL:"",
  };
  // const [product, setProduct] = useState(initProductState); //กำหนดค่าเริ่มต้นของ state
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFileToFirebase = async (file) => {
    //Prepare unique file name
    const userId = "001";
    const timestamp = Math.floor(Date.now() / 1000);
    const newName = userId + "_" + timestamp;

    //uploading file
    const storageRef = ref(storage, `images/${newName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    //get URL
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(uploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          saveProduct(downloadURL);
        });
      }
    );
  };

  const FILE_SIZE = 2000 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/jpg",
  ];
  const formik = useFormik({
    //รับ ofject เข้ามา

    initialValues: initProductState,
    validationSchema: yup.object().shape({
      name: yup.string().required("กรุณากรอกข้อมูลด้วยคะ !"),
      category: yup.string().required("กรุณากรอกข้อมูลด้วยคะ !"),
      price: yup
        .number("กรุณากรอกเป็นตัวเลข !")
        .positive("ไม่สามารถติดลบได้ตะ !")
        .required("กรุณากรอกข้อมูลให้ถูกต้องด้วยค่ะ"),
      tags: yup.string(),
      file: yup
        .mixed()
        .test("fileSize", "ไฟล์มีขนาดใหญ่เกินไป", (file) => {
          if (file) {
            return file?.size <= FILE_SIZE;
          } else {
            return true;
          }
        })
        .test("fileType", "อัพโหลดได้เฉพาะรูปภาพเท่านั้น", (file) => {
          if (file) {
            return SUPPORTED_FORMATS.includes(file?.type);
          } else {
            return true;
          }
        }),
    }), // TODO
    onSubmit: () => {
      //เมื่อผ่านเงื่อนไข
      if (formik.values.file) {
        //เช็คว่ามีรูปมารึป่าวถ้าไม่มีไม่ต้องเรียกใช้การอัพโหลดรูป
        console.log("Upload ");
        uploadFileToFirebase(formik.values.file);
      } else {
        saveProduct("");
      }
    },
  });

  // const handleInputChange = (event) => {
  //   let { name, value } = event.target;
  //   if (name == "tags") {
  //     value = value.split(",");
  //   }
  //   setProduct({ ...product, [name]: value }); //... = Specoperater
  // };
  const saveProduct = (url) => {
    //เตรียมข้อมูล
    const param = {
      name: formik.values.name,
      category: formik.values.category,
      price: formik.values.price,
      tags: formik.values.tags,
      imageURL:url,
    };
    //เรียกใช้ API
    axios
      // .post("http://localhost:5000/api/products", param)
      
      .post("https://product-api-012.herokuapp.com/api/products/", param)
      .then((response) => {
        console.log(response.data);
        // setProduct(initProductState); //เคลียข้อความในแบบฟอม
        setSubmitted(true); //เซ็ตให้ถูกต้อง
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const newProduct = () => {
    // setProduct(initProductState);
    setSubmitted(false);
  };

  return (
    <Container>
      <Row>
        <h3>เพิ่มสินค้าใหม่</h3>
      </Row>

      {submitted ? (
        <>
          <Alert>ระบบได้ทำการเพิ่มสินค้าตัวใหม่สำเร็จ !!</Alert>
          <Button className="btn btn-success" onClick={newProduct}>
            เพิ่มสินค้าใหม่
          </Button>
        </>
      ) : (
        <Row>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Label for="productName">ชื่อสินค้า</Label>
              <Input
                type="text"
                name="name"
                id="productName"
                value={formik.values.name || ""}
                onChange={formik.handleChange}
                placeholder="Enter Product Name"
              />
              {formik.errors.name && formik.touched.name && (
                <p>{formik.errors.name}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="productCategory">หมวดหมู่สินค้า</Label>
              <Input
                type="text"
                name="category"
                id="productCategory"
                value={formik.values.category || ""}
                onChange={formik.handleChange}
                placeholder="Enter Product Category"
              />
              {formik.errors.category && formik.touched.category && (
                <p>{formik.errors.category}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="productPrice">ราคาสินค้า</Label>
              <Input
                type="text"
                name="price"
                id="productPrice"
                value={formik.values.price || ""}
                onChange={formik.handleChange}
                placeholder="Enter Product Price"
              />
              {formik.errors.price && formik.touched.price && (
                <p>{formik.errors.price}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="productTags">แท็กสินค้า</Label>
              <Input
                type="text"
                name="tags"
                id="productTags"
                value={formik.values.tags || ""}
                onChange={formik.handleChange}
                placeholder="Enter Product Tags"
              />
              {formik.errors.tags && formik.touched.tags && (
                <p>{formik.errors.tags}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="fileupload">Product Image</Label>
              <Input
                type="file"
                name="file"
                onChange={(event) => {
                  formik.setFieldValue("file", event.currentTarget.files[0]);
                }}
              />
              <FormText color="muted">
                รองรับเฉพาะไฟล์ภาพและขนาดต้องไม่เกิน 2MB
              </FormText>
              {formik.errors.file && formik.touched.file && (
                <p>{formik.errors.file}</p>
              )}

              {progress != 0 && (
                <Progress value={progress} max="100" animated>
                  {progress} %
                </Progress>
              )}
            </FormGroup>
            <Button className="btn btn-success">เพิ่มสินค้า</Button>
          </Form>
        </Row>
      )}
    </Container>
  );
}

export default AddProductForm;
