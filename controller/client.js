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
    if (
      message.includes("png") ||
      message.includes("jpg") ||
      message.includes("jpeg") ||
      message.includes("svg")
    ) {
      showPictureInChat(message);
      return;
    }

    if (message === "New user has joined the chat") {
      showNewUser();
      return;
    }

    if (message === "close") {
      showUserLeft();
      return;
    }
    const img = document.createElement("img");
    img.classList.add("avatar");
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

  function showPictureInChat(img_src) {
    const img = document.createElement("img");
    img.classList.add("avatar");
    img.src = "./assets/imgs/pic.png";
    img.alt = "Avatar";
    img.width = 32;
    img.height = 32;

    let image_name = img_src.slice(22, img_src.length);

    const chat_img = document.createElement("img");
    chat_img.classList.add("chat-img");
    chat_img.src = image_name;
    chat_img.alt = "Uploaded";
    chat_img.width = 180;
    chat_img.height = 120;
  

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
    div_chatmsg.appendChild(chat_img);

    const div_msg = document.createElement("div");
    div_msg.classList.add("chat-message");
    div_msg.classList.add("clearfix");
    div_msg.appendChild(img);
    div_msg.appendChild(div_chatmsg);
    const hr = document.createElement("hr");
    document.querySelector(".chat-history").appendChild(div_msg);
    document.querySelector(".chat-history").appendChild(hr);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const modal_div = document.createElement("div");
    modal_div.classList.add("modal");
    modal_div.id = "myModal";
    console.log(modal_div);

    const close_span = document.createElement("span");
    close_span.classList.add("close");
    close_span.innerHTML = "&times;";
    

    const full_img = document.createElement("img");
    full_img.classList.add("modal-content");
    full_img.id = "img01";

    modal_div.appendChild(close_span);
    modal_div.appendChild(full_img);
    document.querySelector("#live-chat").appendChild(modal_div);
    chat_img.onclick = function() {
      modal_div.style.display = "block";
      full_img.src = this.src;
    }
    close_span.onclick = function() {
      modal_div.style.display = "none";
    }
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
      if (
        data.includes("offsetX") ||
        data.includes("true") ||
        data.includes("false")
      ) {
        return;
      }
      showMessage(data);
    };
    ws.onclose = function () {
      ws = null;
    };
  }

  function showUserLeft() {
    const div = document.createElement("div");
    div.classList.add("center");

    const p = document.createElement("paragraph");
    p.innerHTML += `<em>A user has left the chat</em>`;
    p.style.color = "Red";
    const hr = document.createElement("hr");
    div.appendChild(p);
    document.querySelector(".chat-history").appendChild(div);
    document.querySelector(".chat-history").appendChild(hr);
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
        handleChatMessage(e);
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
}
function addFilesAndSubmit(event) {
  var files = event.target.files || event.dataTransfer.files;

  document.getElementById("submit-form").filesfld = document.getElementById("chat-history");
  document.getElementById("submit-form").filesfld.files = files;

  submitFilesForm(document.getElementById("submit-form"));
}
function submitFilesForm(form) {

  var fd = new FormData();
  for (var i = 0; i < form.filesfld.files.length; i++) {
    var field = form.filesfld;
    fd.append(field.name, field.files[i], field.files[i].name);
  }

  var x = new XMLHttpRequest();

  x.onreadystatechange = function () {
    if (x.readyState == 4) {
      form.filesfld.value = "";
      if (x.status == 200) {
        var images = JSON.parse(x.responseText);
        for (var i = 0; i < images.length; i++) {
          var img = document.createElement("img");
          img.src = images[i];
          ws.send(img.src);
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
