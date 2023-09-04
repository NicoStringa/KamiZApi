# KamiZApi

# Endpoints

#PATCH Verify
localhost:8080/auth/verify
localhost:8080/auth/verify
Verify the user with the required fields: { "code": string, "email": string}

The code was previously sent to the registered email.

#POST Register
localhost:8080/auth/register
localhost:8080/auth/register
Register new user.

Send in the body a JSON with the following fields:

{ "name": string, "email": string, "password": string }

Returns the information of the registered user.

#POST Login
localhost:8080/auth/login
localhost:8080/auth/login
Login of an existing user.

Send in the body a JSON with the following fields: { "email": string, "password": string }

Returns the information of the logged in user and the JSON Web Token assigned to the user in this session.

*The JWT is required on some requests.

#POST Orders
localhost:8080/orders
localhost:8080/orders
Create a new order.

Send in the header the JWT of the logged in user ({"x-token: token"})

Send in the body a JSON with the following fields:

{
"price": number,
"shippingCost": number,
"total": number,
"shippingDetails": {
"name": "Name",
"cellphone": "Cellphone",
"location": "Location",
"address": "Address"
},
"items": [
{
"desc": "Desc of item",
"id": "25",
"img": "Image URL",
"price": number,
"quantity": number,
"title": "Item name"
}
]
}

#GET Orders
localhost:8080/orders
localhost:8080/orders
Get the orders made by the current user.

Send in the header the JWT of the logged in user: ({"x-token": token})

Returns an array of objects with the orders.

#POST Issues
localhost:8080/issues
localhost:8080/issues
Creates a new issue.

Send in the body a JSON with the following fields:

{ "title": string, "desc": string, "priority": number }
