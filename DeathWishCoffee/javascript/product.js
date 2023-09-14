// Check if the query parameter "reload" is not present
if (!window.location.search.includes('reload=true')) {
    // Add the "reload" query parameter
    const updatedURL = window.location.href + (window.location.search ? '&' : '?') + 'reload=true';

    // Wait for 2 seconds (2000 milliseconds) and then navigate to the updated URL
    setTimeout(function () {
        window.location.href = updatedURL;
    }, 500);
}








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


// function markProduct(id) {
//     localStorage.setItem('productId', id)
//     console.log(localStorage.getItem('productId'))
// }






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
                    hideLog()
                    window.location.href = '#';
                    document.getElementById("loginSuccess").classList.add("animateMsgShow")
                    setTimeout(() => {
                        document.getElementById("loginSuccess").classList.remove("animateMsgShow")
                        document.getElementById("loginSuccess").classList.add("animateMsgRemove")
                    }, 800)


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










// console.log(localStorage.getItem('productId'))








// const url = 'http://localhost:7070/products';
// let allProducts;

// fetch(url).then(response => {
//     return response.json();
// }).then(data => {
//     allProducts = data;
// }).catch(error => {
//     console.error('Fetch error:', error);
// });







// localStorage.setItem('productId', id)
// localStorage.setItem('productName', Name)
// localStorage.setItem('productImg', Img)
// localStorage.setItem('productDisc', Disc)
// localStorage.setItem('productPrice', Price)



document.getElementById("title").innerHTML = localStorage.getItem('productName')

console.log(localStorage.getItem('productName'))




let cName = document.getElementById("cName")
let cPrice = document.getElementById("cPrice")
let cDisc = document.getElementById("cDisc")
let productImg = document.getElementById("productImg")

cName.innerHTML = `${localStorage.getItem('productName')}`
cPrice.innerHTML = `₹${localStorage.getItem('productPrice')} `
cDisc.innerHTML = `${localStorage.getItem('productDisc')}`

productImg.style = `background-image: url(${localStorage.getItem('productImg')});`



function cart() {

    if (localStorage.getItem('log') == 0) {
        let logPge = document.getElementById("log")
        logPge.classList.remove("hide")
        console.log(logPge)
    }
    else if (localStorage.getItem('log') == 1) {
        console.log(localStorage.getItem('productId'))
        console.log(localStorage.getItem("userEmail"))

        let cItem = fetch("http://localhost:7070/addToCart", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                item: localStorage.getItem('productId'),
                user: localStorage.getItem("userEmail")
            })
        })

        window.location.href = '#';
        document.getElementById("addedToCart").classList.add("animateMsgShow")
        setTimeout(() => {
            document.getElementById("addedToCart").classList.remove("animateMsgShow")
            document.getElementById("addedToCart").classList.add("animateMsgRemove")
        }, 800)

    }
}



function wList() {
    if (localStorage.getItem('log') == 0) {
        let logPge = document.getElementById("log")
        logPge.classList.remove("hide")
        console.log(logPge)
    }
    else {
        console.log(localStorage.getItem('productId'))
        console.log(localStorage.getItem("userEmail"))

        let cItem = fetch("http://localhost:7070/addTowList", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                item: localStorage.getItem('productId'),
                user: localStorage.getItem("userEmail")
            })
        })
        window.location.href = '#';
        document.getElementById("addedToWlist").classList.add("animateMsgShow")
        setTimeout(() => {
            document.getElementById("addedToWlist").classList.remove("animateMsgShow")
            document.getElementById("addedToWlist").classList.add("animateMsgRemove")
        }, 800)

    }
}










let sCount = 0

function starCount(str) {
    switch (str) {
        case 1:
            document.getElementById(`start1`).src = "img/YelloStar.png";

            document.getElementById(`start2`).src = "img/WhiteStar.png";
            document.getElementById(`start3`).src = "img/WhiteStar.png";
            document.getElementById(`start4`).src = "img/WhiteStar.png";
            document.getElementById(`start5`).src = "img/WhiteStar.png";
            sCount = 1
            break;
        case 2:
            document.getElementById(`start1`).src = "img/YelloStar.png";
            document.getElementById(`start2`).src = "img/YelloStar.png";

            document.getElementById(`start3`).src = "img/WhiteStar.png";
            document.getElementById(`start4`).src = "img/WhiteStar.png";
            document.getElementById(`start5`).src = "img/WhiteStar.png";
            sCount = 2
            break;
        case 3:
            document.getElementById(`start1`).src = "img/YelloStar.png";
            document.getElementById(`start2`).src = "img/YelloStar.png";
            document.getElementById(`start3`).src = "img/YelloStar.png";

            document.getElementById(`start4`).src = "img/WhiteStar.png";
            document.getElementById(`start5`).src = "img/WhiteStar.png";
            sCount = 3
            break;
        case 4:
            document.getElementById(`start1`).src = "img/YelloStar.png";
            document.getElementById(`start2`).src = "img/YelloStar.png";
            document.getElementById(`start3`).src = "img/YelloStar.png";
            document.getElementById(`start4`).src = "img/YelloStar.png";

            document.getElementById(`start5`).src = "img/WhiteStar.png";
            sCount = 4
            break;
        case 5:
            document.getElementById(`start1`).src = "img/YelloStar.png";
            document.getElementById(`start2`).src = "img/YelloStar.png";
            document.getElementById(`start3`).src = "img/YelloStar.png";
            document.getElementById(`start4`).src = "img/YelloStar.png";
            document.getElementById(`start5`).src = "img/YelloStar.png";
            sCount = 5
            break;
    }
}









// function getKeyByValue(value) {
//     for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
//         const storedValue = localStorage.getItem(key);

//         if (storedValue === value) {
//             return key;
//         }
//     }
//     return null; // Key not found
// }





let id = localStorage.getItem('productId')
console.log(id)






const result = fetch('http://localhost:7070/reviews', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        product: id
    })
})




const url = 'http://localhost:7070/getReview';

fetch(url).then(response => {
    return response.json();
}).then(data => {

    console.log(data)
    console.log(Object.keys(data).length)
    let review = document.getElementById("revTmp")


    for (i = 0; i < Object.keys(data).length; i++) {

        let stars = ""

        console.log(data[i].stars)

        for (j = 0; j < data[i].stars; j++) {
            stars = stars + `<img src="img/YelloStar.png" alt="" class="star">`
        }

        console.log(stars)

        review.innerHTML = review.innerHTML + `<h2 class="name">${data[i].customerName}</h2>
                            <div class="revstart">
                            ${stars}
                            </div>
                            <div class="revpara">
                            ${data[i].review}
                            </div>
                            <hr>`
    }





}).catch(error => {
    console.error('Fetch error:', error);
});


function submitReview() {
    let review = document.getElementById('userReview').value

    if (localStorage.getItem('log') == 0) {
        login();
        return;
    }

    if (review == '' || sCount == 0) {
        document.getElementById("reviewErr").classList.remove("hideErReview")
        setTimeout(() => {
            document.getElementById("reviewErr").classList.add("hideErReview")
        }, 2000)
    }
    else {
        console.log(localStorage.getItem('productId'))
        console.log(localStorage.getItem('userName'))
        console.log(review)
        console.log(sCount)

        let revPost = fetch("http://localhost:7070/postReview", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                product: localStorage.getItem('productId'),
                user: localStorage.getItem('userName'),
                userReview: review,
                stars: sCount
            })
        })

        revPost.then((res) => {
            if (res.ok) {
                return res.text();
            } else {
                throw new Error('Data not received');
            }
        }).then((msg) => {
            console.log(msg)
            if (msg == "OK") {
                window.location.reload(1)
            }
            else {
                console.log("Error Posting Review!")
            }
        })


    }
}













