const url1 = 'http://localhost:7070/products';
let allProducts;

fetch(url1).then(response => {
    return response.json();
}).then(data => {

    allProducts = data

}).catch(error => {
    console.error('Fetch error:', error);
});





let order = ""
let totalCost = 0;


function cart() {

    const ur2 = 'http://localhost:7070/getCartItems';

    fetch(ur2).then(response => {
        return response.json();
    }).then(data => {
        console.log(data)
        console.log(data.length)
        console.log(data[1])

        let total = 0

        for (let i = 0; i <= data.length; i++) {





            for (let j = 0; j < Object.keys(allProducts).length; j++) {
                if (data[i].cart == allProducts[j].id) {
                    console.log(allProducts[j].productName);

                    total = total + eval(allProducts[j].productPrice);
                    // id productName productImg productDisc productPrice

                    order = order + allProducts[j].id + ","



                    console.log(allProducts[j].productImg)

                    document.getElementById("Item").innerHTML = document.getElementById("Item").innerHTML + `
                    <div class="item">
                        <div class="itemImg" style="background-image: url('${allProducts[j].productImg}');"></div>
                        <div class="itemDis">
                            <h2 class="tag">${allProducts[j].productName}</h2>
                            <p>${allProducts[j].productDisc}</p>
                            <h2>₹${allProducts[j].productPrice}</h2>
                        </div>
                    </div>
                    `
                }
            }

            document.getElementById("Item").innerHTML = document.getElementById("Item").innerHTML + `<hr>`

            document.getElementById("subT").innerHTML = `Subtotal: ₹${total} `
            document.getElementById("tax").innerHTML = `Tax (5%): ₹${Math.floor((5 / 100) * total)} `
            document.getElementById("deliveryF").innerHTML = `Delivery Fees: ₹${100} `
            document.getElementById("totalC").innerHTML = `Total Due: ₹${total + Math.floor((5 / 100) * total) + 100} `
            totalCost = total + Math.floor((5 / 100) * total) + 100;
            console.log(order)
        }




    }).catch(error => {
        console.error('Fetch error:', error);
    });
}


cart()




function moveDateForward(dateString, daysToAdd) {
    const [day, month, year] = dateString.split('-').map(Number);
    const originalDate = new Date(year, month - 1, day); // Months are zero-based

    const newDate = new Date(originalDate);
    newDate.setDate(originalDate.getDate() + daysToAdd);

    const newDay = String(newDate.getDate()).padStart(2, '0');
    const newMonth = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const newYear = newDate.getFullYear();

    return `${newDay}-${newMonth}-${newYear}`;
}



function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}











function validateEmailAndPhone(email, phone) {
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // Regular expression for Indian phone number validation (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;

    // Check if both email and phone are valid
    const isEmailValid = emailRegex.test(email);
    const isPhoneValid = phoneRegex.test(phone);

    return isEmailValid && isPhoneValid;
}


function removeLastComma(inputString) {
    if (inputString.endsWith(',')) {
        return inputString.slice(0, -1);
    }
    return inputString;
}



function placeOrder() {


    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value
    let pincode = document.getElementById("pincode").value
    let city = document.getElementById("city").value
    let state = document.getElementById("state").value
    let address = document.getElementById("address").value

    if (name == "" || email == "" || phone == "" || pincode == "" || city == "" || state == "" || address == "") {
        document.getElementById("errMsg").style.display = "block"
        setTimeout(() => { document.getElementById("errMsg").style.display = "none" }, 2000)
        return;
    }

    if (validateEmailAndPhone(email, phone) == false) {
        document.getElementById("errMsg").style.display = "block"
        setTimeout(() => { document.getElementById("errMsg").style.display = "none" }, 2000)
        return;
    }




    const currentDate = new Date();
    const ordDate = formatDate(currentDate);


    const daysToDeliver = 7;
    const delDate = moveDateForward(ordDate, daysToDeliver);

    let paymentMode = "COD"
    order = removeLastComma(order)

    let url = "http://localhost:7070/order"

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            customer: localStorage.getItem("userEmail"),
            orderDate: ordDate,
            deliveryDate: delDate,
            payMode: paymentMode,
            price: totalCost,
            orderItem: order,
            name: name,
            email: email,
            phone: phone,
            pincode: pincode,
            city: city,
            state: state,
            address: address
        })
    }).then((res) => {
        if (res.ok) {
            return res.text();
        } else {
            throw new Error('Data not received');
        }
    }).then((msg) => {
        console.log(msg)
        if (msg == "OK") {
            window.location.href = '#';
            document.getElementById("addedToCart").classList.add("animateMsgShow")
            setTimeout(() => {
                document.getElementById("addedToCart").classList.remove("animateMsgShow")
                document.getElementById("addedToCart").classList.add("animateMsgRemove")
            }, 900)
            setTimeout(() => { window.location = "user.html" }, 1200)
        }
    })




}