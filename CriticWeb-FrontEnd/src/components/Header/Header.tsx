import React from 'react'
import "./Header.css"
import logo from "/assets/logo.png";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg teste">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <img src={logo} alt="Bootstrap" width="auto" height="70px"/>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-around" style={{ width: "100%" }}>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/critics">Criticas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/account">Conta</a>
            </li>
          </ul>
          <a className="nav-link" href="/account">
              <i className="bi bi-person-circle icon" ></i>
              </a>
        </div>
      </div>
    </nav>
  )
}

export default Header