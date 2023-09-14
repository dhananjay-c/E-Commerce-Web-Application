const path = require("path")
const express = require('express')
const app = express();
const { createPool } = require('mysql');
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "0907",
    database: "deathwishcoffee",
    connectionLimit: 10
})
const port = 7070;






const DeathWishCoffee = path.join(__dirname, "/DeathWishCoffee")
app.use(express.static(DeathWishCoffee))
app.use(express.json())



function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined) rv[i] = arr[i];
    return rv;
}

function extractUsername(email) {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
        return email.substring(0, atIndex);
    }
    return email;
}



app.get("/products", (req, res) => {
    var sqlInsertQuery = `select * from products;`;
    pool.query(sqlInsertQuery, (err, result, field) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            let data = toObject(result);

            // console.log(data);
            res.status(200).send(JSON.stringify(data))
        }

    })

})




app.post("/register", (req, res) => {
    const data = req.body;

    let registerQuery = `INSERT INTO customers(name, email, phone, password)
    VALUES("${data.Name}", "${data.Email}", "${data.Phone}", "${data.Password}");`

    pool.query(registerQuery, (err, result, field) => {
        if (err) {
            // console.log(err);
            res.send("NO");
            return;
        }
        else {
            console.log(result);
            res.send("OK");
        }
    })

    let userTableName = extractUsername(data.Email)

    let cuustomerTableQuery = `CREATE TABLE dwc${userTableName}(cart varchar(255), wlist varchar(255));`

    pool.query(cuustomerTableQuery, (err, result, field) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log(result);
        }
    })


});

let currentUser = ""

app.post("/login", (req, res) => {
    const data = req.body;
    console.log(data);
    let loginQuery = `SELECT * FROM customers WHERE email = '${data.email}';`
    pool.query(loginQuery, (err, result, field) => {
        if (err) {
            res.send("NO");
            // return;
        }
        else {
            let db = toObject(result);
            console.log(db)
            if (Object.keys(db).length === 0) {
                res.send("NO");
            } else {
                db = JSON.parse(JSON.stringify(db))
                console.log(db["0"]["password"]);
                currentUser = db
                if (db["0"]["password"] == data.password) {
                    res.send("OK")
                }
                else if (db.password != data.password) {
                    res.send("NO")
                }
            }

        }
    })
})


app.get("/getCurrentUser", (req, res) => {
    res.status(200).send(JSON.stringify(currentUser))
})







let allReviews = "";
app.post("/reviews", (req, res) => {

    let id = req.body;


    console.log(id.product)

    var sqlInsertQuery = `select * from ${id.product};`;
    pool.query(sqlInsertQuery, (err, result, field) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            // console.log(result);
            function toObject(arr) {
                var rv = {};
                for (var i = 0; i < arr.length; ++i)
                    if (arr[i] !== undefined) rv[i] = arr[i];
                return rv;
            }

            let data = toObject(result);
            console.log(JSON.stringify(data));
            allReviews = JSON.stringify(data);
        }

    })




})


app.get("/getReview", (req, res) => {
    res.status(200).send(allReviews);
})


app.post("/postReview", (req, res) => {
    // console.log(req.body)
    let reviewQuery = `INSERT INTO ${req.body.product} (customerName, stars, review)
    VALUES ('${req.body.user}', ${req.body.stars}, '${req.body.userReview}');`

    pool.query(reviewQuery, (err, result, field) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(result);
            res.send("OK")
        }
    })
})



























app.post("/addToCart", (req, res) => {
    console.log(req.body)
    let userTableName = extractUsername(req.body.user)
    let cartQuery = `INSERT INTO dwc${userTableName} (cart, wlist) VALUES('${req.body.item}', '');`
    cUser = `dwc${userTableName}`
    // console.log(cUser)

    pool.query(cartQuery, (err, result, field) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(result);
        }
    })
})


app.get("/getCartItems", (req, res) => {
    console.log("=====" + currentUser[0].email)

    let user = `dwc${extractUsername(currentUser[0].email)}`
    console.log(user)

    let cartGetter = `SELECT cart FROM ${user} WHERE cart <> '';`

    pool.query(cartGetter, (err, result, field) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send(JSON.stringify(result))
        }
    })


})









app.post("/addTowList", (req, res) => {
    console.log(req.body)
    let userTableName = extractUsername(req.body.user)
    let cartQuery = `INSERT INTO dwc${userTableName} (cart, wlist) VALUES('', '${req.body.item}');`
    cUser = `dwc${userTableName}`
    // console.log(cUser)

    pool.query(cartQuery, (err, result, field) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(result);
        }
    })
})



app.get("/getwListItems", (req, res) => {
    console.log("=====" + currentUser[0].email)

    let user = `dwc${extractUsername(currentUser[0].email)}`
    console.log(user)

    let cartGetter = `SELECT wlist FROM ${user} WHERE wlist <> '';`

    pool.query(cartGetter, (err, result, field) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send(JSON.stringify(result))
        }
    })


})


app.post("/removeCartItem", (req, res) => {
    console.log(req.body.productID)
    console.log(req.body.User)

    let user = `dwc${extractUsername(req.body.User)}`
    // let delQuery = `DELETE FROM ${user}
    // WHERE cart = '${req.body.productID}';`

    let delQuery = `DELETE FROM ${user}
    WHERE cart = '${req.body.productID}'
    ORDER BY cart  
    LIMIT 1;`


    console.log(delQuery)

    pool.query(delQuery, (err, result, field) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send("OK")
        }
    })
})





app.post("/removeWlistItem", (req, res) => {
    console.log(req.body.productID)
    console.log(req.body.User)

    let user = `dwc${extractUsername(req.body.User)}`
    let delQuery = `DELETE FROM ${user}
    WHERE wlist = '${req.body.productID}';`

    console.log(delQuery)

    pool.query(delQuery, (err, result, field) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send("OK")
        }
    })
})





app.post("/order", (req, res) => {

    let orderQuery = `INSERT INTO orders (customer, orderDate, deliveryDate, deliveryStatus, payMode, price, orderItem, name, email, phone, pincode, city, state, address) 
        VALUES ('${req.body.customer}', '${req.body.orderDate}', '${req.body.deliveryDate}', '${0}', '${req.body.payMode}', '${req.body.price}', '${req.body.orderItem}', '${req.body.name}', '${req.body.email}', '${req.body.phone}', '${req.body.pincode}', '${req.body.city}', '${req.body.state}', '${req.body.address}');`


    pool.query(orderQuery, (err, result, field) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(result);
            res.send("OK")
        }
    })

})



app.post("/getUserOrders", (req, res) => {
    let usr = req.body.usr;

    let query = `SELECT * FROM orders WHERE customer = "${usr}"`

    pool.query(query, (err, result, field) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send(JSON.stringify(result))
        }
    })
})



app.post("/getAllPendingOrders", (req, res) => {

    let query = `SELECT * FROM orders WHERE deliveryStatus = "0"`

    pool.query(query, (err, result, field) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send(JSON.stringify(result))
        }
    })
})



















app.listen(port, () => { console.log(`${port} - Active`) })





























































// CREATE TABLE orders(
//     id varchar(255),
//     productName varchar(255),
//     productPrice varchar(255),
//     productImg varchar(255),
//     productDisc LONGTEXT
// );



// CREATE TABLE orders(
// customer varchar(255),
// orderDate varchar(255),
// deliveryDate varchar(255),
// deliveryStatus varchar(255),
// payMode varchar(255),
// price varchar(255),
// orderItem varchar(255),
// name varchar(255),
// email varchar(255),
// phone varchar(255),
// pincode varchar(255),
// city varchar(255),
// state varchar(255),
// address LONGTEXT
// );


// CREATE TABLE products(
//     id varchar(255),
//     productName varchar(255),
//     productPrice varchar(255),
//     productImg varchar(255),
//     productDisc LONGTEXT
// );



// INSERT INTO products(id, productName, productPrice, productImg, productDisc)
// VALUES('CHC', 'CHOCOLATE HAZELNUT COFFEE', '499', '../img/ch.jpg', "Poised in the perfect purgatory of dark chocolate and heavenly hazelnut, this medium-roasted and full-bodied brew packs the everlasting strength you need with the flavor you crave. We worship the ground our goods come from, which means only Fair Trade arabica and robusta beans reach our roasters. Devilishly decadent and never acidic, this fudge-forward flavor tastes like a sin but doesn’t sip like one."),

// VALUES('ERC', 'ESPRESSO ROAST COFFEE', '499', '../img/er.jpg', "Our Espresso Roast delivers a bold, full-bodied yet smooth and flavorful brew that will awaken your taste buds, with an extra kick of caffeine to ignite your attitude. Rich and intense with espresso-like texture and depth plus subtle undertones of caramelized sugar, prepare to abandon café lines and BYOB — Be Your Own Barista."),

// VALUES('VRCC', 'VANILLA RICH & CREAMY COFFEE', '499', '../img/v.jpg', "There's nothing 'vanilla' about this brew. Warm your cold heart in a blaze of balanced, rich vanilla that's medium roasted and made with no artificial ingredients. A blend of arabica and robusta beans pair perfectly with vanilla for a bold, smooth taste and a subtly sweet finish made for sipping in solitude."),

// VALUES('MRC', 'MEDIUM ROAST COFFEE', '499', '../img/ws.jpg', "Our Medium Roast Coffee delivers a bold, full-bodied yet smooth and flavorful brew that will awaken your taste buds, with an extra kick of caffeine to ignite your attitude. Smooth and balanced with a complex flavor profile including subtle undertones of stone fruit and caramel, we recommend at least one cup first thing in the morning in total isolation."),

// VALUES('DRC', 'DARKEST ROAST COFFEE', '499', '../img/wsc.jpg', "Our OG bag of beans may be the only morning friend you’ll ever need. Sourced from the highest-quality coffee beans in the world and roasted to deep, never-bitter perfection, with notes of dark chocolate + black cherry. We recommend at least one cup, first thing in the morning, in total isolation. This is a pound of power—basic brews not invited. "),

// VALUES('BBC', 'BLUE AND BURIED COFFEE', '499', '../img/bab.jpg', "Need to bury your troubles? Drown them up in Blue and Buried® Coffee that tastes like a thick slice of blueberry coffee cake, with natural flavors of blueberry jam, luscious vanilla and sweet Vietnamese cinnamon—behold your fully baked wake-up call. Reaper Tip: Brew it hot or let it blow your mind over ice—add cream + sugar for the full death-by-decadence experience.");







// CREATE TABLE customers (
//     name VARCHAR(255),
//     email VARCHAR(255) UNIQUE,
//     phone VARCHAR(255) UNIQUE,
//     password VARCHAR(255)
// );

// INSERT INTO customers(name, email, phone, password)
// VALUES("{}", "{}", "{}", "{}");



// CREATE TABLE customerscartwishlist(
//     cart varchar(255),
//     wlist varchar(255)
// );



// CREATE TABLE CHC(
//     customerName varchar(255),
//     stars varchar(1),
//     review LONGTEXT
// );

// CHC
// ERC
// VRCC
// MRC
// DRC
// BBC

// INSERT INTO DRC(customerName, stars, review)
// VALUES("DemoName2 DRC", "2", "Good Coffee Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, tempore.");





















