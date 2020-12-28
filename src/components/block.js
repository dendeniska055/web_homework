import React, { FunctionComponent, useState, useEffect } from "react";
import { Switch, Route, Link, Router, matchPath } from "react-router-dom";
import { Icon16LikeOutline, Icon16Like } from "@vkontakte/icons";
import $ from "jquery";

type Users_type = {
  avatar: string,
  username: string,
  id: number,
};

type Moment_type = {
  pictures: string,
  url: string,
};

type BlockProps = {
  user: Users_type,
  event?: "SUBSCRIB" | "LIKE",
  text?: string,
  time: string,
  count_likes?: int,
  can_answer?: Boolean,
  level?: int,
  moment?: Moment_type,
};

export const Block: FunctionComponent<BlockProps> = (
  { user, event, text, time, like, count_likes, can_answer, level, moment },
  props
) => {
  const like_txt = 'поставил(-а) вашему фото отметку "Нравится".';
  const subscrib_txt = "подписался(-ась) на вас.";
  const events_txts = {
    LIKE: like_txt,
    SUBSCRIB: subscrib_txt,
  };

  var palochki = [];
  if (level)
    for (var i = 0; i < level; i++)
      palochki.push(<div key={i} className="mr-4" />);

  return (
    <div className="row no-gutters">
      {palochki}
      {user.avatar && (
        <div className="col-1">
          <Link to={`/profile/${user.id}`}>
            <img
              src={user.avatar}
              className="card-img ml-2"
              style={{ width: 40, height: 40 }}
              alt=""
              loading="lazy"
            />
          </Link>
        </div>
      )}
      <div className={`col-10`}>
        <div className="card-body py-0">
          <p className="card-text mb-0">
            <b>{user.username}</b> {event ? events_txts[event] : text}
          </p>
          <p>
            <small className="text-muted d-flex">
              <div className="mr-2" >{time}</div>
              <div className="mr-2">{like ? <Icon16Like /> : <Icon16LikeOutline />}</div>
              {count_likes && !event && (
                <b className="mr-2">{count_likes} отметок "Нравится"</b>
              )}
              {can_answer && !event && <b>Ответить</b>}
            </small>
          </p>
        </div>
      </div>
      <div className="col-1">
        {moment && (
          <Link to={`/profile/${user.id}`}>
            <img
              src={moment.pictures}
              className="card-img ml-2"
              style={{ width: 40, height: 40 }}
              alt=""
              loading="lazy"
            />
          </Link>
        )}
        {event && event === "SUBSCRIB" && (
          <button type="button" className="btn btn-primary btn-sm">
            Подписаться
          </button>
        )}
      </div>
    </div>
  );
};
