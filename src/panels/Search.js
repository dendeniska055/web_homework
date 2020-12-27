import React, { FunctionComponent, useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import logo from "../img/logo.jpg";
import pic from "../img/pic.jpg";

import Icon28UserOutline from "@vkontakte/icons/dist/28/user_outline";
import Icon28NewsfeedOutline from "@vkontakte/icons/dist/28/newsfeed_outline";
import Icon28SearchOutline from "@vkontakte/icons/dist/28/search_outline";
import Icon28LikeOutline from "@vkontakte/icons/dist/28/like_outline";
import { Icon24Search, Icon28AddOutline } from "@vkontakte/icons";

import {
  FormItem,
  Select,
  CustomSelect,
  CustomSelectOption,
  Avatar,
  Group,
} from "@vkontakte/vkui";
import { ChipsSelect } from "@vkontakte/vkui/dist/unstable";

import { PublicationGridUrl } from "./Publication";
import $ from "jquery";

export const Search = (props) => {
  props.setActivePanel("search");
  const [searchText, setSearchText] = useState("");
  const [imageUrl, setImageUrl] = useState("/api/publication/get_feed");

  const [searchOptions, setSearchOptions] = useState([
    { value: "1", label: "Arctic Monkeys", src: "/photo/default.jpg" },
    { value: "2", label: "Звери", src: "/photo/default.jpg" },
  ]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  function search(title) {
    if (title.length === 0) return "";

    if (title[0] === "#") {
      console.log("tag", title.slice(1));
      $.ajax(`/api/tag?search=${title.slice(1)}`, {
        method: "GET",
      })
        .done(function (data) {
          console.log("search tag: ", data);
          setSearchOptions(
            data.results.map((tag) => {
              return {
                value: tag.id,
                label: "#" + tag.title,
              };
            })
          );
        })
        .fail(function (data) {
          console.error("search tag FAIL", data.responseText);
        });
    } else if (title[0] === "@") {
      console.log("user", title.slice(1));
      $.ajax(`/api/profile?search=${title.slice(1)}`, {
        method: "GET",
      })
        .done(function (data) {
          console.log("search user: ", data);
          setSearchOptions(
            data.results.map((profile) => {
              return {
                value: profile.id,
                label: "@" + profile.username,
                src: profile.photo,
              };
            })
          );
        })
        .fail(function (data) {
          console.error("search user FAIL", data.responseText);
        });
    } else {
      return "";
    }
    return title;
  }

  function setSearch(e) {
    if (e[0].label[0] === "#") {
      console.log("tag", e[0], `/api/publication?search=${e[0].label.slice(1)}`);
      setImageUrl(`/api/publication/?search=${e[0].label.slice(1)}`);
    } else if (e[0].label[0] === "@") {
        window.location.href = `/profile/${e[0].label.slice(1)}`;
      console.log("user", e[0]);
    } else {
      return;
    }
  }

  return (
    <>
      <FormItem>
        <ChipsSelect
          value={selectedOptions}
          onChange={(e) => {
            console.log(e);
            setSearch(e);
            // window.location.href = `/search/${e[0].label}`;
            setSelectedOptions([]);
          }}
          onInput={(e) => {
            console.log(e);
            e.target.value = search(e.target.value);
            setSearchText(e.target.value);
          }}
          options={searchOptions}
          placeholder="#Природа/@denis_vlas"
          emptyText="Ничего не найдено"
          renderOption={({ option: { src }, ...otherProps }) => {
            if (src)
              return (
                <CustomSelectOption
                  before={<Avatar size={20} src={src} />}
                  {...otherProps}
                />
              );
            else return <CustomSelectOption {...otherProps} />;
          }}
        />
      </FormItem>
      <PublicationGridUrl url={imageUrl} />
    </>
  );
};
