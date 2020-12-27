import React, { FunctionComponent, useState, useEffect } from 'react';
import { Switch, Route, Link, Router, matchPath } from 'react-router-dom'
import pic from "./img/pic.jpg";
import {
  Icon24LikeOutline,
  Icon24CommentOutline,
  Icon56AddCircleOutline,
} from "@vkontakte/icons";

import { Header, Footer } from "./panels/MainComponent";
import { SignIn, SignUp } from "./panels/Sign";
import { Profile, Setings_modal } from "./panels/Profile";
import { MomentsCard, PublicationGridUrl } from "./panels/Publication";
import { Upload_modal } from "./panels/Img";
import { Search } from "./panels/Search";

import { Block } from "./components/block";
import $ from "jquery";

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [myId, setMyId] = useState(-1);
  const [modal, setModal] = useState('');

  const Events = () => {
    setActivePanel("events");
    return (
      <>
        <Block
          time="3 min"
          user={{ avatar: pic, username: "userName" }}
          event="SUBSCRIB"
        />
        <Block
          time="3 min"
          user={{ avatar: pic, username: "userName" }}
          event="LIKE"
          moment={{ pictures: pic }}
        />
      </>
    )
  }


  const Home = () => {
    setActivePanel("home");
    return (
      <div className="row justify-content-center">
        <div className="Home" >
          <PublicationGridUrl url="/api/publication/get_feed/" />
          <MomentsCard />
          <MomentsCard />
        </div>
      </div>
    )
  }

  const Main = () => (
    <main className="main" className="flex-shrink-0">
      <div className="container col-xl-6 col-lg-7 col-md-9">
        <div>
          {/* <Router> */}
          <Switch>
            <Route exact path="/">
              <Home activePanel={activePanel} />
            </Route>
            <Route path="/search">
              <Search activePanel={activePanel} setActivePanel={setActivePanel} myId={myId} />
            </Route>
                                        
            <Route exact path="/profile">
              <Profile
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                myId={myId}
                setModal={setModal}
              />
            </Route>
                                        
            <Route
              path="/profile/:id"
              children={(data) => (
                <Profile
                  activePanel={activePanel}
                  setActivePanel={setActivePanel}
                  myId={myId}
                  id={data.match.params.id}
                  setModal={setModal}
                />
              )}
            />
            
            <Route path="/events">
              <Events activePanel={activePanel} setActivePanel={setActivePanel} myId={myId} />
            </Route>
            <Route path="/signin">
              <SignIn activePanel={activePanel} setActivePanel={setActivePanel} myId={myId} setMyId={setMyId} />
            </Route>
            <Route path="/signup">
              <SignUp activePanel={activePanel} setActivePanel={setActivePanel} myId={myId} setMyId={setMyId} />
            </Route>
            {/* <Redirect from='/' to='/home'/> */}
          </Switch>
          {/* </Router> */}
        </div>
      </div>
    </main>
  );

  useEffect(() => {
    // console.log(activePanel);
    $.ajax("/rest_api/get_my_id/", {
      method: "POST"
    }).done(function (data) {
        // console.log("data", data, parseInt(data));
        setMyId(parseInt(data));
      })
      .fail(function (data) {
        console.log("FAIL", data);
      });
  },[]);

  return (
    <React.Fragment>
      <Upload_modal modal={modal} setModal={setModal} />
      <Setings_modal modal={modal} setModal={setModal} />
      <Header activePanel={activePanel} setActivePanel={setActivePanel} myId={myId} setMyId={setMyId} setModal={setModal} />
      <Main activePanel={activePanel} setActivePanel={setActivePanel} />
      <Footer activePanel={activePanel} setActivePanel={setActivePanel} />
    </React.Fragment>
  );
}

export default App;
