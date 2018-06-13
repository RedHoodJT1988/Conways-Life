import React, { Component } from 'react';
import Life from './life';
import './App.css';

const HEIGHT = 500;
const WIDTH = 300;

const COLORS = [[0, 0, 0], [200, 0, 0], [255, 255, 255], [0, 255, 0]];

/**
 * Life canvas
 */
class LifeCanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height);
    this.life.randomize();

    this.canvas = null;
    this.ctx = null;
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.setupCanvas();
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  setupCanvas = () => {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext('2d');

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.props.width, this.props.height);
  };

  /**
   * Handle an animation frame
   */
  animFrame() {
    //
    // !!!! IMPLEMENT ME !!!!
    //
    let cells = this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, this.props.width, this.props.height);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let buffer = imageData.data;

    for (let row = 0; row < this.props.height; row++) {
      for (let col = 0; col < this.props.width; col++) {
        let index = (row * this.props.width + col) * 4;

        let currentNumber = cells[row][col];

        buffer[index + 0] = COLORS[currentNumber][0]; //R
        buffer[index + 1] = COLORS[currentNumber][1]; //G
        buffer[index + 2] = COLORS[currentNumber][2]; //B
        buffer[index + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    this.life.step();
    requestAnimationFrame(() => this.animFrame());
  }

  /**
   * Render
   */
  render() {
    return (
      <canvas
        ref="canvas"
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

/**
 * Life holder component
 */
class LifeApp extends Component {
  /**
   * Render
   */
  render() {
    return (
      <div>
        <LifeCanvas width={WIDTH} height={HEIGHT} />
      </div>
    );
  }
}

/**
 * Outer App component
 */
class App extends Component {
  /**
   * Render
   */
  render() {
    return (
      <div className="App">
        <LifeApp />
      </div>
    );
  }
}

export default App;
