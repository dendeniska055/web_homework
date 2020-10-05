import React, { FunctionComponent } from 'react';
// import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import logo from "./img/logo.jpg"
import pic from "./img/pic.jpg"
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';
import Icon24CommentOutline from '@vkontakte/icons/dist/24/comment_outline';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';

import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import Icon28NewsfeedOutline from '@vkontakte/icons/dist/28/newsfeed_outline';
import Icon28SearchOutline from '@vkontakte/icons/dist/28/search_outline';
import Icon28LikeOutline from '@vkontakte/icons/dist/28/like_outline';

const SUBSCRIB = "SUBSCRIB";
const LIKE = "LIKE";

type Users_type = {
  avatar: string,
  username: string
}

type CardProps = {
  user: Users_type,
  event?: string,
  text?: string,
  time: string,
  count_likes?: int,
  can_answer?: Boolean,
  level?: int,
}

const Block: FunctionComponent<CardProps> = ({ user, event, text, time, count_likes, can_answer, level }, props) => {
  const like_txt = 'поставил(-а) вашему фото отметку "Нравится".'
  const subscrib_txt = 'подписался(-ась) на вас.'
  const events_txts = {
    "like_txt": like_txt,
    "subscrib_txt": subscrib_txt
  }

  var palochki = [];
  if (level)
    for (var i = 0; i < level; i++)
      palochki.push(<div className="mr-2" >|<br />|<br />|<br />|<br /></div>);

  return (
    <div className="row no-gutters">
      {palochki}
      {user.avatar &&
        <div className="col-1">
          <Link to="/user" ><img src={user.avatar} className="card-img ml-2" style={{ width: 40, height: 40 }} alt="" loading="lazy" /></Link>
        </div>}
      <div className={`col-10`}>
        <div className="card-body py-0" >
          <p className="card-text mb-0" ><b>{user.username}</b>{event ? events_txts[event] : text}</p>
          <p><small className="text-muted">{time}
            {(count_likes && !event) && <b className="ml-2" >{count_likes} отметок "Нравится"</b>}
            {(can_answer && !event) && <b className="ml-2" >Ответить</b>}
          </small></p>
        </div>
      </div>
      {/* {props.secondAvatar &&
        <div className="col-1">
          <Link to="/user" ><img src={pic} className="card-img ml-2" style={{ width: 40, height: 40 }} alt="" loading="lazy" /></Link>
        </div>} */}
      {(event && event == SUBSCRIB) &&
        <button type="button" class="btn btn-primary btn-sm">Подписаться</button>}
    </div>)
}

const Events_like = (props) => (
  <div className="row no-gutters">
    <div className="col-1">
      <img src={pic} className="card-img ml-2" style={{ width: 40, height: 40 }} alt="" loading="lazy" />
    </div>
    <div className={`col-10`}>
      <div className="card-body py-0" >
        <p className="card-text mb-0" ><b>UserName</b> поставил(-а) вашему фото отметку "Нравится".
          <small className="text-muted">3 mins ago</small></p>
      </div>
    </div>
    <div className="col-1">
      <img src={pic} className="card-img ml-2" style={{ width: 40, height: 40 }} alt="" loading="lazy" />
    </div>
  </div>
)

const Events = () => (
  <>
    <Events_like />
  </>
)

const Setings_modal = () => (
  <div class="modal fade" id="setings_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Настройки</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="was-validated">
            <div class="form-group">
              <label for="ieInputEmail1">Email</label>
              <input type="email" class="form-control" id="inputEmail1" aria-describedby="email" />
            </div>
            <div class="form-group">
              <label for="inputNikname">Nikname</label>
              <input type="text" class="form-control" id="inputNikname" aria-describedby="nikname" />
            </div>
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="validatedInputGroupCustomFile" required />
              <label class="custom-file-label" for="validatedInputGroupCustomFile">Выберите аватарку</label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-primary">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
)

const User = () => {
  return (
    <>
      <div className="row" >
        <div className="col-auto">
          <img src={pic} width="120" height="120" alt="" loading="lazy" />
        </div>
        <div className="col-auto">
          <div className="d-flex" >
            <h2>UserName</h2>
            <a href="#setings_modal" data-toggle="modal">
              <Icon28SettingsOutline className="ml-2" width="40" height="40" />
            </a>
          </div>
          <div className="d-flex justify-content-around" >
            <div className="col align-self-center" >
              <div className="text-center">123</div>
              <div>Публикаций</div>
            </div>
            <div className="col align-self-center" >
              <div className="text-center">321</div>
              <div>Подписок</div>
            </div>
            <div className="col align-self-center" >
              <div className="text-center">5123</div>
              <div>Подпискичов</div>
            </div>
          </div>
          <div className="d-flex" >
            <input class="btn btn-primary" type="button" value="Подписаться"></input>
            <input class="btn btn-outline-secondary" type="button" value="Отписаться"></input>
          </div>
        </div>
        <div>
          <p><b>Денис Власов</b></p>
          <p>Тут прям шикарное описание профиля</p>
        </div>
      </div>
      <div className="mt-3" >
        <Search />
      </div>
    </>
  )
};

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="/">
          <img src={logo} width="30" height="30" alt="" loading="lazy" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to='/'>
                <Icon28NewsfeedOutline className="mx-auto" />
                Лента
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex" to='/user'>
                <Icon28UserOutline />
                Моя страница
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex" to='/search'>
                <Icon28SearchOutline />
                Поиск
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex" to='/events'>
                <Icon28LikeOutline />
                События
              </Link>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link disabled" href="/users" tabIndex="-1" aria-disabled="true">Disabled</a>
            </li> */}
          </ul>
          <form className="form-inline mt-2 mt-md-0">
            <div className="input-group mr-sm-2">
              <div className="input-group-prepend">
                <span className="input-group-text">@</span>
                <span className="input-group-text">#</span>
              </div>
              <input className="form-control mr-sm-2" type="text" placeholder="#Природа/@denis_vlas" aria-label="Search" />
            </div>
            {/* <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" /> */}
            <Link className="nav-link" to='/search'>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Поиск</button>
            </Link>
          </form>
        </div>
      </nav>
    </header>
  );
};

function Footer() {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <span className="text-muted">Place sticky footer content here.</span>
      </div>
    </footer>
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
    <a className="carousel-control-prev" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
)

const Comment = (props) => {
  var palochki = [];
  for (var i = 0; i < props.level; i++)
    palochki.push(<div className="mr-2" >|<br />|<br />|<br />|<br /></div>);
  return (<div className="d-flex" >
    {palochki}
    <div className="row no-gutters mb-2">
      <div className="col-1">
        <img src={pic} className="card-img ml-2" style={{ width: 40, height: 40 }} alt="" loading="lazy" />
      </div>
      <div className={`col-11`}>
        <div className="card-body py-0" >
          <p className="card-text mb-0" ><b>UserName</b> This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p className="card-text">
            <small className="text-muted">3 mins ago
            <b className="ml-2" >12 отметок "Нравится"</b>
              <b className="ml-2" >Ответить</b>
            </small></p>
        </div>
      </div>
    </div>
  </div>)
}

const MomentsCard = () => (
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
        count_likes={14}/>
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

const Home = () => (
  <div className="row justify-content-center">
    <div className="Home" >
      <MomentsCard />
      <MomentsCard />
    </div>
  </div>
)

const Search = () => (
  <SearchsPic pics={[pic, pic, pic]} />
)

const SearchsPic = (props) => (
  <div className="card-columns">
    {props.pics.map((this_pic, i) =>
      <div key={i} className="card">
        <img src={this_pic} className="card-img-top" alt="..." />
      </div>)}

    <div className="card bg-primary text-white text-center p-3">
      <blockquote className="blockquote mb-0">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
        <footer className="blockquote-footer text-white">
          <small>
            Someone famous in <cite title="Source Title">Source Title</cite>
          </small>
        </footer>
      </blockquote>
    </div>

    {props.pics.map((this_pic, i) =>
      <div key={i} className="card">
        <img src={this_pic} className="card-img-top" alt="..." />
      </div>)}
  </div>
)

const Main = () => (
  <main className="main" className="flex-shrink-0">
    <div className="container col-xl-6 col-lg-7 col-md-9">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/search' component={Search} />
        <Route path='/user' component={User} />
        <Route path='/events' component={Events} />
      </Switch>
    </div>
  </main>
)
const App = () => {
  console.log(window.location.href);

  return (
    <React.Fragment>
      <Setings_modal />
      <Header />
      <Main />
      <Footer />
    </React.Fragment>
  );
}

export default App;
