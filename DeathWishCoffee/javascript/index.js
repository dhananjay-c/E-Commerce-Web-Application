// localStorage.setItem('log', 0)

const logValue = localStorage.getItem('log');

if (logValue === null) {
    localStorage.setItem('log', 0)
}


function login() {
    console.log("log = " + localStorage.getItem('log'))

    if (localStorage.getItem('log') == 0) {
        let logPge = document.getElementById("log")
        logPge.classList.remove("hide")
        console.log(logPge)
        console.log("2")
    }
    else if (localStorage.getItem('log') == 1) {
        window.location.href = 'user.html';
    }
}

function hideLog() {
    let logPge = document.getElementById("log")
    logPge.classList.add("hide")
}



function showReg() {
    let loginForm = document.getElementById("loginForm")
    loginForm.classList.add("hide")

    let signupForm = document.getElementById("signupForm")
    signupForm.classList.remove("hide")

}


function showLog() {
    let loginForm = document.getElementById("loginForm")
    loginForm.classList.remove("hide")

    let signupForm = document.getElementById("signupForm")
    signupForm.classList.add("hide")
}








function validateName(name) {
    return /^[A-Za-z\s]+$/.test(name);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\d{10}$/.test(phone);
}



function validate() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const errMsg = document.getElementById("errSpanSignE2")

    let valid = true;

    if (!validateName(nameInput.value)) {
        errMsg.classList.remove("errSpanSignE2")
        setTimeout(() => {
            errMsg.classList.add("errSpanSignE2")
        }, 4000)
        valid = false;
        return;
    }

    if (!validateEmail(emailInput.value)) {
        errMsg.classList.remove("errSpanSignE2")
        setTimeout(() => {
            errMsg.classList.add("errSpanSignE2")
        }, 4000)
        valid = false;
        return;
    }

    if (!validatePhone(phoneInput.value)) {
        errMsg.classList.remove("errSpanSignE2")
        setTimeout(() => {
            errMsg.classList.add("errSpanSignE2")
        }, 4000)
        valid = false;
        return;
    }

    let pass = document.getElementById("password")

    if (pass == "") {
        errMsg.classList.remove("errSpanSignE2")
        setTimeout(() => {
            errMsg.classList.add("errSpanSignE2")
        }, 4000)
        valid = false;
        return;
    }



    if (valid == true) {

        const nameValue = document.getElementById('name').value;
        const emailValue = document.getElementById('email').value;
        const phoneValue = document.getElementById('phone').value;
        const passwordValue = document.getElementById('password').value;

        const result = fetch('http://localhost:7070/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Name: nameValue,
                Email: emailValue,
                Phone: phoneValue,
                Password: passwordValue
            })
        });

        result.then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Data not received');
            }
        })
            .then((message) => {
                console.log(message);
                if (message == "OK") {
                    console.log(message)
                    let Msg = document.getElementById("okSpanSignE2")
                    Msg.classList.remove("OkSpanSignE2")
                    setTimeout(() => {
                        Msg.classList.add("OkSpanSignE2")
                    }, 4000)
                    clearInputFields()
                }
                else if (message == "NO") {
                    console.log(message)
                    console.log("email/phone exist")
                    let errMsg = document.getElementById("errSpanSignE1")
                    errMsg.classList.remove("errSpanSignE1")
                    setTimeout(() => {
                        errMsg.classList.add("errSpanSignE1")
                    }, 4000)
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }


}


function clearInputFields() {
    const inputElements = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    inputElements.forEach(input => {
        input.value = ''; // Set the value to an empty string
    });
}


function markProduct(id) {
    localStorage.setItem('productId', id)
    console.log(localStorage.getItem('productId'))
}






function validateLogin() {
    console.log("11")
    const emailInput = document.getElementById('emailLogin');
    const passwordInput = document.getElementById('passwordLogin');
    const errMsg = document.getElementById("errSpan2")
    let valid = true;

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue == '') {
        console.log("m1")
        errMsg.classList.remove("errSpan2")
        setTimeout(() => {
            errMsg.classList.add("errSpan2")
        }, 4000)
        valid = false;
    }

    if (passwordValue == '') {
        console.log("m2")
        errMsg.classList.remove("errSpan2")
        setTimeout(() => {
            errMsg.classList.add("errSpan2")
        }, 4000)
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
        errMsg.classList.remove("errSpan2")
        setTimeout(() => {
            errMsg.classList.add("errSpan2")
        }, 4000)
        valid = false;
    }

    if (valid == true) {

        let cred = {
            "email": emailValue,
            "password": passwordValue
        }
        console.log(cred)


        let result = fetch("http://localhost:7070/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(cred)
        })
        result.then((response) => {
            return response.text();
        }).then((message) => {
            if (message == "OK") {
                console.log(message)
                let ermsg = document.getElementById("errSpan")
                ermsg.classList.add("errSpan")
                clearInputFields()
                localStorage.setItem('log', 1)
                console.log(localStorage.getItem('log'))

                let user = fetch("http://localhost:7070/getCurrentUser")
                user.then(response => {
                    return response.json();
                }).then(data => {
                    console.log("Current User = ")
                    localStorage.setItem("userName", data[0].name)
                    localStorage.setItem("userEmail", data[0].email)
                    localStorage.setItem("userPhone", data[0].phone)
                    console.log(localStorage.getItem("userName"))
                    console.log(localStorage.getItem("userEmail"))
                    console.log(localStorage.getItem("userPhone"))
                    window.location.href = 'user.html';
                })
            }
            else if (message == "NO") {
                console.log(message)
                let ermsg = document.getElementById("errSpan")
                ermsg.classList.remove("errSpan")
            }

        }).catch((err) => {
            console.log(err)
        })

    }


}