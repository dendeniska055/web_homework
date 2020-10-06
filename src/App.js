import React, { FunctionComponent, useState, useEffect } from 'react';
// import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import logo from "./img/logo.jpg"
import pic from "./img/pic.jpg"
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';
import Icon24CommentOutline from '@vkontakte/icons/dist/24/comment_outline';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon56AddCircleOutline from '@vkontakte/icons/dist/56/add_circle_outline';

import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import Icon28NewsfeedOutline from '@vkontakte/icons/dist/28/newsfeed_outline';
import Icon28SearchOutline from '@vkontakte/icons/dist/28/search_outline';
import Icon28LikeOutline from '@vkontakte/icons/dist/28/like_outline';
const App = () => {

  const [activePanel, setActivePanel] = useState('home');

  type Users_type = {
    avatar: string,
    username: string
  }

  type Moment_type = {
    pictures: string,
    url: string
  }

  type BlockProps = {
    user: Users_type,
    event?: "SUBSCRIB" | "LIKE",
    text?: string,
    time: string,
    count_likes?: int,
    can_answer?: Boolean,
    level?: int,
    moment?: Moment_type,
  }

  const Block: FunctionComponent<BlockProps> = ({ user, event, text, time, count_likes, can_answer, level, moment }, props) => {
    const like_txt = 'поставил(-а) вашему фото отметку "Нравится".'
    const subscrib_txt = 'подписался(-ась) на вас.'
    const events_txts = {
      "LIKE": like_txt,
      "SUBSCRIB": subscrib_txt
    }

    var palochki = [];
    if (level)
      for (var i = 0; i < level; i++)
        palochki.push(<div key={i} className="mr-4" />);

    return (
      <div className="row no-gutters">
        {palochki}
        {user.avatar &&
          <div className="col-1">
            <Link to="/user" ><img src={user.avatar} className="card-img ml-2" style={{ width: 40, height: 40 }} alt="" loading="lazy" /></Link>
          </div>}
        <div className={`col-10`}>
          <div className="card-body py-0" >
            <p className="card-text mb-0" ><b>{user.username}</b> {event ? events_txts[event] : text}</p>
            <p><small className="text-muted">{time}
              {(count_likes && !event) && <b className="ml-2" >{count_likes} отметок "Нравится"</b>}
              {(can_answer && !event) && <b className="ml-2" >Ответить</b>}
            </small></p>
          </div>
        </div>
        <div className="col-1">
          {moment &&
            <Link to="/user" ><img src={moment.pictures} className="card-img ml-2" style={{ width: 40, height: 40 }} alt="" loading="lazy" /></Link>}
          {(event && event === "SUBSCRIB") &&
            <button type="button" className="btn btn-primary btn-sm">Подписаться</button>}
        </div>
      </div>)
  }

  const Upload_modal = () => (
    <div className="modal fade" id="upload_modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Добавить момент</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="validatedInputGroupCustomFile" required />
                <label className="custom-file-label" htmlFor="validatedInputGroupCustomFile">Загрузить фотографию</label>
              </div>
              <div class="form-group">
                <label for="description">Описание</label>
                <textarea class="form-control" id="description" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
            <button type="button" className="btn btn-primary">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  )

  const SignIn = () => (
    <div className="text-center">
      <form className="form-signin">
        <img className="mb-4" src={logo} alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Пожалуйста, войдите</h1>
        <label htmlFor="inputEmail" className="sr-only">Email</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email" required autoFocus />
        <label htmlFor="inputPassword" className="sr-only">Пароль</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Пароль" required />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Запомнить
        </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
        <Link to="/"><button className="btn btn btn-outline-secondary btn-block" type="submit">Зарегистрироваться</button></Link>
      </form>
    </div>
  )

  const SignUp = () => (
    <div className="text-center">
      <form className="form-signup">
        <img className="mb-4" src={logo} alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Регистрация</h1>
        <div class="form-group">
          <label htmlFor="inputNikname" className="sr-only">Никнейм</label>
          <input type="email" id="inputNikname" className="form-control" placeholder="Никнейм" required autoFocus />
        </div>
        <div class="form-group">
          <label htmlFor="inputEmail" className="sr-only">Email</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email" required />
        </div>
        <div class="form-group">
          <label htmlFor="inputPassword" className="sr-only">Пароль</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Пароль" required />
          <label htmlFor="repeatInputPassword" className="sr-only">Повторите пароль</label>
          <input type="password" id="repeatInputPassword" className="form-control" placeholder="Повторите пароль" required />
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Зарегистрироваться</button>
      </form>
    </div>
  )

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
  const Setings_modal = () => (
    <div className="modal fade" id="setings_modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Настройки</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="was-validated">
              <div className="form-group">
                <label htmlFor="inputEmail1">Email</label>
                <input type="email" className="form-control" id="inputEmail1" aria-describedby="email" />
              </div>
              <div className="form-group">
                <label htmlFor="inputNikname">Nikname</label>
                <input type="text" className="form-control" id="inputNikname" aria-describedby="nikname" />
              </div>
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="validatedInputGroupCustomFile" required />
                <label className="custom-file-label" htmlFor="validatedInputGroupCustomFile">Выберите аватарку</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
            <button type="button" className="btn btn-primary">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  )

  const User = () => {
    setActivePanel("user");
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
              <input className="btn btn-primary" type="button" value="Подписаться"></input>
              <input className="btn btn-outline-secondary" type="button" value="Отписаться"></input>
            </div>
          </div>
          <div>
            <p><b>Денис Власов</b></p>
            <p>Тут прям шикарное описание профиля</p>
          </div>
        </div>
        <div className="mt-3" >
          <SearchsPic pics={[pic, pic, pic]} />
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
              <li className={"nav-item" + (activePanel === "home" ? " active" : "")}>
                <Link className="nav-link d-sm-flex d-md-block" to='/'>
                  <Icon28NewsfeedOutline className="mr-sm-2 m-md-auto" />
                Лента
              </Link>
              </li>
              <li className={"nav-item" + (activePanel === "user" ? " active" : "")}>
                <Link className="nav-link d-sm-flex d-md-block" to='/user'>
                  <Icon28UserOutline className="mr-sm-2 m-md-auto" />
                Моя страница
              </Link>
              </li>
              <li className={"nav-item" + (activePanel === "search" ? " active" : "")}>
                <Link className="nav-link d-sm-flex d-md-block" to='/search'>
                  <Icon28SearchOutline className="mr-sm-2 m-md-auto" />
                Поиск
              </Link>
              </li>
              <li className={"nav-item" + (activePanel === "events" ? " active" : "")}>
                <Link className="nav-link d-sm-flex d-md-block" to='/events'>
                  <Icon28LikeOutline className="mr-sm-2 m-md-auto" />
                События
              </Link>
              </li>
              {/* <li className="nav-item">
              <a className="nav-link disabled" href="/users" tabIndex="-1" aria-disabled="true">Disabled</a>
            </li> */}
            </ul>
            <Link className="" to='/signin'>
              <button className="btn btn-primary">Войти</button>
            </Link>
            <Link className="mx-3" to='/signup'>
              <button className="btn btn-light">Регистрация</button>
            </Link>
            <form className="form-inline mt-2 mt-md-0">
              <div className="input-group mr-sm-2">
                <div className="input-group-prepend">
                  <span className="input-group-text">@</span>
                  <span className="input-group-text">#</span>
                </div>
                <input className="form-control mr-sm-2" type="text" placeholder="#Природа/@denis_vlas" aria-label="Search" />
              </div>
              {/* <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" /> */}
              <Link to='/search'>
                <button className="btn btn-outline-success m-0" type="submit">Поиск</button>
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
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  )

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
          count_likes={14} />
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

  const Home = () => {
    setActivePanel("home");
    return (
      <div className="row justify-content-center">
        <div className="Home" >
          <MomentsCard />
          <MomentsCard />
        </div>
        <a href="#upload_modal" data-toggle="modal" >
          <Icon56AddCircleOutline style={{ "font-size": 24, "position": "fixed", "bottom": "80px", "right": "80px" }} />
        </a>
      </div>
    )
  }

  const Search = () => {
    setActivePanel("search");
    return (
      <SearchsPic pics={[pic, pic, pic]} />
    )
  }

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
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </div>
    </main>
  )

  useEffect(() => {
    console.log(activePanel);
  });

  return (
    <React.Fragment>
      <Upload_modal />
      <Setings_modal />
      <Header />
      <Main />
      <Footer />
    </React.Fragment>
  );
}

export default App;
