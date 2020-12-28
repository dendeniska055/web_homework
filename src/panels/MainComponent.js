import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.jpg";

import Icon28UserOutline from "@vkontakte/icons/dist/28/user_outline";
import Icon28NewsfeedOutline from "@vkontakte/icons/dist/28/newsfeed_outline";
import Icon28SearchOutline from "@vkontakte/icons/dist/28/search_outline";
import Icon28LikeOutline from "@vkontakte/icons/dist/28/like_outline";
import { Icon28AddOutline } from "@vkontakte/icons";

import $ from "jquery";

export const Header = (props) => {
  function logout() {
    $.ajax("/rest_api/logout/", {
      method: "POST",
    })
      .done(function (data) {
        console.log("data", data);
        props.setMyId(-1);
        window.location.href = "/search";
      })
      .fail(function (data) {
        console.log("FAIL", data.responseText);
      });
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="/">
          <img src={logo} width="30" height="30" alt="" loading="lazy" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            {props.myId != -1 && (
              <>
                <li
                  className={
                    "nav-item" + (props.activePanel === "home" ? " active" : "")
                  }
                >
                  <Link className="nav-link d-sm-flex d-md-block" to="/">
                    <Icon28NewsfeedOutline className="mr-sm-2 m-md-auto" />
                    Лента
                  </Link>
                </li>
                <li
                  className={
                    "nav-item" +
                    (props.activePanel === "search" ? " active" : "")
                  }
                >
                  <Link className="nav-link d-sm-flex d-md-block" to="/search">
                    <Icon28SearchOutline className="mr-sm-2 m-md-auto" />
                    Поиск
                  </Link>
                </li>
                <li
                  className={
                    "nav-item" +
                    (props.activePanel === "profile" ? " active" : "")
                  }
                >
                  <Link className="nav-link d-sm-flex d-md-block" to="/profile">
                    <Icon28UserOutline className="mr-sm-2 m-md-auto" />
                    Профиль
                  </Link>
                </li>
                {/* <li
                  className={
                    "nav-item" +
                    (props.activePanel === "events" ? " active" : "")
                  }
                >
                  <Link className="nav-link d-sm-flex d-md-block" to="/events">
                    <Icon28LikeOutline className="mr-sm-2 m-md-auto" />
                    События
                  </Link>
                </li> */}
                <li className={"nav-item"}>
                  <a
                    className="nav-link d-sm-flex d-md-block"
                    onClick={() => props.setModal("upload")}
                  >
                    {/* <a className="nav-link d-sm-flex d-md-block" href="#upload_modal" data-toggle="modal" > */}
                    <Icon28AddOutline className="mr-sm-2 m-md-auto" />
                    Добавить
                  </a>
                </li>
              </>
            )}
            {/* <li className="nav-item">
              <a className="nav-link disabled" href="/users" tabIndex="-1" aria-disabled="true">Disabled</a>
            </li> */}
          </ul>
          {props.myId == -1 ? (
            <>
              <Link className="" to="/signin">
                <button className="btn btn-primary">Войти</button>
              </Link>
              <Link className="mx-3" to="/signup">
                <button className="btn btn-light">Регистрация</button>
              </Link>
            </>
          ) : (
            <button className="mr-2 btn btn-danger" onClick={logout}>
              Выйти
            </button>
          )}
          <form className="form-inline mt-2 mt-md-0">
            {/* <div className="input-group mr-sm-2">
              <div className="input-group-prepend">
                <span className="input-group-text">@</span>
                <span className="input-group-text">#</span>
              </div>
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="#Природа/@denis_vlas"
                aria-label="Search"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  search(e.target.value);
                }}
              />
            </div> */}
            {/* <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" /> */}
            {/* <Link to="/search">
              <button className="btn btn-outline-success m-0" type="submit">
                <Icon24Search />
              </button>
            </Link> */}
          </form>
        </div>
      </nav>
    </header>
  );
};
export const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <span className="text-muted">Place sticky footer content here.</span>
      </div>
    </footer>
  );
};
