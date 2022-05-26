class Perceptron {
  #weights = []; // private
  #preWeights;
  #output;
  constructor(numOfInputs, history = []) {
    // Set random weights for each input and the bias if no weights
    if (history.length > 0) {
      this.#weights = history; // with bias
    } else {
      for (let i = 0; i < numOfInputs; i++) {
        // Math.random() * (max - min) + min;
        this.#weights[i] = Math.random() * (1 - -1) + -1; // form -1 to 1
      }
      this.#weights[this.#weights.length] = Math.random() * (1 - -1) + -1; // bias weight
    }
    this.#preWeights = Array(this.#weights.length);
  }

  output(inputList) {
    // to avoid affecting the passed one. return new address, to avoid refrensing the same memory address
    let inputs = Array.from(inputList);
    // adding the bias input
    inputs.push(1);
    let net = 0;
    for (let i = 0; i < inputs.length; i++) {
      net += inputs[i] * this.#weights[i];
    }
    this.#output = Neuron.sigmoid(net);
    return this.#output;
  }

  getWeights() {
    return this.#weights;
  }

  getPreWeights() {
    return this.#preWeights;
  }

  setWeight(weightIndex, newWeight) {
    this.#preWeights[weightIndex] = this.#weights[weightIndex];
    this.#weights[weightIndex] = newWeight;
  }

  getOutput() {
    return this.#output;
  }

  static sigmoid(number) {
    return 1 / (1 + Math.exp(-number));
  }
}
