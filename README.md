# bookshopapi
Node.js, Express, Mongo and Graphql and Mongoose are the technologies used to power this API.
Its a simple api for adding and retrieving book order for users

# API access urls
The API is hosted on an Amazon Web Services EC2 instance, and with pm2 as a process manager and load balancer
Landing page url for api is : http://ec2-3-17-150-219.us-east-2.compute.amazonaws.com:3000/
Graphql playgorund : http://ec2-3-17-150-219.us-east-2.compute.amazonaws.com:3000/graphql

# Database access
Using The cloud instance of mongodb: https://www.mongodb.com/cloud/atlas


# Authentication and Authorization
API utilizes username and passord user authentication for access to some resources and utilizez jwt Bearer token authorization. Specific routes (in this case resolvers will have a user context check against the jwt token passed on a request to ensure only allowed users can gain access to the resource

# Mutations and queries
Graphql aims to provide an alternative to traditional REST API architecture. At its core, GraphQL provides a syntax that describes how to ask for data in either mutations or queries passed through the request as per the model schema structure. Advantages to using it are API queries or data mutations can return a specific payload struture related to how the paylod is to be consumed. This has benefits of ensuring you only get wat you asks for and negates to an extend overfetching issue making request response times much improved

Query example:
```
  {
    books{
      title
      price
      isbn
      authors{
        name
        surname
      }
      publisher{
        name
      }
    }
  }
  ```
  
  Mutation example:
  ```
    mutation CreateOrder($quantity: String, $book: String, $total: String, $user: String) {
    createOrder(quantity: $quantity, book: $book, total: $total, user: $user) {
        quantity
        total
        book{
            title
        }
        user{
            email
        }
    }
  }
  ```

# Unit Test
Jest is used to unit testing of critical api functions

# Setting up on local host
Download the API files
Navigate to the root folder
Run npm install to install dependancies
Run npm run start to run the server
