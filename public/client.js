(function () {
  let user_count = 0;
  $("#live-chat header").on("click", function () {
    $(".chat").slideToggle(300, "swing");
    $(".chat-message-counter").fadeToggle(300, "swing");
  });

  $(".chat-close").on("click", function (e) {
    e.preventDefault();
    $("#live-chat").fadeOut(300);
  });

  const sendMsgIcon = document.querySelector("#send");
  const message = document.querySelector("#msg-input");
  const chatMessages = document.querySelector(".chat-history");

  let ws;
  function showMessage(message) {
    const img = document.createElement("img");
    img.src = "./assets/imgs/pic.png";
    img.alt = "Avatar";
    img.width = 32;
    img.height = 32;

    const p = document.createElement("paragraph");
    p.innerText = message;

    const span = document.createElement("span");
    span.classList.add("chat-time");
    span.innerText = new Date().toLocaleTimeString().substring(0, 4);

    const header = document.createElement("h5");
    header.innerText = "Random User";

    const div_chatmsg = document.createElement("div");
    div_chatmsg.classList.add("chat-message-content");
    div_chatmsg.classList.add("clearfix");
    div_chatmsg.appendChild(span);
    div_chatmsg.appendChild(header);
    div_chatmsg.appendChild(p);

    const div_msg = document.createElement("div");
    div_msg.classList.add("chat-message");
    div_msg.classList.add("clearfix");
    div_msg.appendChild(img);
    div_msg.appendChild(div_chatmsg);
    const hr = document.createElement("hr");
    document.querySelector(".chat-history").appendChild(div_msg);
    document.querySelector(".chat-history").appendChild(hr);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function init() {
    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }
    ws = new WebSocket("ws://localhost:3000");
    ws.onopen = () => {
      console.log("WebSocket connection opened!");
      ws.send("New user has joined the chat");
      showNewUser();
    };
    ws.onmessage = ({ data }) => {
      showMessage(data);
    };
    ws.onclose = function () {
      ws = null;
    };
  }

  function showNewUser() {
    const div = document.createElement("div");
    div.classList.add("center");

    const p = document.createElement("paragraph");
    p.innerHTML += `<em>New user has joined the chat</em>`;
    const hr = document.createElement("hr");
    div.appendChild(p);
    document.querySelector(".chat-history").appendChild(div);
    document.querySelector(".chat-history").appendChild(hr);
  }

  function handleChatMessage(event) {
    ws.send(message.value);
    showMessage(message.value);
    event.preventDefault();
    message.value = "";
  }

  sendMsgIcon.onclick = function (event) {
    handleChatMessage(event);
  };

  document
    .getElementById("msg-input")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        console.log(message.value);
        handleChatMessage(event);
      }
    });

  init();
})();

function stopDefault(event) {
  event.preventDefault();
  event.stopPropagation();
}
function dragOver(label, text) {
  /* ADD ALMOST ANY STYLING YOU LIKE */
  label.style.animationName = "dropbox";
  label.innerText = text;
}
function dragLeave(label) {
  /* THIS SHOULD REMOVE ALL STYLING BY dragOver() */
  var len = label.style.length;
  for (var i = 0; i < len; i++) {
    label.style[label.style[i]] = "";
  }
  label.innerText = "Click to choose images or drag-n-drop them here";
}
function addFilesAndSubmit(event) {
  var files = event.target.files || event.dataTransfer.files;
  document.getElementById("filesfld").files = files;
  submitFilesForm(document.getElementById("filesfrm"));
}
function submitFilesForm(form) {
  var label = document.getElementById("fileslbl");
  dragOver(label, "Uploading images..."); // set the drop zone text and styling
  var fd = new FormData();
  for (var i = 0; i < form.filesfld.files.length; i++) {
    var field = form.filesfld;
    fd.append(field.name, field.files[i], field.files[i].name);
  }
  var progress = document.getElementById("progress");
  var x = new XMLHttpRequest();
  if (x.upload) {
    x.upload.addEventListener("progress", function (event) {
      var percentage = parseInt((event.loaded / event.total) * 100);
      progress.innerText = progress.style.width = percentage + "%";
    });
  }
  x.onreadystatechange = function () {
    if (x.readyState == 4) {
      progress.innerText = progress.style.width = "";
      form.filesfld.value = "";
      dragLeave(label); // this will reset the text and styling of the drop zone
      if (x.status == 200) {
        var images = JSON.parse(x.responseText);
        for (var i = 0; i < images.length; i++) {
          var img = document.createElement("img");
          img.src = images[i];
          document.body.appendChild(img);
        }
      } else {
        // failed - TODO: Add code to handle server errors
      }
    }
  };
  x.open("post", form.action, true);
  x.send(fd);
  return false;
}
