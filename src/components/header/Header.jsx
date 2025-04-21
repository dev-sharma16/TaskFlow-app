import React from "react";
import {Container,Logo,LogoutBtn} from '../index'
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
          name: authStatus ? "Dashboard" : "Home",
          slug: authStatus ? "/dashboard" : "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "Add Task",
          slug: "/add-task",
          active: authStatus,
      },
    ]

    return (
        <header className="py-3 shadow bg-indigo-950 text-white">
            <Container>
                <nav className="flex items-center">
                  <div className="mr-4">
                    <Link to = '/'>
                    <Logo width="150px" height="50px" className="header-logo" />
                    </Link>
                  </div>
                  <ul className="flex ml-auto items-center gap-2">
                    {navItems.map((item) =>
                     item.active ? (
                        <li key={item.name}>
                            <button onClick={()=> navigate(item.slug)} className='inline-block px-5 py-2 text-sm font-medium rounded-full hover:bg-green-400 hover:text-white transition-all duration-200'>
                                {item.name}
                            </button>
                        </li>
                     ) : null
                    )}
                    {authStatus && (
                        <li>
                            <LogoutBtn/>
                        </li>
                    )}
                  </ul>
                </nav>
            </Container>
        </header>
    )
    
}

export default Header