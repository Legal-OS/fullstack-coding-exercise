# Welcome

Hi there and thanks for taking our tech test. We are going to make an administration application for an animal shelter just for cats!

![Happy Crypto Kitty](https://www.cryptokitties.co/images/kitty-eth.svg)

## Exercise

The exercise exists out of two parts:

1. A Coding Exercise
2. A set of [follow up questions](/FOLLOW_UP.md).

Please read the user stories and try to complete them. Keep in mind the technical requirements. You can take as much time as you'd like. 

Don't worry about designs. Feel free to implement something yourself, the quality of UI/UX won't weigh in on your result. 

Once done, don't forget to also answer the follow up questions in the end ([In `FOLLOW_UP.md`](/FOLLOW_UP.md)). Please package this folder in a zip file and send it to you contact at Legal OS. 

Good luck and have fun 😀. The cats and the shelter will be thankful! 🙏

## User stories

- [ ] As a user I can browse cats and see their name, breed, date of birth, gender and siblings, who dropped them off and who picked them up if they are picked up
- [ ] As a user I can filter out cats that are already picked up
- [ ] As a user I can browse contacts and see their full name, phone number, address and cats they have either picked up/brought in
- [ ] As a user I can register pickups and dropoffs

## Technical Requirements

* You have to serve the data from the backend through a GraphQL or REST endpoint. 
* The endpoint(s) needs to be secured to only allow access with API Keys. It is ok to generate API keys manually.
* You are free to choose the database solution which you think suits best. 
* The frontend interface has to be implemented with React.
* Typescript is enabled on both backend and frontend, but you are not required to use it.
* Feel free to install/remove any libraries you feel as you need.
* You do not need to make an authentication system (accounts etc).

## Setup

To start the frontend & backend:

1. `npm install`
2. `npm start`

This will start the frontend on port `3000` and the backend on port `3001`.

You can also start each part seperately by running `npm start` in their respective folders.

## Thanks

The image on top of the file is provided by the [CryptoKitties](https://www.cryptokitties.co/) project.

This frontend of the project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Got a little bit of inspiration by [the full-stack tech test of Skyscanner](https://github.com/Skyscanner/full-stack-recruitment-test) and [JustEat's tech test](https://github.com/justeat/JustEat.RecruitmentTest).