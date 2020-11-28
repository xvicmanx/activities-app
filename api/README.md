# API
API for the Activies App
## Setup
```
  npm install
```

## Start
```
  npm start
```
It will start a server at port `4500` by the default.

## SWAGGER
```
Go to http://localhost:4500/api-docs
```

## DEMO

```
Test Login

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"john@activitiesapp.com","password":"pass"}' \
  http://localhost:4500/users/login

It will return a JSON like:

{
  "token":"TOKEN",
  "exp":1583062254,
  "user": {
    "id":100,
    "name":"John Doe",
    "description": "I am awesome and love getting together with my folks"
  },
  "success":true
}
```