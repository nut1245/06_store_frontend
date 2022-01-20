import React, {useState} from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from "reactstrap";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);   //คลิกให้ ย่อขยาย
    return (
        <div>
            <Navbar className='navbar navbar-expand-md navbar-dark fixed-top bg-dark' 
            expand="md">
                <NavbarBrand href='/'>Farmer Store</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className='mr-auto' navbar>
                        <NavItem>
                            <NavLink href='/'>รายชื่อสินค้า</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/add'>เพิ่มสินค้าใหม่</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Menu
