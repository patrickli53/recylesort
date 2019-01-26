import React from 'react';
import ReactDOM from 'react-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import Webcam from 'react-webcam';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Button, Navbar } from 'reactstrap';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var navBarStyle = {
      position:'fixed',
      textAlign:'right',
      width:'100%',
      top:0,
      paddingTop:'2vw'
    }
    var textStyle = {
      margin:'2vw',
      textDecoration:'none'
    }
    var imgStyle = {
      height:'3%',
      width:'3%',
      position:'relative',
      float:'left',
      marginLeft:'2vw'
    }
    return(
      <div style={navBarStyle}>
        <img style={imgStyle} src="recycleicon.png" alt=""/>
        <NavLink style={textStyle} to="/">About</NavLink>
        <NavLink style={textStyle} to="/picture">Take a Picture</NavLink>
        <NavLink style={textStyle} to="/help">Help</NavLink>
      </div>
    )
  }
}

class About extends React.Component {
  render() {
    var containerStyle = {
      marginTop:'10%',
      width:'80%',
      marginRight:'auto',
      marginLeft:'auto'
    }
    return(
      <Jumbotron style={containerStyle}>
        <h1 className="display-3">Welcome to RecycleKit!</h1>
        <p className="lead">This is a temporary description but please enjoy these random words.</p>
        <hr className="my-2"/>
        <p className="lead">This is a temporary description but please enjoy these random words.</p>
        <NavLink to='/picture'><Button outline color='primary'>Is this Recyclable?</Button></NavLink>
      </Jumbotron>
    );
  }
}

var imagePath = 'null';

class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData:'null',
      saveImage:'false',
      imgTaken:'false',
      buttonName:'Click to Capture'
    }
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    var imageSrc = this.webcam.getScreenshot();
    imagePath = imageSrc;
    this.setState({
      imageData:imageSrc,
      imgTaken:'true',
      buttonName:'Retake'
    })
  }

  retake = () => {
    imagePath = 'null';
    this.setState({
      imageData:'null',
      imgTaken:'false',
      buttonName:'Click to Capture'
    })
  }

  render() {
    var videoConstraints = {

    }

    var containerStyle = {
      marginTop:100
    }

    var webcamStyle = {

    }
    if (this.state.imgTaken === 'true') {
      return(
        <div style={containerStyle}>
          <img src={this.state.imageData} alt=""/>
          <Button outline color='primary' onClick={this.retake}>{this.state.buttonName}</Button>
        </div>
      );
    } else {
      return(
        <div style={containerStyle}>
          <Webcam
          ref={this.setRef}
          audio={false}
          height={350}
          screenshotFormat="image/jpeg"
          />
          <Button outline color='primary' onClick={this.capture}>{this.state.buttonName}</Button>
        </div>
      );
    }
  }
}

//exporting image file
export default {imagePath};

class TempDiv extends React.Component {
  render() {
    var containerStyle = {
      height:1000
    }
    return(
      <div style={containerStyle}>
        <p>helloooooooo</p>
      </div>
    );
  }
}

function webcamPage() {
  return(
    <WebcamCapture />
  );
}

function homePage() {
  return(
    <About/>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <div>
      <NavBar/>
      <Switch>
        <Route path='/' component={homePage} exact/>
        <Route path='/picture' component={webcamPage}/>
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root'));

serviceWorker.unregister();
