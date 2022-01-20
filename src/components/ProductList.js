import React, {useState, useEffect} from 'react';
import {Table,Container, row, Button, Row} from "reactstrap";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import swal from 'sweetalert';




function ProductList() {
    const [products, setProduct] = useState([]);
    const  updateProduct= () =>{
        axios.get("http://localhost:5000/api/products").then((response)=>{   //เอาค่าทำได้จาก URL ไปใส่ใน setProduct
            setProduct(response.data);                                       //set data
            console.log("Update Product list!!!")
        });
    };
    useEffect(()=>{
        updateProduct();
    },[]);

    const deleteProduct = (product) =>{
        swal({
            title: "คุณต้องการลบสินค้าตัวนี้ใช่ไหม  "+product.name+" ?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete("http://localhost:5000/api/products/"+product._id).then(
                    (response)=>{
                        console.log(response.data);
                        swal(" ระบบได้ทำการลบสินค้าเรียบร้อยแล้วค่ะ !", {
                            icon: "success",
                          });
                        updateProduct();
                    })  
            } else {
              swal("Your Product  is safe!");
            }
          });
    }

    return (
      <Container>
          <Row>
              <h3>รายชื่อสินค้า</h3>
          </Row>
          <Row>
              <Table>
                  <thead>
                      <tr>
                          <th>ชื่อสินค้า</th>
                          <th>หมวดหมู่สินค้า</th>
                          <th>ราคาสินค้า</th>
                          <th>แท็กสินค้า</th>
                      </tr>
                  </thead>
                  <tbody>
                      {products.map((product)=>{
                          return (
                              <tr key={product._id}>
                                  <td>{product.name}</td>
                                  <td>{product.category}</td>
                                  <td>{product.price + " บาท"}</td>
                                  <td>
                                      <Button color='info' href={"/edit/"+product._id} ><FontAwesomeIcon icon={faEdit} />แก้ไข</Button>
                                      {" "}
                                      <Button color="danger" onClick={()=>{
                                          deleteProduct(product)
                                      }}>
                                      <FontAwesomeIcon icon={faTrashAlt} />ลบ
                                      </Button>
                                  </td>
                              </tr>
                          );
                      })}
                  </tbody>
              </Table>
          </Row>
      </Container>  
    );
}

export default ProductList