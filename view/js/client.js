text_messages = [];
image_messages = [];
const chatMessages2 = document.querySelector(".chat-history");

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
      message.includes("svg")  ||
        message.includes("PNG")
    ) {
      showPictureInChat(message);
      return;
      }

      if (message.includes("google.at/maps")) {
         sendGeoLocation(message);
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

    text_messages.push(message);

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
    console.log("img_src " + img_src)
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
    image_messages.push("http://localhost:3000/" + field.files[i].name)
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


var x = document.getElementById("demo");

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


function showPosition(position) {
    //console.log("Latitude: " + position.coords.latitude +
      //  "<br>Longitude: " + position.coords.longitude);
    openPosition(position.coords.latitude, position.coords.longitude);
    
}

const chatMessagesGEO = document.querySelector(".chat-history");

function sendGeoLocation(locationURLa) {

    console.log(locationURLa);
   

    var a = document.createElement('a');
    var linkText = document.createTextNode("My Location");
    a.appendChild(linkText);
    a.title = "Clik to see - My Location";
    a.href = locationURLa;
    //document.body.appendChild(a);

    
   
    const img = document.createElement("img");
    img.classList.add("avatar");
    img.src = "./assets/imgs/pic.png";
    img.alt = "Avatar";
    img.width = 32;
    img.height = 32;

    //const p = document.createElement("paragraph");
    //p.innertext = locationURL;

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
    div_chatmsg.appendChild(a);

    const div_msg = document.createElement("div");
    div_msg.classList.add("chat-message");
    div_msg.classList.add("clearfix");
    div_msg.appendChild(img);
    div_msg.appendChild(div_chatmsg);
    const hr = document.createElement("hr");
    document.querySelector(".chat-history").appendChild(div_msg);
    document.querySelector(".chat-history").appendChild(hr);
    chatMessagesGEO.scrollTop = chatMessagesGEO.scrollHeight;
}

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}


function openPosition(latitude, longitude)
{
    //Used to open in a new tab 
    var1 = "https://www.google.at/maps/@";
    var2 = var1.concat(latitude);
    var3 = var2.concat(",");
    res = var3.concat(longitude);
    ws.send(res);
   // window.open(res);
}


function exportData()
{
  if (text_messages.length > 0 || image_messages.length > 0)
  {
    var session_name = prompt("Please enter your chat session name");

    var x = new XMLHttpRequest();
    var fd = new FormData();

    for(var i = 0; i < text_messages.length; i++)
    {
      console.log(text_messages[i])
      fd.append("message", text_messages[i])
    }

    for(var i = 0; i < image_messages.length; i++)
    {
      console.log(image_messages[i])
      fd.append("image_reference", image_messages[i])
    }

    fd.append("session_name", session_name);

    x.open("post", "/user/message", true);
    x.send(fd);
  }
  else
  {
    alert("There is no messages to export")
  }
  return false;
}

function importChat()
{
  var session_name = prompt("Please enter your chat session name");
  var x = new XMLHttpRequest();
  var fd = new FormData();
  console.log(session_name)
  fd.append("session_name", session_name);

  console.log("import chat")
  x.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("in response: ");
      console.log(this.responseText);

      if(this.responseText != "\"no-response\"")
      {
        imported_message = this.responseText.substring(0, this.responseText.indexOf("|"));

        if(imported_message != "\"null")
        {
          messages = makeArrayOfMessagesFromExport(imported_message);

          for(var i = 0; i < messages.length; i++)
            showMessagesFromImport(messages[i]);
        }

        image_references = this.responseText.substring(this.responseText.indexOf("|") + 1, this.responseText.length);
        if(image_references != "null\"")
        {
          images_to_be_shown = makeArrayOfImagesFromExport(image_references);

          for(var i = 0; i < images_to_be_shown.length; i++)
            showPicturesFromExport(images_to_be_shown[i]);

        }
      }
      else
      {
        alert("Please provide existing session name")
      }
    }
  };

  x.open("post", "/user/import_chat", true);
  x.send(fd);

}

function makeArrayOfImagesFromExport(image)
{

  images = [];
  image = image.slice(0, image.length - 1);

  temp_image = '';

  console.log("iamge " + image)
  for(var i = 0; i < image.length; i++)
  {
    if(image[i] == ",")
    {
      images.push(temp_image);
      temp_image = '';
    }
    else if(i == image.length - 1)
    {
      temp_image += image[i];
      images.push(temp_image);
    }
    else
    {
      temp_image += image[i];
    }
  }

  return images;
}

function makeArrayOfMessagesFromExport(message)
{
  messages = [];
  message = message.slice(1, message.length);

  temp_message = '';
  for(var i = 0; i < message.length; i++)
  {
    if(message[i] == ",")
    {
      messages.push(temp_message);
      temp_message = '';
    }
    else if(i == message.length - 1)
    {
      temp_message += message[i];
      messages.push(temp_message);
    }
    else
    {
      temp_message += message[i];
    }
  }

  return messages;
}

function showMessagesFromImport(message)
{
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
    chatMessages2.scrollTop = chatMessages2.scrollHeight;
}

function showPicturesFromExport(img_src) {

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
  chatMessages2.scrollTop = chatMessages2.scrollHeight;

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




