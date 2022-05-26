class NeuralNetwork {
  static learningRate = 0.1;
  #errors; // private
  constructor(inputs, hiddenNodes, outputNodes, model = [[],[]]) {
    // how many inputs, just a number
    this.inputs = inputs;
    this.inputLayer = [];
    this.hiddenLayer = Array(hiddenNodes);
    this.outputLayer = Array(outputNodes);
    this.#errors = Array(this.outputLayer.length);

    /**
     * filling out the hidden layer with Perceptrons
     * weights and bias w will be set according to no. of inputs
     */
    for (let i = 0; i < this.hiddenLayer.length; i++) {
      this.hiddenLayer[i] = new Perceptron(this.inputs, model[0][i]);
    }

    /**
     * filling out the output layer with Perceptrons
     * weights and bias w will be set according to no. of hidden layer Perceptrons
     */
    for (let i = 0; i < this.outputLayer.length; i++) {
      this.outputLayer[i] = new Perceptron(
        this.hiddenLayer.length,
        model[1][i]
      );
    }
  }

  /**
   * sets outputs of all Perceptrons as guesses,
   * sets the Input Layer,
   * returns the output of the NN (output layer)
   */
  predict(inputList) {
    // to avoid affecting the passed one. return new address, to avoid refrensing the same memory address
    this.inputLayer = Array.from(inputList);
    // to be as input list to the output layer
    let hiddenLayerOutputs = [];
    /**
     * inputs to each Perceptron in the hidden layer and calc its output
     * the output func of Perceptron will add the bias
     */
    for (let i = 0; i < this.hiddenLayer.length; i++) {
      hiddenLayerOutputs.push(this.hiddenLayer[i].output(this.inputLayer));
    }

    let outputLayerOutputs = [];

    /**
     * hiddenLayerOutputs will be as inputs to each Perceptron in the output layer and calc its output
     * the output func of Perceptron will add the bias
     */
    for (let i = 0; i < this.outputLayer.length; i++) {
      outputLayerOutputs.push(this.outputLayer[i].output(hiddenLayerOutputs));
    }

    return outputLayerOutputs;
  }

  train(inputList, targets) {
    let outputLayerOutputs = this.predict(inputList);

    // getting the hidden layer outputs by accessing each Perceptron there
    let hiddenLayerOutputs = this.hiddenLayer.map((perceptron) => {
      return perceptron.getOutput();
    });

    // adding the bias value as we dont have bias Perceptron.
    hiddenLayerOutputs.push(1);

    // calc the error for each Perceptron in the output layer
    for (let i = 0; i < outputLayerOutputs.length; i++) {
      this.#errors[i] = NeuralNetwork.error(targets[i], outputLayerOutputs[i]);
    }

    /**
     * op: output layer perceptron
     * opw: output layer perceptron weight
     * hp: hidden layer perceptron
     * hpw: hidden layer perceptron weight
     */
    for (let op = 0; op < this.outputLayer.length; op++) {
      let dESouurce =
        this.#dErrorOutput(targets[op], this.outputLayer[op].getOutput()) *
        this.#dOutputNet(this.outputLayer[op].getOutput());
      for (let opw = 0; opw < this.outputLayer[op].getWeights().length; opw++) {
        dESouurce *= this.#dNetSource(opw, hiddenLayerOutputs);

        let newWeight =
          this.outputLayer[op].getWeights()[opw] -
          NeuralNetwork.learningRate * dESouurce;
        this.outputLayer[op].setWeight(opw, newWeight);
      }
    }

    this.inputLayer.push(1);

    for (let hp = 0; hp < this.hiddenLayer.length; hp++) {
      let dETotlal = 0;
      let dOutputNet = this.#dOutputNet(this.hiddenLayer[hp].getOutput());
      for (let hpw = 0; hpw < this.hiddenLayer[hp].getWeights().length; hpw++) {
        let dNetSource = this.#dNetSource(hpw, this.inputLayer);
        for (let op = 0; op < this.outputLayer.length; op++) {
          dETotlal +=
            this.#dErrorOutput(targets[op], this.outputLayer[op].getOutput()) *
            this.#dOutputNet(this.outputLayer[op].getOutput()) *
            this.#dNetSource(hp, this.outputLayer[op].getPreWeights()) *
            dOutputNet *
            dNetSource;
        }

        let newWeight =
          this.hiddenLayer[hp].getWeights()[hpw] -
          NeuralNetwork.learningRate * dETotlal;
        this.hiddenLayer[hp].setWeight(hpw, newWeight);
      }
    }
  }

  #dErrorOutput(target, output) {
    return -(target - output);
  }

  #dOutputNet(output) {
    return output * (1 - output);
  }

  #dNetSource(sourceIndex, inputs) {
    return inputs[sourceIndex];
  }

  static error(target, output) {
    return 0.5 * (target - output) ** 2;
  }

  getErrors() {
    return this.#errors;
  }

  getTotalError() {
    return this.getErrors().reduce((acc, curr) => acc + curr);
  }

  getModel() {
    let model = [[], []];
    this.hiddenLayer.forEach((p) => {
      model[0].push(p.getWeights());
    });

    this.outputLayer.forEach((p) => {
      model[1].push(p.getWeights());
    });
    return model;
  }
}
