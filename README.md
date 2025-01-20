# text-analyzer
To run the application:
- Install docker and run `docker compose up --build`


# Testing
these APIs can be tested using Postman or a similar API testing tool by sending GET requests to the following URLs:
1. Word Count: `GET http://localhost:3000/api/texts/words/{id}`
2. Character Count: `GET http://localhost:3000/api/texts/characters/{id}`
3. Sentence Count: `GET http://localhost:3000/api/texts/sentences/{id}`
4. Paragraph Count: `GET http://localhost:3000/api/texts/paragraphs/{id}`
5. Longest Word: `GET http://localhost:3000/api/texts/longest-word/{id}`
Replace `{id}` with the actual ID of the text stored in the database.


And for CRUD operation in DB:
1. Create: `POST http://localhost:3000/api/texts` with below body:
```
    {
        "content": {content}
    }
```
2. Delete: `DELETE http://localhost:3000/api/texts/{id}`
     Replace {id} with the actual _id returned from the create request.
3. Update: `PUT http://localhost:3000/api/texts/{id}` with below body - Replace {id} with the actual _id returned from the create request.
```
    {
        "content": {content}
    }
```
4. Fetch
- single data: `GET http://localhost:3000/api/texts/{id}`
     Replace {id} with the actual _id returned from the create request.
- all data: `GET http://localhost:3000/api/texts`