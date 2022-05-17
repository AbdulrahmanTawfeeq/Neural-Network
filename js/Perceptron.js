class Perceptron {
  #weights = []; // private
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
  }
}
