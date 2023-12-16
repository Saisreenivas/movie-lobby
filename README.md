# Requirements

- Dockerfile
- NodeJS

# System Setup

Install MongoDB in Docker
- ```COMPOSE_PROJECT_NAME=movie_lobby_app docker-compose -f setup/docker-compose.yml up -d```

# Setup Prod Server

1. Install node modules:

    ```npm install```

1. Add data to mongodb:

    ```npm run init```

1. Start Production Server:

    ```npm run build && npm run serve```


# Setup Dev Server

1. Install node modules:

    ```npm install```

1. Add data to mongodb:

    ```npm run init```

1. Start Production Server:

    ```npm run dev```



# APIs cURL

1. Health Check API:

    ```
    curl --location 'http://localhost:3000/health'
    ```

1. Get All Movies:

    ```
    curl --location 'http://localhost:3000/movies'
    ```

1. Search for a movie or genre:

    ```
    curl --location 'http://localhost:3000/search?q=action'
    ```

1. Add a new movie to the lobby

    For Admin access, use Basic Authorization with username: admin, password: admin


    ```
    curl --location 'http://localhost:3000/movies' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
    --data '{
        "title": "RRR",
        "genre": "Drama",
        "rating": 9.5,
        "streamingLink": "www.primevideo.com/rrr"
    }'
    ```



1. Update an existing movie's information

    use the `:id` below from the `_id` field from response above

    ```
    curl --location --request PUT 'http://localhost:3000/movies/:id' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
    --data '{
        "title": "Bahubali",
        "genre": "Action",
        "rating": 4,
        "streamingLink": "www.primevideo.com/bahubali"
    }'
    ```

1. Delete a movie from the lobby

    use the `:id` below from the `_id` field from response above


    ```
    curl --location --request DELETE 'http://localhost:3000/movies/657e041e125fedf7b1199c9b' \
    --header 'authorization: Basic YWRtaW46YWRtaW4=' \
    --header 'Content-Type: application/json' \
    --data '{
        "title": "Bahubali",
        "genre": "Action",
        "rating": 4,
        "streamingLink": "www.primevideo.com/bahubali"
    }'
    ```