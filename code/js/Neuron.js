class Neuron {
  static learningRate = 0.1;
  #weights; // private
  #inputs; // private
  #error; // private

  constructor(numOfInputs, history = []) {
    this.#weights = [];
    this.setWeights(numOfInputs, history); // Set random weights for each input and the bias if no weights
  }

  setWeights(numOfInputs, history = []) {
    if (history.length > 0) {
      this.#weights = history; // with bias
    } else {
      for (let i = 0; i < numOfInputs; i++) {
        // Math.random() * (max - min) + min;
        this.#weights[i] = Math.random() * (1 - -1) + -1; // form -1 to 1
      }
      this.#weights[this.#weights.length] = Math.random() * (1 - -1) + -1; // bias weight
    }
  }

  output(inputList) {
    this.#inputs = Array.from(inputList); // to avoid affecting the passed one. return new address, to avoid refrensing the same memory address
    this.#inputs.push(1); // adding the bias input
    let net = 0;
    this.#inputs.map((input, index) => {
      net += input * this.#weights[index];
    });
    return Neuron.sigmoid(net);
  }

  train(inputList, target) {
    let output = this.output(inputList); // this.#inputs will be reset
    this.#error = Neuron.error(target, output);

    if (this.#error != 0.00001) {
      // Tune all the weights
      for (let i = 0; i < this.#weights.length; i++) {
        // here we must use the this.#inputs not inputList, as we added the bias to the this.#inputs in the output()
        this.#weights[i] =
          this.#weights[i] -
          Neuron.learningRate *
            this.dErrorWeight(this.getInputs(), output, target, i);
      }
    }
  }

  static sigmoid(number) {
    return 1 / (1 + Math.exp(-number));
  }

  static error(target, output) {
    return 0.5 * (target - output) ** 2;
  }

  #dErrorOutput(target, output) {
    return -(target - output);
  }

  #dOutputInput(output) {
    return output * (1 - output);
  }

  #dInputWeight(weightIndex, inputs) {
    return inputs[weightIndex];
  }

  dErrorWeight(inputs, output, target, weightIndex) {
    return (
      this.#dErrorOutput(target, output) *
      this.#dOutputInput(output) *
      this.#dInputWeight(weightIndex, inputs)
    );
  }

  getWeights() {
    return this.#weights;
  }

  getInputs() {
    return this.#inputs;
  }

  getError() {
    return this.#error;
  }
}
