class NeuralNetwork {
  static learningRate = 0.1;
  constructor(inputs, hiddenNodes, outputNodes) {
    this.inputs = inputs;
    this.hiddenNodes = Array(hiddenNodes);
    this.outputNodes = Array(outputNodes);

    for (let i = 0; i < this.hiddenNodes.length; i++) {
      this.hiddenNodes[i] = new Perceptron(this.inputs);
    }

    for (let i = 0; i < this.outputNodes.length; i++) {
      this.outputNodes[i] = new Perceptron(this.hiddenNodes.length);
    }
  }

  feedForward() {
    //   10.13: Neural Networks: Feedforward Algorithm Part 2 - The Nature of Code: MIN: 7
  }
}

let nn = new NeuralNetwork(2, 5, 1);
console.log(nn);
