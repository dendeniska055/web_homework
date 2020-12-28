import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import pic from "./img/pic.jpg";

import { Header, Footer } from "./panels/MainComponent";
import { SignIn, SignUp } from "./panels/Sign";
import { Profile, SetingsModal } from "./panels/Profile";
import { PublicationGridUrl, Publication } from "./panels/Publication";
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
              <Home />
            </Route>
            <Route path="/search">
              <Search setActivePanel={setActivePanel} myId={myId} />
            </Route>
                                        
            <Route exact path="/profile">
              <Profile
                setActivePanel={setActivePanel}
                myId={myId}
                setModal={setModal}
              />
            </Route>
                                        
            <Route
              path="/profile/:id"
              children={(data) => (
                <Profile
                  setActivePanel={setActivePanel}
                  myId={myId}
                  id={data.match.params.id}
                  setModal={setModal}
                />
              )}
            />
            <Route
              path="/publication/:id"
              children={(data) => (
                <Publication
                  setActivePanel={setActivePanel}
                  id={data.match.params.id}
                />
              )}
            />
            
            <Route path="/events">
              <Events setActivePanel={setActivePanel} myId={myId} />
            </Route>
            <Route path="/signin">
              <SignIn setActivePanel={setActivePanel} myId={myId} setMyId={setMyId} />
            </Route>
            <Route path="/signup">
              <SignUp setActivePanel={setActivePanel} myId={myId} setMyId={setMyId} />
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
      method: "POST",
    })
      .done(function (data) {
        // console.log("data", data, parseInt(data));
        setMyId(parseInt(data));
      })
      .fail(function (data) {
        console.log("FAIL", data);
        if (
          window.location.href.indexOf("/signin") === -1 &&
          window.location.href.indexOf("/signup") === -1
        )
          window.location.href = "/signin";
      });
  }, []);

  return (
    <React.Fragment>
      <Upload_modal modal={modal} setModal={setModal} />
      <SetingsModal modal={modal} setModal={setModal} />
      <Header activePanel={activePanel} setActivePanel={setActivePanel} myId={myId} setMyId={setMyId} setModal={setModal} />
      <Main setActivePanel={setActivePanel} />
      <Footer setActivePanel={setActivePanel} />
    </React.Fragment>
  );
}

export default App;
