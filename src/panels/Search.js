import React, { useState, useEffect } from "react";

import {
  FormItem,
  CustomSelectOption,
  Avatar,
} from "@vkontakte/vkui";
import { ChipsSelect } from "@vkontakte/vkui/dist/unstable";

import { PublicationGridUrl } from "./Publication";
import $ from "jquery";

export const Search = (props) => {
  props.setActivePanel("search");
  const [searchText, setSearchText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [searchOptions, setSearchOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const parseQueryString = (string) => {
    return string
      .slice(1)
      .split("&")
      .map((queryParam) => {
        let kvp = queryParam.split("=");
        return { key: kvp[0], value: kvp[1] };
      })
      .reduce((query, kvp) => {
        // if (parseInt(kvp.value) || kvp.value === "0")
        // 	query[kvp.key] = parseInt(kvp.value);
        // else
        query[kvp.key] = kvp.value;
        return query;
      }, {});
  };
  const queryParams = parseQueryString(window.location.search);

  useEffect(() => {
    console.log(queryParams);
    if (queryParams.tag)
      setImageUrl("/api/publication?search=" + queryParams.tag);
    else setImageUrl("/api/publication");
  }, []);

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

  function setSearch(label) {
    if (label[0] === "#") {
      console.log("tag", label, `/api/publication?search=${label.slice(1)}`);
      setImageUrl(`/api/publication/?search=${label.slice(1)}`);
    } else if (label[0] === "@") {
      window.location.href = `/profile/${label.slice(1)}`;
      console.log("user", label);
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
            setSearch(e[0].label);
            // window.location.href = `/search?tag=${e[0].label.slice(1)}`;
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
