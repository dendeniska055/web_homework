import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Icon36LikeOutline,
  Icon36Like,
} from "@vkontakte/icons";
import { Button } from "react-bootstrap";

import { Block } from "../components/block";
import { ImgGrid } from "./Img";
import { Avatar, WriteBar } from "@vkontakte/vkui";

import $ from "jquery";

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
  // props.setActivePanel("publication");
  const [publicationInfo, setPublicationInfo] = useState();
  const [tags, setTags] = useState([]);
  const [likes, setLikes] = useState();
  const [comments, setComments] = useState();
  // const [usersInfo, setUsersInfo] = useState({ avatar: "", username: "" });
  const [publicationData, setPublicationData] = useState();

  function get_comments(id) {
    $.ajax(`/api/comment/?publication=${id}`, {
      method: "GET",
    })
      .done(function (data) {
        console.log("get_comments: ", data);
        setComments(data);
      })
      .fail(function (data) {
        console.log("get_comments FAIL", data.responseText);
      });
  }

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

  function get_publication(id) {
    $.ajax(`/api/publication/${id}`, {
      method: "GET",
    })
      .done(function (data) {
        // console.log("get_publication: ", data);
        data.avatar = "/" + data.avatar;
        setPublicationInfo(data);
      })
      .fail(function (data) {
        console.log("get_publication FAIL", data.responseText);
      });
  }

  useEffect(() => {
    get_publication(props.id);
    get_likes(props.id);
    get_comments(props.id);
  }, []);
  useEffect(() => {
    setPublicationData({
      ...publicationInfo,
      ...likes,
      comments: { ...comments },
    });
  }, [publicationInfo, likes, comments]);

  return (
    <MomentsCard
      {...publicationData}
      get_likes={get_likes}
      get_comments={get_comments}
    />
  );
};

export const MomentsCard = (props) => {
  const [commentText, setCommentText] = useState("");
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

  function new_comment() {
    $.ajax(`/api/comment/`, {
      method: "POST",
      data: { publication: props.id, comment: commentText },
    })
      .done(function (data) {
        console.log("new_comment: ", data);
        props.get_comments(props.id);
      })
      .fail(function (data) {
        console.error("new_comment FAIL", data.responseText);
      });
  }
  console.log(props);

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
          {/* <Icon28CommentOutline className="mr-2" width={36} height={36} /> */}
          {props.likes_count != undefined && (
            <h5 className="card-title my-auto">
              {" "}
              Нравится: {props.likes_count}{" "}
            </h5>
          )}
        </div>
        {props.description && props.description.length > 0 && (
          <p className="card-text">
            {props.username && props.username.length > 0 && (
              <b> {props.username} </b>
            )}
            {props.description}
          </p>
        )}
        {props.date && (
          <p className="card-text my-1">
            <small className="text-muted">
              {timeToStringByTime(props.date)}
            </small>
          </p>
        )}
        {props.tags_title && props.tags_title.length > 0 && (
          <div className="d-flex">
            {props.tags_title.map((tag, i) => {
              return (
                <Link key={i} to={`/search/?tag=${tag.title}`} className="mr-2">
                  #{tag.title}
                </Link>
              );
            })}
          </div>
        )}
        <div className="border my-3">
          <WriteBar
            value={commentText}
            onChange={(e) => {
              var text = e.target.value;
              if (text[text.length - 1] !== "\n") setCommentText(text);
              else {
                new_comment();
                setCommentText("");
              }
            }}
            placeholder="Комментировать"
          />
        </div>
        {console.log(props.comments)}
        {props.comments && console.log(props.comments)}
        {props.comments &&
          props.comments.results &&
          props.comments.results.map((comment, i) => {
            return (
              <Block
                time={timeToStringByTime(comment.date)}
                text={comment.comment}
                user={{
                  avatar: "/" + comment.avatar,
                  username: comment.username,
                }}
                // count_likes={14}
              />
            );
          })}
        {/* <Block
          time="30 min"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          user={{ avatar: pic, username: "UserName" }}
          level={0}
          count_likes={14}
        /> */}
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
    console.log(url)
    if (!url || url.indexOf("/api/") == -1) return;
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
