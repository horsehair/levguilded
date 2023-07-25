var Toggle = false;

var Alr = 5000;
module.exports = {
  load() {
    setTimeout(function () {
      Alr = 0;
    if (typeof Toastify !== "undefined") {

      Toggle = true;
      
      const metadata = require(`./metadata.json`);
      metadata.then(function (result) {
        Toastify({
          text: `Loaded ${result.name} ${result.version}!`,
          duration: 3000,
          destination: "https://www.guilded.gg/i/2yenj7K2",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
      });
    } else {
      Overlay(
        "Sky's Utilities Addon Is Required For This Addon To Run!",
        "https://github.com/catgirIz/levguilded/releases/download/Stuff/Sky.s.Utilities.zip"
      );
      this.unload;
      //return false;
    }
  }, Alr);
  },
  unload() {
    Toggle = false;
    if (document.getElementById("overlayTextbox")) {
      document.getElementById("overlayTextbox").remove();
    }
    if (typeof Toastify !== "undefined") {
      const metadata = require(`./metadata.json`);
      metadata.then(function (result) {
        Toastify({
          text: `Unloaded ${result.name} ${result.version}!`,
          duration: 3000,
          destination: "https://www.guilded.gg/i/2yenj7K2",
          style: {
            background: "linear-gradient(to right, #ff3838, #ff9999)",
          },
        }).showToast();
      });
    }
  },
};

async function Overlay(Text, Link) {
  if (document.getElementById("Neededoverlay")) {
    document.getElementById("Neededoverlay").remove();
  }
  if (!document.getElementById("Neededoverlay")) {
    // Create the overlay element
    const overlay = document.createElement("div");
        overlay.style.position = "fixed";
    overlay.id = "Neededoverlay";
    overlay.style.top = "50%";
    overlay.style.left = "50%";
    overlay.style.transform = "translate(-50%, -50%)";
    overlay.style.width = "400px";
    overlay.style.resize = "both";
    overlay.style.borderRadius = "10px";
    overlay.style.height = "300px";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "9999";

    // Create the close button element
    const closeButton = document.createElement("button");
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.padding = "5px";
    closeButton.style.backgroundColor = "transparent";
    closeButton.style.border = "none";
    closeButton.style.color = "white";
    closeButton.style.fontSize = "20px";
    closeButton.innerHTML = "&times;";

    // Add click event listener to the close button
    closeButton.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });

    // Create the text element
    const text = document.createElement("p");
    text.style.color = "white";
    text.style.fontSize = "24px";
    text.style.textAlign = "center";
    text.style.position = "absolute";
    text.style.top = "50%";
    text.style.left = "50%";
    text.style.transform = "translate(-50%, -50%)";
    text.textContent = `${Text}`;

    if (Link !== null && Link !== "") {
      // Create the link element
      const link = document.createElement("a");
      link.style.color = "yellow";
      link.style.textAlign = "center";
      link.style.position = "absolute";
      link.style.top = "75%";
      link.style.left = "50%";
      link.style.transform = "translate(-50%, -50%)";
      link.style.textDecoration = "underline";
      link.href = `${Link}`;
      link.textContent = "Download Here";
      // Add click event listener to the link
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.open(link.href, "_blank");
      });

      // Append the link element to the text element
      overlay.appendChild(link);
    }
    overlay.appendChild(closeButton);
    // Append the text element to the overlay element
    overlay.appendChild(text);

    // Append the overlay element to the document body
    document.body.appendChild(overlay);
  }
}

function capitalizeSentences(text) {
  //console.log(text, (text !== null && typeof text === "string"));
  if (text !== null && typeof text === "string") {
    var capitalizedText = text.replace(/(^|\.\s+)([a-z])/g, function (match) {
      return match.toUpperCase() || "";
    });
    return capitalizedText || "";
  } else {
    return "";
  }
}

async function make() {
  var element = await document.getElementsByClassName(
    "ChatChannelContents-container"
  )[0];
  var wrapper = document.createElement("div");
  wrapper.style.position = "relative";

  var overlayTextbox = document.createElement("div");
  overlayTextbox.setAttribute("id", "overlayTextbox");
  overlayTextbox.style.position = "absolute";
  overlayTextbox.style.top = "50%";
  overlayTextbox.style.left = "50%";
  overlayTextbox.contentEditable = true;
  overlayTextbox.style.transform = "translate(-50%, -50%)";
  overlayTextbox.style.background = "rgba(0, 0, 0, 0.5)";
  overlayTextbox.style.color = "white";
  overlayTextbox.style.width = "300px";
  overlayTextbox.style.height = "100px";
  overlayTextbox.style.boxSizing = "border-box";

  wrapper.appendChild(overlayTextbox);

  element.parentNode.insertBefore(wrapper, element);

  overlayTextbox.appendChild(element.parentNode);
}

async function track() {
  if (!document.getElementById("overlayTextbox")) {
    make();
  }
  var OLT = await document.getElementById("overlayTextbox");
  var uhh = await document.querySelectorAll('[data-slate-content="true"]')[0];
  if (Toggle == true && uhh !== null) {
    uhh.innerHTML = capitalizeSentences(OLT.innerHTML) || "";
  }
}

document.addEventListener("keydown", track);
document.addEventListener("mousemove", track);
document.addEventListener("keypress", track);
document.addEventListener("keyup", track);
document.addEventListener("focusout", track);
document.addEventListener("focus", track);
