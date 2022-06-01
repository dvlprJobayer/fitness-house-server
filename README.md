# Project Name: Fitness House

## Project Description: 
This is a Gym Equipment inventory website where stock many type of Gym Equipment. If you create an account you can add Item in inventory. you can update your inventory item and also you can delete them.

## Live Project: [https://fitness-house-2e9fe.web.app/](https://fitness-house-2e9fe.web.app/).

## Project features and functionality:

* The website has mainly seven route which is (Home, Manage Inventories, Add Item, My Items, Blogs, Login and SignUp).
* Default Manage Inventories, Add Item, My Items Menu Item will hide when user login or sign up then user will see hide menu items.
* If a user login or sign up server will create a jwt token and set up user browser's local storage after that when user login and go to my-items route verify user in server with jwt token.
* If a user login or sign up then login button will hide and show the sign out button.
* If a user login or sign up user automatically redirect to homepage.
* The website has a private route component named InventoryItem. if a user without login access to that route user automatically redirect to login page. if a user login then user can navigate Inventory/:id route.
* if a user forget password user can reset password through the login page. login page has a option reset password. if the user click the option user have a link through email. if user click the link user see a option to set a new password.

## The technology used in the project is mentioned below:

* React
* React Router
* React firebase hooks
* Firebase
* React Bootstrap
* React Icons
* React hot toast
* json web token
* express
* mongodb
