import React, { FunctionComponent, useState, useEffect } from "react";
// import './App.css';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Icon24LikeOutline from "@vkontakte/icons/dist/24/like_outline";
import Icon24CommentOutline from "@vkontakte/icons/dist/24/comment_outline";
import Icon28SettingsOutline from "@vkontakte/icons/dist/28/settings_outline";
import Icon56AddCircleOutline from "@vkontakte/icons/dist/56/add_circle_outline";

import Icon28UserOutline from "@vkontakte/icons/dist/28/user_outline";
import Icon28NewsfeedOutline from "@vkontakte/icons/dist/28/newsfeed_outline";
import Icon28SearchOutline from "@vkontakte/icons/dist/28/search_outline";
import Icon28LikeOutline from "@vkontakte/icons/dist/28/like_outline";
import { Button, Modal } from "react-bootstrap";
import pic from "../img/pic.jpg";

import { Block } from "../components/block";

import $ from "jquery";

export const Upload_modal = (props) => {
  function add_photo(e) {
    e.preventDefault();
    
    var photo = $("#photo").get(0).files[0];
    var fd = new FormData();

    fd.append("photo", $("#photo").get(0).files[0]);
    fd.append("photo", $("#description").val());
    console.log(photo);
    console.log($("#description").val());
    console.log(fd);
    $.ajax("/api/publication/", {
      method: "POST",
      data: fd,
      processData: false,
      contentType: false,
    })
      .done(function (data) {
        console.log("data", data);
      })
      .fail(function (data) {
        console.log("FAIL", data);
      });
  }

  return (
    <Modal show={props.modal == "upload"} onHide={() => props.setModal("")}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить публикацию</Modal.Title>
      </Modal.Header>
      <form onSubmit={(e) => add_photo(e)}>
        <Modal.Body>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="photo"
                required
                accept=".jpg, .jpeg, .png"
              />
              <label className="custom-file-label" htmlFor="photo">
                Загрузить фотографию
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="description">Описание</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
              ></textarea>
          </div>
          {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Отмена
              </button>
              <button type="button" className="btn btn-primary" type="submit">
                Сохранить
              </button>
            </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.setModal("")}>
            Отмена
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => props.setModal("")}
          >
            Сохранить
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
    // <div
    //   className="modal fade"
    //   id="upload_modal"
    //   tabIndex="-1"
    //   aria-labelledby="exampleModalLabel"
    //   aria-hidden="true"
    // >
    //   <div className="modal-dialog modal-dialog-centered">
    //     <div className="modal-content">
    //       {/* <form  method="post" enctype="multipart/form-data" action="/api/publication/" > */}
    //       <form onSubmit={(e)=>add_photo(e)}>
    //         <div className="modal-header">
    //           <h5 className="modal-title" id="exampleModalLabel">
    //             Добавить момент
    //           </h5>
    //           <button
    //             type="button"
    //             className="close"
    //             data-dismiss="modal"
    //             aria-label="Close"
    //           >
    //             <span aria-hidden="true">&times;</span>
    //           </button>
    //         </div>
    //         <div className="modal-body">
    //           <div className="custom-file">
    //             <input
    //               type="file"
    //               className="custom-file-input"
    //               id="photo"
    //               required
    //               accept=".jpg, .jpeg, .png"
    //             />
    //             <label
    //               className="custom-file-label"
    //               htmlFor="photo"
    //             >
    //               Загрузить фотографию
    //             </label>
    //           </div>
    //           <div className="form-group">
    //             <label htmlFor="description">Описание</label>
    //             <textarea
    //               className="form-control"
    //               id="description"
    //               rows="3"
    //             ></textarea>
    //           </div>
    //         </div>
    //         <div className="modal-footer">
    //           <button
    //             type="button"
    //             className="btn btn-secondary"
    //             data-dismiss="modal"
    //           >
    //             Отмена
    //           </button>
    //           <button type="button" className="btn btn-primary" type="submit">
    //             Сохранить
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export const ImgGrid = (props) => {
  return (
    <div className="card-columns">
      {props.images.map((this_pic, i) => (
        <div key={i} className="card">
          <img src={this_pic} className="card-img-top" alt="..." />
        </div>
      ))}
    </div>
  );
};


const MomentsCardCarosel = (props) => (
  <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      {props.pics.map((this_pic, i) =>
        <li key={i} data-target="#carouselExampleIndicators" data-slide-to={i} className={i === 0 ? "active" : ""}></li>
      )}
    </ol>
    <div className="carousel-inner">
      {props.pics.map((this_pic, i) =>
        <div key={i} className={i === 0 ? "carousel-item active" : "carousel-item"}>
          <img src={this_pic} className="d-block w-100" alt="..." />
        </div>)}
    </div>
    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
)

export const MomentsCard = () => (
  <div className="card mb-3">
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand d-flex" href="#">
        <img src={pic} className="ml-2" width="50" height="50" alt="" loading="lazy" />
        <div className="ml-2" >UserName</div>
      </a>
    </nav>
    <MomentsCardCarosel pics={[pic, pic, pic]} />
    <div className="card-body">
      <div className="d-flex" >
        <Icon24LikeOutline /><Icon24CommentOutline />
      </div>
      <h5 className="card-title">Нравится: 123</h5>
      <p className="card-text"><b>UserName</b> This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p className="card-text"><small className="text-muted">3 mins ago</small></p>
      <div className="d-flex" >
        <Link to="#" className="mr-2" >#tag</Link>
        <Link to="#" className="mr-2" >#tag</Link>
      </div>
      <p className="card-text text-muted">Посмотреть все комментарии (321)</p>
      <Block
        time="30 min"
        text="This is a wider card with supporting text below as a natural lead-in to additional content."
        user={{ avatar: pic, username: "UserName" }}
        level={0}
        count_likes={14}
        can_answer />
      <Block
        time="12 min"
        text="This is a wider card with supporting text below as a natural lead-in to additional content."
        user={{ avatar: pic, username: "UserName" }}
        level={1}
        count_likes={14} />
      <Block
        time="12 min"
        text="This is a wider card with supporting text below as a natural lead-in to additional content."
        user={{ avatar: pic, username: "UserName" }}
        level={2}
        can_answer />
      <Block
        time="11 min"
        text="This is a wider card with supporting text below as a natural lead-in to additional content."
        user={{ avatar: pic, username: "UserName" }}
        level={1}
        count_likes={14}
        can_answer />
    </div>
  </div>
)