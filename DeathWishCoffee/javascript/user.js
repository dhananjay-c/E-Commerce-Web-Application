

document.getElementById("title").innerHTML = localStorage.getItem("userName");
document.getElementById("hello").innerHTML = `Wellcome to Death Wish Coffee ${localStorage.getItem("userName")}..!`








const url1 = 'http://localhost:7070/products';
let allProducts;

fetch(url1).then(response => {
    return response.json();
}).then(data => {

    allProducts = data

}).catch(error => {
    console.error('Fetch error:', error);
});






function wilist() {

    const ur2 = 'http://localhost:7070/getwListItems';

    fetch(ur2).then(response => {
        return response.json();
    }).then(data => {


        // id productName productImg productDisc productPrice

        console.log(data.length)

        if (data.length == 0) {
            document.getElementById("Wishlist").innerHTML = document.getElementById("Wishlist").innerHTML + `
        <h2
            style="font-size: 1.2vmax; margin-top: 2vmax; font-weight: 200; color: rgba(255, 255, 255, 0.534);margin-left: 0vmax;">
            <em>Nothing To Show Here...</em>
        </h2>`
        }

        for (let i = 0; i < data.length; i++) {



            console.log(data)

            const uniqueData = [];
            const uniqueValues = {};

            for (const item of data) {
                const wlist = item.wlist;
                if (!uniqueValues[wlist]) {
                    uniqueValues[wlist] = true;
                    uniqueData.push(item);
                }
            }

            console.log(uniqueData);


            for (let j = 0; j < Object.keys(allProducts).length; j++) {
                if (uniqueData[i].wlist == allProducts[j].id) {
                    console.log(allProducts[j].productName);

                    document.getElementById("Wishlist").innerHTML = document.getElementById("Wishlist").innerHTML + `
                <div class="product" id="product">
                <div class="img" style="background-image: url('${allProducts[j].productImg}');"></div>
                <div class="details" id="details">
                    <h1 class="title">
                    <span class="ttl">${allProducts[j].productName}<img src="img/cancel.png" alt=""
                    class="removeItem" onclick="removeWlistItem('${allProducts[j].id}')"></span>   
                    </h1>
                    <p>
                        ${allProducts[j].productDisc.replace(/["']/g, '')}
                    </p>
                    <h2>
                        ₹${allProducts[j].productPrice}
                    </h2>
                </div>
            </div>
    `



                }
            }
        }



    }).catch(error => {
        console.error('Fetch error:', error);
    });


}










function cart() {

    const ur2 = 'http://localhost:7070/getCartItems';

    fetch(ur2).then(response => {
        return response.json();
    }).then(data => {


        // id productName productImg productDisc productPrice

        console.log(data.length)

        if (data.length == 0) {
            document.getElementById("Wishlist").innerHTML = document.getElementById("Wishlist").innerHTML + `
        <h2
            style="font-size: 1.2vmax; margin-top: 2vmax; font-weight: 200; color: rgba(255, 255, 255, 0.534);margin-left: 0vmax;">
            <em>Nothing To Show Here...</em>
        </h2>`
        }

        let total = 0;
        for (let i = 0; i < data.length; i++) {

            // console.log(data)

            const uniqueData = [];
            const uniqueValues = {};

            for (const item of data) {
                const wlist = item.cart;
                if (!uniqueValues[wlist]) {
                    uniqueValues[wlist] = true;
                    uniqueData.push(item);
                }
            }

            console.log(uniqueData);


            for (let j = 0; j < Object.keys(allProducts).length; j++) {
                if (data[i].cart == allProducts[j].id) {
                    console.log(allProducts[j].productName);

                    total = total + eval(allProducts[j].productPrice);

                    document.getElementById("Wishlist").innerHTML = document.getElementById("Wishlist").innerHTML + `
                <div class="product" id="product">
                <div class="img" style="background-image: url('${allProducts[j].productImg}');"></div>
                <div class="details" id="details">
                    <h1 class="title">
                    <span class="ttl">${allProducts[j].productName}<img src="img/cancel.png" alt=""
                                class="removeItem" onclick="removeCartItem('${allProducts[j].id}')"></span>
                    </h1>
                    <p>
                        ${allProducts[j].productDisc.replace(/["']/g, '')}
                    </p>
                    <h2>
                        ₹${allProducts[j].productPrice}
                    </h2>
                </div>
            </div>    
    `
                }
            }
        }

        document.getElementById("Wishlist").innerHTML = document.getElementById("Wishlist").innerHTML + `
        <hr class="topHR">
        <div class="cOutDiv">
            <span>
                <h2 class="tPrice"><span>Total</span> - ₹${total}</h2>
            </span>
            <span>
                <input type="button" value="Check Out" class="cOut" onclick="checkOut(${total})">
            </span>
        </div> 
        <hr class="bottomHR">`

        console.log("->" + total)

    }).catch(error => {
        console.error('Fetch error:', error);
    });


}











function displaySaved() {
    document.getElementById("slected").innerHTML = `
    <h1>Wishlist</h1>
        <span id="Wishlist">
            <hr>
        </span>`

    wilist()
}


function displayCart() {
    document.getElementById("slected").innerHTML = `
    <h1>Cart</h1>
        <span id="Wishlist">
            <hr>
        </span>`

    cart()
}


function displayOrders() {
    document.getElementById("slected").innerHTML = `
    <h1>Your Orders</h1>
        <span id="Wishlist">
            <hr class="orderHR">
        </span>`
    order()
}







function logOut() {
    localStorage.setItem('log', 0)
    window.location.href = "index.html"
}













function removeCartItem(productID) {
    console.log(productID)
    console.log(localStorage.getItem("userEmail"))

    let res = fetch("http://localhost:7070/removeCartItem", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            productID: productID,
            User: localStorage.getItem("userEmail")
        })
    })


    res.then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Data not received');
        }
    }).then((message) => {
        console.log(message);
        if (message == "OK") {
            displayCart()
        }
        else {
            console.log("Error while Removing Cart Item!")
        }
    })
}




function removeWlistItem(productID) {
    console.log(productID)
    console.log(localStorage.getItem("userEmail"))

    let res = fetch("http://localhost:7070/removeWlistItem", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            productID: productID,
            User: localStorage.getItem("userEmail")
        })
    })


    res.then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Data not received');
        }
    }).then((message) => {
        console.log(message);
        if (message == "OK") {
            displaySaved()
        }
        else {
            console.log("Error while Removing Cart Item!")
        }
    })
}



















function checkOut(total) {
    if (total == 0) {
        window.location.href = '#';
        document.getElementById("addedToCart").classList.add("animateMsgShow")
        setTimeout(() => {
            document.getElementById("addedToCart").classList.remove("animateMsgShow")
            document.getElementById("addedToCart").classList.add("animateMsgRemove")
        }, 900)
        return;
    }
    window.location = "checkOut.html"
    // window.open("checkOut.html", '_blank')
}























function order() {

    const ur2 = 'http://localhost:7070/getUserOrders';

    fetch(ur2, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            usr: localStorage.getItem("userEmail")
        })
    }).then(response => {
        return response.json();
    }).then(data => {


        console.log(data)
        console.log(data.length)
        document.getElementById("Wishlist").innerHTML = document.getElementById("Wishlist").innerHTML

        for (let i = data.length; i > 0; i--) {
            document.getElementById("Wishlist").innerHTML = document.getElementById("Wishlist").innerHTML + `
            <div class="orderItem">
                <h2>Your Order for <span>${data[i - 1].name}.</span></h2>
                <h3>Order Placed on - <span>${data[i - 1].orderDate}.</span></h3>
                <h3>Will be Delivered By - <span>${data[i - 1].deliveryDate}.</span></h3>
                <h3>Payment Mode - <span>Cash On Delivery.</span></h3>
                <h3>Address</h3>
                <h4>State: <span>${data[i - 1].state}.</span></h4>
                <h4>City: <span>${data[i - 1].city}.</span></h4>
                <h4>Pin Code: <span>${data[i - 1].pincode}.</span></h4>
                <h4>Address: <span>${data[i - 1].address}.</span></h4>
                <h3>Contact Details</h3>
                <h4>Email: <span>${data[i - 1].email}.</span></h4>
                <h4>Phone: <span>${data[i - 1].phone}.</span></h4>
                <h3>Total Amout to Pay - <span>₹${data[i - 1].price}.</span></h3>
                <hr class="botmHr">
            </div>
            `
        }





    }).catch(error => {
        console.error('Fetch error:', error);
    });


}




order()