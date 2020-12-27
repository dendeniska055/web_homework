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

import { FormItem } from "@vkontakte/vkui";
import { ChipsSelect } from "@vkontakte/vkui/dist/unstable";

import $ from "jquery";


export const ImgCarosel = (props) => (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        {props.pics.map((this_pic, i) => (
          <li
            key={i}
            data-target="#carouselExampleIndicators"
            data-slide-to={i}
            className={i === 0 ? "active" : ""}
          ></li>
        ))}
      </ol>
      <div className="carousel-inner">
        {props.pics.map((this_pic, i) => (
          <div
            key={i}
            className={i === 0 ? "carousel-item active" : "carousel-item"}
          >
            <img src={this_pic} className="d-block w-100" alt="..." />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );

export const Upload_modal = (props) => {
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState("");

  const [selectedTags, setSelectedTags] = useState([]);
  const tagsChipsProps = {
    value: selectedTags,
    options: tags,
    top: "Выберите или добавьте цвета",
    placeholder: "Не выбраны",
    creatable: true,
    creatableText: "Создать тэг",
  };

  useEffect(() => {
    setTagsInput("");
    checkSelectedTags();
  }, [selectedTags]);

  function createTag(title) {
    $.ajax(`/api/tag/`, {
      method: "POST",
      data: {
        title: title,
      },
    })
      .done(function (data) {
        // console.log("/api/tag/ data", data);
        // console.log("$$$$$");
        setSelectedTags(
          selectedTags.map((tag, i) => {
            return {
              value: tag.title === title ? data.id : tag.value,
              label: tag.title,
            };
          })
        );
      })
      .fail(function (data) {
        // console.log("/api/tag/ FAIL", data);
      });
  }

  function searchTags(title) {
    $.ajax(`/api/tag/?search=${title}`, {
      method: "GET",
    })
      .done(function (data) {
        console.log("data", data, `/api/tag/?search=${title}`);
        setTags(
          data.results.map((tag, i) => {
            return { value: tag.id, label: tag.title };
          })
        );
      })
      .fail(function (data) {
        // console.log("FAIL", data);
      });
  }

  function checkSelectedTags() {
    var localSelectedTags = selectedTags;
    // console.log(localSelectedTags);
    for (var i in localSelectedTags) {
      if (isNaN(localSelectedTags[i].value)) {
        var find = false;
        for (var j in localSelectedTags) {
          if (
            i !== j &&
            localSelectedTags[j].label === localSelectedTags[i].label
          ) {
            find = true;
            break;
          }
        }
        if (!find) {
          // console.log("!", localSelectedTags[i]);
          // console.log("@@@@@@");
          $.ajax(`/api/tag/?get=${localSelectedTags[i].label}`, {
            method: "GET",
          })
            .done(function (data) {
              // console.log("`/api/tag/?get=${label}`", data);
              if (data.count == 1) {
                localSelectedTags[i].value = data.results[0].id;
                setSelectedTags(localSelectedTags);
              } else {
                $.ajax(`/api/tag/`, {
                  method: "POST",
                  data: {
                    title: localSelectedTags[i].label,
                  },
                })
                  .done(function (data) {
                    // console.log("/api/tag/ data", data);
                    // console.log("$$$$$");
                    localSelectedTags[i].value = data.id;
                    setSelectedTags(localSelectedTags);
                  })
                  .fail(function (data) {
                    // console.log("/api/tag/ FAIL", data);
                  });
              }
            })
            .fail(function (data) {
              // console.log("`/api/tag/?get=${label}` FAIL", data);
            });
        } else {
          // console.log("!!!!!!", localSelectedTags, i);
          localSelectedTags = localSelectedTags.slice(i, i + 1);
          // console.log("!!!!!!", localSelectedTags);
          setSelectedTags(localSelectedTags);
        }
        break;
      }
    }
  }

  function add_photo(e) {
    e.preventDefault();
    // console.log(
    //   selectedTags.map((tag, i) => {
    //     return tag.value;
    //   })
    // );
    var photo = $("#photo").get(0).files[0];
    var fd = new FormData();

    fd.append("photo", $("#photo").get(0).files[0]);
    fd.append("description", $("#description").val());
    for (var i in selectedTags) fd.append("tags", selectedTags[i].value);
    // console.log(photo);
    // console.log($("#description").val());
    // console.log(fd);
    $.ajax("/api/publication/", {
      method: "POST",
      data: fd,
      processData: false,
      contentType: false,
    })
      .done(function (data) {
        // console.log("data", data);
      })
      .fail(function (data) {
        // console.log("FAIL", data);
      });
    setTagsInput("");
    setSelectedTags([]);
    setTags([]);
  }

  useEffect(() => {
    searchTags("");
  }, []);

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
            <textarea className="form-control" id="description" rows="3" />
          </div>

          <FormItem top="Выберите или добавьте тэг">
            <ChipsSelect
              {...tagsChipsProps}
              onChange={(e) => {
                // console.log(e);
                setSelectedTags(e);
                // newTags(e);
              }}
              onInput={(e) => {
                // console.log(selectedTags);
                // console.log(e.target.value);
                searchTags(e.target.value);
                setTagsInput(e.target.value);
              }}
              inputValue={tagsInput}
            />
          </FormItem>
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
  );
};

export const ImgGrid = (props) => {
  return (
    <div className="card-columns">
      {props.images.map((this_pic, i) => (
        <Link key={i} to={`/publication/${this_pic.id}`}>
          <div key={i} className="card">
            <img src={this_pic.url} className="card-img-top" alt="..." />
          </div>
        </Link>
      ))}
    </div>
  );
};
