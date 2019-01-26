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
import Clarifai from 'clarifai';

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
    const imageSrc = this.webcam.getScreenshot();
    imagePath = imageSrc;
    //api training
    console.log("hi");

    //api training
    const app = new Clarifai.App({
        apiKey: '149600ad4a084e3e8501b5255a8c4778'
    });

    // Tags that indicate a recyclable object.
    var recycleTags = ['recycling', 'plastic', 'paper', 'cardboard', 'carton'];

    var data = imageSrc.split("data:image/jpeg;base64,");
    // Prediction model.
    console.log(imageSrc);
    app.models.predict(Clarifai.GENERAL_MODEL, {base64:data[1]})
        .then(response => {
            var concepts = response['outputs'][0]['data']['concepts'];
            var tags = [];
            var banned = [];

            for (var i = 0; i < concepts.length; i++) {
                for (var u = 0; u < recycleTags.length; u++) {
                    if (concepts[i].name === recycleTags[u]) {
                        tags.push(concepts[i]);
                    };
                };
            };

            // console.log(concepts);

            if (tags.length !== 0) {
                console.log("This is recyclable lulll");
            } else {
                console.log("Uh lol not sure lol kek");
            }
        })
        .catch(err => {
            console.log(err);
        });

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
      marginTop:100,
      textAlign:'center'
    }
    var webcamStyle = {
      marginLeft:'auto',
      marginRight:'auto',
      width:'100%',
      background:'blue'
    }
    var buttonStyle = {
      marginTop:'3vw'
    }
    var retakeStyle = {
      marginLeft:'7vw'
    }
    if (this.state.imgTaken === 'true') {
      return(
        <div style={containerStyle}>
          <img src={this.state.imageData} alt=""/>
          <Button style={{...retakeStyle,...buttonStyle}} outline color='primary' onClick={this.retake}>{this.state.buttonName}</Button>
        </div>
      );
    } else {
      return(
        <div style={containerStyle}>
          <div>
            <Webcam
            style={buttonStyle}
            ref={this.setRef}
            audio={false}
            height={350}
            screenshotFormat="image/jpeg"
            />
          </div>
          <Button style={buttonStyle} outline color='primary' onClick={this.capture}>{this.state.buttonName}</Button>
        </div>
      );
    }
  }
}

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

console.log(imagePath);
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
