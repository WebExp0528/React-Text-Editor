# Api Platform Base User System

## Documentation

http://localhost:8080/api/docs

## Auth flow

All the requests below require
```http request
Content-Type: application/json
```
and all the requests, except the registration and login require auth header 
```http request
Authorization: Bearer {token}
```

1. Register a user

    POST /api/register in the docs

1.  Login a user
    ```
    POST /api/login_check
    
    {
    	"username": "user@email.com",
    	"password": "secretS1"
    }
    ```
    Returns a token that will be used for further requests.
    Use the token in the Authorization header
1.  Reset password

    PUT /api/{id}/reset-password in the docs
1. Update a user
    PUT /api/{id} in the docs
