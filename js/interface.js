function getInfo() {
  let inputList = [];
  document.querySelector(".content").childNodes.forEach((child) => {
    if (child.nodeName != "LABEL" && child.nodeName != "#text") {
      inputList.push(parseInt(child.value));
    }
  });
  output = nn.predict(inputList);
  setResult(Math.round(output[0]));
}

function setResult(output) {
  document.getElementById("result").className = "";
  if (output) {
    document.getElementById("result").className = "yes";
    document.getElementById("result").innerHTML = "Yes, can play golf!";
  } else {
    document.getElementById("result").className = "no";
    document.getElementById("result").innerHTML = "No, cannot play golf!";
  }
}
