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
import { ImgGrid, ImgCarosel } from "./Img";
import { FormItem } from "@vkontakte/vkui";
import { ChipsSelect } from "@vkontakte/vkui/dist/unstable";

import $ from "jquery";

export const MomentsCard = () => {
  return (
    <div className="card mb-3">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand d-flex" href="#">
          <img
            src={pic}
            className="ml-2"
            width="50"
            height="50"
            alt=""
            loading="lazy"
          />
          <div className="ml-2">UserName</div>
        </a>
      </nav>
      <ImgCarosel pics={[pic, pic, pic]} />
      <div className="card-body">
        <div className="d-flex">
          <Icon24LikeOutline />
          <Icon24CommentOutline />
        </div>
        <h5 className="card-title">Нравится: 123</h5>
        <p className="card-text">
          <b>UserName</b> This is a wider card with supporting text below as a
          natural lead-in to additional content. This content is a little bit
          longer.
        </p>
        <p className="card-text">
          <small className="text-muted">3 mins ago</small>
        </p>
        <div className="d-flex">
          <Link to="#" className="mr-2">
            #tag
          </Link>
          <Link to="#" className="mr-2">
            #tag
          </Link>
        </div>
        <p className="card-text text-muted">Посмотреть все комментарии (321)</p>
        <Block
          time="30 min"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          user={{ avatar: pic, username: "UserName" }}
          level={0}
          count_likes={14}
          can_answer
        />
        <Block
          time="12 min"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          user={{ avatar: pic, username: "UserName" }}
          level={1}
          count_likes={14}
        />
        <Block
          time="12 min"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          user={{ avatar: pic, username: "UserName" }}
          level={2}
          can_answer
        />
        <Block
          time="11 min"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          user={{ avatar: pic, username: "UserName" }}
          level={1}
          count_likes={14}
          can_answer
        />
      </div>
    </div>
  );
};

export const PublicationGridUrl = (props) => {
  // if (props.setUrl) {
  var url = props.url;
  // var setUrl = props.setUrl;
  // } else {
  // }
  // const [, setUrl] = useState(props.url);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [publications, setPublications] = useState([]);

  function get_publications(url) {
    $.ajax(url, {
      method: "GET",
    })
      .done(function (data) {
        console.log("PublicationGridUrl get_publications: ", data);
        setPublications(
          data.results.map((publication) => {
            return {
              id: publication.id,
              url: publication.photo,
            };
          })
        );
        setNext(data.next);
        setPrev(data.previous);
      })
      .fail(function (data) {
        // console.log("PublicationGridUrl get_publications FAIL", data.responseText);
      });
  }

  useEffect(() => {
    get_publications(url);
  }, [url]);

  return (
    <>
      <div className="mt-3">
        <ImgGrid images={publications} />
      </div>
      <div>
        {prev && (
          <Button onClick={() => get_publications(prev)} className="mr-4">
            Назад
          </Button>
        )}
        {next && <Button onClick={() => get_publications(next)}>Вперед</Button>}
        {/* {(
          <div className="container">
            <span className="text-muted">Нет публикаций.</span>
          </div>
        )} */}
      </div>
    </>
  );
};
