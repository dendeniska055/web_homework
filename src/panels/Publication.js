import React, { FunctionComponent, useState, useEffect } from "react";
// import './App.css';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import {
  Icon36LikeOutline,
  Icon36Like,
  Icon28CommentOutline,
} from "@vkontakte/icons";
import { Button, Modal } from "react-bootstrap";
import pic from "../img/pic.jpg";

import { Block } from "../components/block";
import { ImgGrid, ImgCarosel } from "./Img";
import { get_user_info } from "./Profile";
import { Avatar } from "@vkontakte/vkui";
import { ChipsSelect } from "@vkontakte/vkui/dist/unstable";

import $, { timers } from "jquery";

var date_options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

function timeToStringByTime(date) {
  if (typeof date === "string") date = new Date(date);
  var time_diff = (new Date() - date) / 1000;
  if (time_diff < 60) return Math.floor(time_diff) + " сек назад";
  else if (time_diff / 60 < 60)
    return Math.floor(time_diff / 60) + " мин назад";
  else if (time_diff / 60 / 60 < 24)
    return Math.floor(time_diff / 60 / 60) + " часов назад";
  else if (time_diff / 60 / 60 / 24 < 7)
    return Math.floor(time_diff / 60 / 60 / 24) + " дней назад";
  else return date.toLocaleString("ru", date_options);
}

export const Publication = (props) => {
  props.setActivePanel("publication");
  const [publicationInfo, setPublicationInfo] = useState();
  const [tags, setTags] = useState([]);
  const [likes, setLikes] = useState();
  const [usersInfo, setUsersInfo] = useState({ avatar: "", username: "" });
  const [publicationData, setPublicationData] = useState();

  function get_likes(id) {
    $.ajax(`/api/publication/${id}/get_likes`, {
      method: "GET",
    })
      .done(function (data) {
        // console.log("get_likes: ", data);
        setLikes(data);
      })
      .fail(function (data) {
        console.log("get_likes FAIL", data.responseText);
      });
  }

  function get_tags(id) {
    $.ajax(`/api/publication/${id}/get_tags`, {
      method: "GET",
    })
      .done(function (data) {
        // console.log("get_tags: ", data);
        setTags(data);
      })
      .fail(function (data) {
        console.log("get_tags FAIL", data.responseText);
      });
  }

  function get_publication(id) {
    $.ajax(`/api/publication/${id}`, {
      method: "GET",
    })
      .done(function (data) {
        // console.log("get_publication: ", data);
        setPublicationInfo(data);
        get_user_info(data.user, (data) => {
          setUsersInfo({ avatar: data.photo, username: data.username });
        });
      })
      .fail(function (data) {
        console.log("get_publication FAIL", data.responseText);
      });
  }

  useEffect(() => {
    get_publication(props.id);
    get_tags(props.id);
    get_likes(props.id);
  }, []);
  useEffect(() => {
    setPublicationData({
      ...publicationInfo,
      ...likes,
      ...usersInfo,
      tags: tags,
    });
  }, [publicationInfo, likes, tags, usersInfo]);

  return <MomentsCard {...publicationData} get_likes={get_likes} />;
};

export const MomentsCard = (props) => {
  function set_like(id, itsLike) {
    var set_like = itsLike ? "like" : "dislike";
    $.ajax(`/api/publication/${id}/set_like/`, {
      method: "POST",
      data: { set: set_like },
    })
      .done(function (data) {
        console.log("set_like: ", data);
        props.get_likes(id);
      })
      .fail(function (data) {
        console.error("set_like FAIL", data.responseText);
      });
  }

  console.log("props", props);
  return (
    <div className="shadow card mb-3">
      {props.avatar &&
        props.avatar.length > 0 &&
        props.username &&
        props.username.length > 0 && (
          <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand d-flex" to={`/profile/${props.user}`}>
              {props.avatar && props.avatar.length > 0 && (
                <Avatar src={props.avatar} size={50} className="mr-2" />
              )}
              {props.username && props.username.length > 0 && (
                <div className="my-auto text-dark"> {props.username} </div>
              )}
            </Link>
          </nav>
        )}
      {/* <ImgCarosel pics={[pic, pic, pic]} /> */}
      <img src={props.photo} className="d-block w-100" alt="..." />
      <div className="card-body">
        <div className="d-flex">
          <div className="mr-2">
            {props.like ? (
              <Icon36Like onClick={() => set_like(props.id, false)} />
            ) : (
              <Icon36LikeOutline onClick={() => set_like(props.id, true)} />
            )}
          </div>
          <Icon28CommentOutline width={36} height={36} />
        </div>
        {props.likes_count != undefined && (
          <h5 className="card-title"> Нравится: {props.likes_count} </h5>
        )}
        {props.description && props.description.length > 0 && (
          <p className="card-text">
            {props.username && props.username.length > 0 && (
              <b> {props.username} </b>
            )}
            {props.description}
          </p>
        )}
        {props.date && (
          <p className="card-text">
            <small className="text-muted">
              {timeToStringByTime(props.date)}
            </small>
          </p>
        )}
        {props.tags && props.tags.length > 0 && (
          <div className="d-flex">
            {props.tags.map((tag, i) => {
              console.log(tag);
              return (
                <Link key={i} to={`/search/?tag=${tag.title}`} className="mr-2">
                  #{tag.title}
                </Link>
              );
            })}
          </div>
        )}
        <Block
          time="30 min"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          user={{ avatar: pic, username: "UserName" }}
          level={0}
          count_likes={14}
        />
      </div>
    </div>
  );
};

export const PublicationGridUrl = (props) => {
  var url = props.url;
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [publications, setPublications] = useState([]);

  function get_publications(url) {
    if (!url || url.indexOf("/api/") != 0) return;
    $.ajax(url, {
      method: "GET",
    })
      .done(function (data) {
        console.log("PublicationGridUrl get_publications: ", url, data);
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
        console.log(
          "PublicationGridUrl get_publications FAIL",
          data.responseText
        );
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
        {next && (
          <Button onClick={() => get_publications(next)}> Вперед </Button>
        )}
        {/* {(
          <div className="container">
            <span className="text-muted">Нет публикаций.</span>
          </div>
        )} */}
      </div>
    </>
  );
};
