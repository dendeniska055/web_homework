import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import $ from "jquery";
import { PublicationGridUrl } from "./Publication";

export function get_user_info(id, callbeck = null) {
  if (id == -1) return;
  $.ajax(`/api/profile/${id}`, {
    method: "GET",
  })
    .done(function (data) {
      // console.log("get_user_info data", data);
      callbeck(data);
    })
    .fail(function (data) {
      console.log("get_user_info FAIL", data.responseText);
      // ОБРАБОТАТЬ ОСТУТСВИЕ ИЛИ ОШИБКУ !!!!!!
    });
}

export const Profile = (props) => {
  props.setActivePanel("profile");
  const [id, setId] = useState(props.id ? props.id : props.myId);
  const myId = props.myId;
  const [profile, setProfile] = useState({});
  const [subscriptionId, setSubscriptionId] = useState(-1);
  const [publications, setPublications] = useState([]);

  function get_subscription_info(author_id, subscriber_id) {
    if (subscriber_id == -1 || subscriber_id == -1) return;
    $.ajax(`/api/subscription/?user=${author_id}&subscriber=${subscriber_id}`, {
      method: "GET",
    })
      .done(function (data) {
        console.log("get_subscription_info: ", data);
        if (data.count > 0) setSubscriptionId(data.results[0].id);
      })
      .fail(function (data) {
        console.log("get_subscription_info FAIL", data.responseText);
      });
  }

  function get_publications(id) {
    if (id == -1) return;
    $.ajax(`/api/publication/?user=${id}`, {
      method: "GET",
    })
      .done(function (data) {
        console.log("get_publications: ", data);
        setPublications(
          data.results.map((publication) => {
            return {
              id: publication.id,
              url: publication.photo,
            };
          })
        );
      })
      .fail(function (data) {
        console.log("get_publications FAIL", data.responseText);
      });
  }

  function subscribe(username) {
    $.ajax("/api/subscription/", {
      method: "POST",
      data: {
        subscriber: username,
      },
    })
      .done(function (data) {
        console.log("subscribe: ", data);
        setSubscriptionId(data.id);
      })
      .fail(function (data) {
        console.log("subscribe FAIL", data.responseText);
      });
  }

  function unsubscribe(id) {
    $.ajax(`/api/subscription/${id}`, {
      method: "DELETE",
    })
      .done(function (data) {
        console.log("unsubscribe: ", data);
        setSubscriptionId(-1);
      })
      .fail(function (data) {
        console.log("unsubscribe FAIL", data.responseText);
      });
  }

  useEffect(() => {
    get_user_info(id, (data) => {
      setProfile(data);
      setId(data.id);
    });
    if (id != myId) get_subscription_info(myId, id);
    get_publications(id);
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-auto">
          <img
            src={profile.photo}
            width="120"
            height="120"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="col-auto">
          <div className="d-flex">
            <h2>{profile.username && profile.username}</h2>
            {/* {id === myId && (
              <Link
                onClick={() => {
                  props.setModal("settings");
                }}
              >
                <Icon28SettingsOutline
                  className="ml-2"
                  width="40"
                  height="40"
                />
              </Link>
            )} */}
          </div>
          {id !== myId && myId !== -1 && (
            <div className="d-flex">
              {subscriptionId == -1 && (
                <input
                  className="btn btn-primary"
                  type="button"
                  value="Подписаться"
                  onClick={() => subscribe(profile.id)}
                />
              )}
              {subscriptionId != -1 && (
                <input
                  className="btn btn-outline-secondary"
                  type="button"
                  value="Отписаться"
                  onClick={() => unsubscribe(subscriptionId)}
                />
              )}
            </div>
          )}
        </div>
        <div>
          <p>{profile.description && profile.description}</p>
        </div>
      </div>
      <div className="mt-3">
        <PublicationGridUrl url={`/api/publication/?user=${id}`} />
        {/* <ImgGrid images={publications} /> */}
      </div>
    </>
  );
};

export const Setings_modal = (props) => {
  var a = (
    <div
      className="modal fade"
      id="setings_modal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Настройки
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="was-validated">
              <div className="form-group">
                <label htmlFor="inputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail1"
                  aria-describedby="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputNikname">Nikname</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputNikname"
                  aria-describedby="nikname"
                />
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="validatedInputGroupCustomFile"
                  required
                />
                <label
                  className="custom-file-label"
                  htmlFor="validatedInputGroupCustomFile"
                >
                  Выберите аватарку
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Отмена
            </button>
            <button type="button" className="btn btn-primary">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  console.log(props);
  const [id, setId] = useState(props.id ? props.id : props.myId);
  const [profile, setProfile] = useState({});

  function on_submit(e) {
    e.preventDefault();
  }
  return (
    <Modal show={props.modal == "settings"} onHide={() => props.setModal("")}>
      <Modal.Header closeButton>
        <Modal.Title>Настройки</Modal.Title>
      </Modal.Header>
      <form
        className="was-validated"
        id="settings"
        onSubmit={(e) => on_submit(e)}
      >
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="settingsEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="settingsEmail"
              aria-describedby="email"
              defaultValue={profile.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="settingUsername">Никнейм</label>
            <input
              type="text"
              className="form-control"
              id="settingUsername"
              aria-describedby="username"
              defaultValue={profile.username}
            />
          </div>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="settingsPhoto"
              required
              accept=".jpg, .jpeg, .png"
              defaultValue={profile.photo}
            />
            <label className="custom-file-label" htmlFor="settingsPhoto">
              Выберите аватарку
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.setModal("")}>
            Отмена
          </Button>
          <Button variant="primary" type="submit">
            Сохранить
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
