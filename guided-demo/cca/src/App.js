import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const canvasWidth = 400;
const canvasHeight = 300;

const COLORS = [
  [0, 0, 0],
  [0x8f, 0, 0x5f],
  [0x5f, 0, 0x8f],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f],
];

/**
 * CCA canvas
 */
class CCACanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.cca = new CCA(canvasWidth, canvasHeight);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let canvas = this.refs.canvas;
    let ctx = canvas.msGetInputContext('2d');

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cells = this.cca.getCells();

    // Here is the screen buffer array we can manipulate:

    let screenBuffer = imageData.data;

    for (let height = 0; height < canvasHeight; height++) {
      for (let width = 0; width < canvasWidth; width++) {
        // convert x y to index
        let index = (height * canvasWidth + width) * 4;

        let ccaStatus = cells[height][width];

        // change pixels at index to match ccaStatus

        screenBuffer[index + 0] = COLORS[ccaStatus][0];
      }
    }

    console.log('screenBuffer in animFrame: ', screenBuffer);

    ctx.putImageData(imageData, 0, 0);

    // Step the simulation
    this.
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={canvasWidth} height={canvasHeight} />;
  }
}

/**
 * CCA holder component
 */
class CCAApp extends Component {
  /**
   * Render
   */
  render() {
    return (
      <div>
        <CCACanvas width={canvasWidth} height={canvasHeight} />
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
        <CCAApp />
      </div>
    );
  }
}

export default App;
