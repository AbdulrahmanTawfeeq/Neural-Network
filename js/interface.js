let types = ["Virginica", "Versicolor", "Setosa"];
function getInfo() {
  let inputList = [];
  document.querySelectorAll(".content input").forEach((child) => {
      inputList.push(parseInt(child.value));
  });
  let output = nn.predict(inputList);
  // max accepts varargs (args...), here is how to pass array as varargs...
  setResult(output.indexOf(Math.max.apply(this, output)));
}

function setResult(output) {
  document.getElementById("result").innerHTML = "Flower Type: " + types[output];
  document.querySelector("img").src = `img/${types[output]}.jpg`;
}

model = [[
  [12.14172211538505, 11.949449420097796, -9.80749480295214, -27.558937807596, -14.678844570871922],
  [0.8793802296035447, 3.8337255862575943, -3.0833017366430835, -4.1911682351609745, -4.872597982001148],
  [-0.75814082686664, 0.29268183159312716, -0.6914528914405348, -0.358851541174821, -2.023593620253555],
  [0.02437786676425052, 3.0030437069663964, -1.3550702899921847, -4.222616997746723, -2.873218047823264]
],[
  [-2.770060441216038, -2.1150002774836234, -0.701782306707486, -0.764011863748184, 0.1140194446268118],
  [3.952836448720976, -7.649564939657137, -0.970441539888851, -0.6132472064609789, -1.0984724978371296],
  [-7.8878370919152525, 11.851427463903018, -0.29716321559484354, 0.9713266617913632, -0.5255253344784154]
]];

let nn = new NeuralNetwork(4, 4, 3, model);
let output = nn.predict([5.8, 4, 1.2, 0.2]);
console.log("Before Training: ", output);

// let label;
// for (let i = 0; i < 1000; i++) {
//   trainSet.forEach((row) => {
//     label = [0, 0, 0];
//     label[row[1]] = 1;
//     nn.train(row[0], label);
//   });
//   console.log("Error Before Training: ", nn.getTotalError());
//   if (i == 0) {
//     console.log("Error Before Training: ", nn.getTotalError());
//   }
// }

// console.log("Error After Training: ", nn.getTotalError());
