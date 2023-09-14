let products = document.getElementById("products");
let head = document.getElementById("head");
let allProducts;

const url = 'http://localhost:7070/products';

fetch(url).then(response => {
    return response.json();
}).then(data => {
    // // id productName productImg productDisc productPrice
    // product.html
    // id, Name, Img, Disc, Price?


    for (let i = 0; i < Object.keys(data).length; i++) {
        productDiscription = data[i].productDisc;
        allProducts = data;
        let product = `
        <div class="product">
            <a href="product.html" onclick="markProduct('${data[i].id}', '${data[i].productName}', '${data[i].productImg}', '${removeQuotes(productDiscription)}' , '${data[i].productPrice}')">
                <div class="productImg p${(i + 1)}"></div>
            </a>
            <div class="productDetail">
                <a href="product.html" onclick="markProduct('${data[i].id}', '${data[i].productName}', '${data[i].productImg}', '${removeQuotes(productDiscription)}' , '${data[i].productPrice}')">
                    <h2>${data[i].productName}</h2>
                </a>
                <h3>₹${data[i].productPrice}</h3>
                <a href="product.html" class="sh" onclick="markProduct('${data[i].id}', '${data[i].productName}', '${data[i].productImg}', '${removeQuotes(productDiscription)}' , '${data[i].productPrice}')">
                    SHOP NOW
                </a>
            </div>
        `
        products.innerHTML = products.innerHTML + product;


        let css = `<style>
        div.p${(i + 1)} {
            position: relative;
            background-image: url(${data[i].productImg});
        }
        
        div.p${(i + 1)}::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(rgba(0, 0, 0, 0.89), rgba(0, 0, 0, 0.13), rgba(0, 0, 0, 0.89));
            opacity: 0;
            transition: opacity .15s;
        }
        
        div.p${(i + 1)}:hover::before {
            opacity: 1;
        }
        </style>
        `
        head.innerHTML = head.innerHTML + css;
    }

}).catch(error => {
    console.error('Fetch error:', error);
});




function removeQuotes(inputString) {
    return inputString.replace(/['"]/g, '');
}



const searchInput = document.getElementById("searchProduct")
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        productSearch()
    }
});




function productSearch() {

    let foundAtLeast1 = false
    let notFound = document.getElementById("notFound")

    const searchedProduct = String(document.getElementById("searchProduct").value).toUpperCase();
    if (searchedProduct == "") {
        location.reload(true);
    }


    if (searchedProduct != "") {
        products.innerHTML = "";
    }

    for (let i = 0; i < Object.keys(allProducts).length; i++) {

        if (allProducts[i].productName.includes(searchedProduct)) {
            notFound.style.display = "none"
            let product = `
            <div class="product">
                <a href="" onclick="markProduct('${allProducts[i].id}')">
                    <div class="productImg p${(i + 1)}"></div>
                </a>
                <div class="productDetail">
                    <a href="" onclick="markProduct('${allProducts[i].id}')">
                        <h2>${allProducts[i].productName}</h2>
                    </a>
                    <h3>₹${allProducts[i].productPrice}</h3>
                    <a href="" class="sh" onclick="markProduct('${allProducts[i].id}')">
                        SHOP NOW
                    </a>
                </div>
            `
            products.innerHTML = products.innerHTML + product;
            foundAtLeast1 = true;

        } else if (foundAtLeast1 == false) {
            console.log(`Not found`);
            notFound.style.display = "inline"
            foundAtLeast1 = true;
        }

    }

}




// id productName productImg productDisc productPrice
// markProduct('id', 'Name', 'Img', 'Disc', 'Price')

function markProduct(id, Name, Img, Disc, Price) {
    localStorage.setItem('productId', id)
    localStorage.setItem('productName', Name)
    localStorage.setItem('productImg', Img)
    localStorage.setItem('productDisc', Disc)
    localStorage.setItem('productPrice', Price)
    console.log(localStorage.setItem('productId', id))
    console.log(localStorage.setItem('productName', Name))
    console.log(localStorage.setItem('productImg', Img))
    console.log(localStorage.setItem('productDisc', Disc))
    console.log(localStorage.setItem('productPrice', Price))
}
























// LOGIN





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





