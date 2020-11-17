let socket_io = io.connect('http://localhost:3000');
const chat = document.querySelector('.chat-form')
const Input = document.querySelector('.chat-input')

chat.addEventListener('submit', event => {
    event.preventDefault()
    Input.value = ''
})

function messageEntered() {
    console.log('uso');
    socket_io.emit('chat', 'test');
}

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
            for(var i = 0; i < len; i++) {
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
            for(var i = 0; i < form.filesfld.files.length; i++) {
                var field = form.filesfld;
                fd.append(field.name, field.files[i], field.files[i].name);
            }
            var progress = document.getElementById("progress");
            var x = new XMLHttpRequest();
            if(x.upload) {
                x.upload.addEventListener("progress", function(event){
                    var percentage = parseInt(event.loaded / event.total * 100);
                    progress.innerText = progress.style.width = percentage + "%";
                });
            }
            x.onreadystatechange = function () {
                if(x.readyState == 4) {
                    progress.innerText = progress.style.width = "";
                    form.filesfld.value = "";
                    dragLeave(label); // this will reset the text and styling of the drop zone
                    if(x.status == 200) {
                        var images = JSON.parse(x.responseText);
                        for(var i = 0; i < images.length; i++) {
                            var img = document.createElement("img");
                            img.src = images[i];
                            document.body.appendChild(img);
                        }
                    }
                    else {
                        // failed - TODO: Add code to handle server errors
                    }
                }
            };
            x.open("post", form.action, true);
            x.send(fd);
            return false;
        }