# MERN Auth Backend for General Assembly project 3 full stack web app
 - Nesso Forest
 - Jimmy Grenadino
 - Thomas Helderop
 - Louis Reilly-Willhight (backend lead)

### ROUTES

LOCAL = localhost:3001

GET / - an amusing quote from a famous cartoon robot

//shema USER

GET /v1/users - (list of all users in collection 'users')
GET /v1/users/view/:id - (view single user using req.params)
POST /v1/addUser - (creates user using req.body)
PUT /v1/updateUserByEmail/:email - (updates user value using $set:req.body)
DELETE /v1/deleteUserByEmail/:email - (deletes user from database)

//schema FAVORITE

GET /v1/favorites 
GET /v1/favorites/view/:id 
POST /v1/addFavorite 
PUT /v1/updateFavoriteByTitle/:title
DELETE /v1/deleteFavoriteByTitle/:title

//schema EVENT

GET /v1/events 
GET /v1/events/view/:id 
POST /v1/addEvent 
PUT /v1/updateEventByTitle/:title
DELETE /v1/deleteEventByTitle/:title


### TODO
UPDATE MODELS EVENT.JS AND FAVORITE.JS TO INCLUDE UNIQUE IDENTIFIERS
UPDATE ROUTES TO REFLECT CHANGES IN MODEL SCHEMA (CURRENTLY "TITLE: ID")

### Technologies

The following technologies were used for this project:

* Node
* Express
* MongoDB
* Mongoose
* Passport
* Jason Web Tokens
* Bcrypt
* Gravatar

### original code c/o Anna Zocher, Sarah King, Nick Quandt, Milcah 
