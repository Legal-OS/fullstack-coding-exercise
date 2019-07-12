## Exercise

We are going to make an animal shelter just for dogs! Dogs have a few properties:

* an unique identifier
* a name
* a breed
* a date of birth
* a gender
* they have brothers/sisters which also needs to be tracked somehow
* who brought them in
* are they already picked up by someone and if yes by who

We also track who has picked up dogs. These "contacts" have a few properties:

* an unique identifier
* a name
* a phone number
* dogs they have brought in
* dogs they have picked up

You have to serve this data through a preferably GraphQL or REST endpoint where 

1. anyone can query for these dogs
2. anyone can bring in a new dog
3. anyone can pick up a new dog
4. you can press a button to let a dog be "born" (so generating a new one).

You are free to choose the database solution which you think suits best. 

Please develop a React interface to interact with the server and do these steps.

## Thanks

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).