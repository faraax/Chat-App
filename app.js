let email = document.getElementById('uname');

let password = document.getElementById('pass');

let message = document.getElementById('message');

let chatArea = document.getElementById('chat-area-box')

let greetings = document.getElementById('greetings')

let signUpSec = document.getElementById('signUp')

let newUserName = document.getElementById('new-username')

let newEmail = document.getElementById('new-email')

let newPass = document.getElementById('new-pass')

// let chatBox = document.getElementById('chat-area-box')



if (greetings === "") {

    window.location = "index.html"
}

gerData = () => {

    firebase.database().ref('userDb').on("child_added", function (data) {

        let currentUser = greetings.innerHTML

        let user = data.val().name


        if (user === currentUser) {

            let createDiv = document.createElement('div')

            createDiv.setAttribute("class", "box1 sb1")

            createDiv.setAttribute("id", data.val().key)

            let createSpan = document.createElement("span")

            let createBr = document.createElement('br')

            createSpan.setAttribute("class", "user")

            createSpan.setAttribute("id", "quest-user")

            createSpan.append(createBr)

            let msg = createDiv.appendChild(createSpan)

            let chatAreaBox = chatArea.appendChild(msg.parentElement)

            msg.innerHTML = data.val().name

            let chat = chatAreaBox.appendChild(document.createElement('p'))

            chat.setAttribute("id", "chat")

            chat.innerHTML = data.val().chat

        } else if (user !== currentUser) {

            let createDiv = document.createElement('div')

            createDiv.setAttribute("class", "box2 sb2")

            createDiv.setAttribute("id", data.val().key)

            let createSpan = document.createElement("span")

            createSpan.setAttribute("class", "user")

            createSpan.setAttribute("id", "quest-user")

            let msg = createDiv.appendChild(createSpan)

            let chatAreaBox = chatArea.appendChild(msg.parentElement)

            msg.innerHTML = data.val().name

            let chat = chatAreaBox.appendChild(document.createElement('p'))

            chat.setAttribute("id", "chat")

            chat.innerHTML = data.val().chat
        }

        document.getElementById('chat-area-box').lastChild.scrollIntoView(false)

        message.value = ""


    })

}

mainPage = () => {

    firebase.auth().onAuthStateChanged(user => {

        const userEmail = user.email

        greetings.setAttribute("class", userEmail)

    })

    firebase.database().ref('user').on("child_added", function (data) {

        if (greetings.className === data.val().email) {

            greetings.innerHTML = data.val().name
        }

    })

    gerData()
}

getinp = () => {

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)

        .then((result) => {

            console.log(result)

            window.location = "main.html"
        })
        .catch(function (error) {

            var errorMessage = error.message;

            alert(errorMessage)

        }); email - password.html
}

signup = () => {

    document.getElementById("signup").style.display = "flex";

    document.querySelector(".login-form").style.display = "none"

}

closeSignup = () => {

    document.getElementById("signup").style.display = "none";

    document.querySelector(".login-form").removeAttribute("style")

}

signupDb = () => {

    firebase.auth().createUserWithEmailAndPassword(newEmail.value, newPass.value)

        .then((result) => {

            console.log(result)

            window.location = "main.html"

            email.value = ""

            password.value = ""
        })
        .catch(function (error) {
            var errorMessage = error.message;

            alert(errorMessage)

            newUserName.value = ""
            newEmail.value = ""
            newPass.value = ""

        }); email - password.html


    if (newUserName.value === "") {

        alert("Fill the text feild!")

    } else {

        toTitleCase = (phrase) => {
            return phrase
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        };

        let nuser = toTitleCase(newUserName.value);

        console.log(nuser)

        let users = {
            name: nuser,
            email: newEmail.value,
        }
        firebase.database().ref('user').push(users)
    }
    newUserName.value = ""
    newEmail.value = ""
    newPass.value = ""

}

sendMsg = () => {

    if (message.value === "") {

        alert("Fill the text feild!")

    } else {
        let key = firebase.database().ref('userDb').push().key

        let userDb = {

            key: key,

            name: greetings.innerHTML,

            chat: message.value

        }

        firebase.database().ref('userDb').push(userDb)

        chatBox.scrollTop
    }

    message.value = ""
}

signOut = () => {

    firebase.auth().signOut().then(() => {

        window.location = 'index.html'

    })
}


