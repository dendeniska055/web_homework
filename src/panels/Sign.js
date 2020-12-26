import React, { FunctionComponent, useState, useEffect } from "react";
// import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import logo from "../img/logo.jpg";

import { DatePicker,FormStatus, FormItem } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import $ from "jquery";

export const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [secPassworD, setSecPassword] = useState('');

  function on_sign_in_submit(e) {
    e.preventDefault();
    $.ajax("/rest_api/login/", {
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    })
      .done(function (data) {
        console.log("data", data);
        props.setMyId(parseInt(data));
        window.location.href = "/profile";
      })
      .fail(function (data) {
        console.log("FAIL", data.responseText);
      });
  }
  return (
    <div className="text-center">
      <form className="form-signin" onSubmit={on_sign_in_submit}>
        <img className="mb-4" src={logo} alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Пожалуйста, войдите</h1>

        <div class="form-group">
          <label htmlFor="inputEmail" className="sr-only">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email"
            required
            autoFocus
          />
        </div>

        <div class="form-group">
          <label htmlFor="inputPassword" className="sr-only">
            Пароль
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Пароль"
            required
          />
        </div>
        {/* <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Запомнить
        </label>
        </div> */}
        <button className="mt-4 btn btn-lg btn-primary btn-block" type="submit">
          Войти
        </button>
        {/* <Link to="/signup"><button className="btn btn btn-outline-secondary btn-block" type="submit">Зарегистрироваться</button></Link> */}
      </form>
    </div>
  );
};

export const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState({ day: 2, month: 4, year: 1994 });
  // const [secPassworD, setSecPassword] = useState('');
  const [errorStatus, setErrorStatus] = useState({});

  function on_sign_up_submit(e) {
    e.preventDefault();
    $.ajax("/api/profile/", {
      method: "POST",
      data: {
        email: email,
        username: username,
        password: password,
        birthday: `${date.year}-${date.month}-${date.day}`,
      },
    })
      .done(function (data) {
        window.location.href = "/profile";
        console.log("data", data);
        props.setMyId(parseInt(data));
      })
      .fail(function (data) {
        console.log("FAIL", data);
        setErrorStatus(data.responseJSON)
      });
  }
  return (
    <div className="text-center">
      <form className="form-signup" onSubmit={on_sign_up_submit}>
        <img className="mb-4" src={logo} alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Регистрация</h1>

        {errorStatus.username && (
          <FormStatus className="mb-3" header="Никнейм" mode="error">
            {errorStatus.username}
          </FormStatus>
        )}
        <div class="form-group">
          <label htmlFor="inputNikname" className="sr-only">
            Никнейм
          </label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            type="text"
            id="inputNikname"
            className="form-control"
            placeholder="Никнейм"
            required
            autoFocus
          />
        </div>

        {errorStatus.email && (
          <FormStatus className="mb-3" header="Email" mode="error">
            {errorStatus.email}
          </FormStatus>
        )}
        <div class="form-group">
          <label htmlFor="inputEmail" className="sr-only" id="email">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email"
            required
          />
        </div>

        {errorStatus.password && (
          <FormStatus className="mb-3" header="Пароль" mode="error">
            {errorStatus.password}
          </FormStatus>
        )}
        <div class="form-group">
          <label htmlFor="inputPassword" className="sr-only">
            Пароль
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Пароль"
            required
          />
          {/* <label htmlFor="repeatInputPassword" className="sr-only">
            Повторите пароль
          </label>
          <input
            onChange={(e) => {
              setSecPassword(e.target.value);
            }}
            value={secPassword}
            type="password"
            id="repeatInputPassword"
            className="form-control"
            placeholder="Повторите пароль"
            required
          /> */}
        </div>
        {errorStatus.date && (
          <FormStatus className="mb-3" header="Дата рождения" mode="error">
            {errorStatus.date}
          </FormStatus>
        )}
        <div id="top-container" className="vkui__root">
          <div class="form-group">
            Дата рождения:
            <DatePicker
              min={{ day: 1, month: 1, year: 1901 }}
              max={{ day: 1, month: 1, year: 2006 }}
              defaultValue={{ day: 2, month: 4, year: 1994 }}
              value={date}
              onDateChange={(value) => setDate(value)}
            />
          </div>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
