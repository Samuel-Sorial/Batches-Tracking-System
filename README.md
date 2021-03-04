<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">Batches Tracking System</h3>

  <p align="center">
    A simple garment batches tracking system developed as part of a hiring process.
    <br />
    <a href="https://garment-batches.herokuapp.com/api/batches">View Demo</a>
    ·
    <a href="https://github.com/Samuel-Sorial/Batches-Tracking-System/issues">Report Bug</a>
    
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#restful-api-documentation">RESTful API documentation</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
<br />
<br />

## About The Project

---

[![Product Name Screen Shot][product-screenshot]](https://garment-batches.herokuapp.com/api/batches)

A simple garment batches tracking system developed as part of a hiring process. It supports adding batches, getting all batchs, and grouping them by
color, size.

### Built With

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Mongoose](https://mongoosejs.com/)

<!-- GETTING STARTED -->
<br />
<br />

## Getting Started

---

The application is very simple, which means that initializing it won't be a big deal.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/Samuel-Sorial/Batches-Tracking-System.git
   ```

2. Initialize the application using port number and database name

   ```sh
   npm init port=YOUR_PORT_NUMBER db=YOUR_DB_NAME
   ```

   Port number and db are optional, if you don't pass it the system will use the
   default values which are port: 3030, db: batches

3. Run the application
   ```sh
   npm start
   ```
   <br />
   <br />
   <!-- Testing -->

## Testing

---

After initializing the project from the previous section, simply run:

```sh
npm run test
```

<br />
<br />

<!-- DOCUMENTATION -->

## RESTful API documentation

---

### Create Batch

- **URL**

  /api/batches

- **Method**

  `POST`

- **Content-type: `application/json`**
- **Data Params**

  `size`: [String] in ['S', 'M', 'L', 'XL'] _Required_

  `color`: [String] in ['red','black,'green','blue'] _Required_

  `quantity`: [Number] _Required_

- **Success Response:**

  - Code: `201`
  - Content: {id, size, color, quantity, number}

- **Error Response:**

  - Code: `400`
  - Message: `Invalid data`

- **Sample Call:**
  ```sh
  curl --location --request POST 'https://garment-batches.herokuapp.com/api/batches' \ --header 'Content-Type: application/json' \ --data-raw '{
      "size": "M",
      "color":"blue",
      "quantity": 152
  }'
  ```
- **Sample Response:**

  ```sh
  HTTP/1.1 201 Created
  Server: Cowboy
  Connection: keep-alive
  X-Powered-By: Express
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Content-Length: 87
  Etag: W/"57-aY3Qz3N3s4X0mBI4A/kcuBCMHQs"
  Date: Thu, 04 Mar 2021 04:44:29 GMT
  {"size":"M","color":"blue","quantity":152,"number":288,"id":"604065ad6f50bc001561e639"}
  ```

---

### Get all batches

- **URL**

  /api/batches

- **Method**

  `GET`

- **URL Params:** group=[Boolean]
- **Data Params:** None

- **Success Response:**

  - Code: `200`
  - Content: [{id, size, color, quantity, number}]

- **Error Response:**

  - Code: `500`
  - Message: `Internal Server Error`

- **Sample Call:**
  ```sh
  curl --location --request GET 'https://garment-batches.herokuapp.com/api/batches'
  ```
- **Sample Response:**

  ```sh
   HTTP/1.1 200 OK
   Server: Cowboy
   Connection: keep-alive
   X-Powered-By: Express
   Access-Control-Allow-Origin: *
   Content-Type: application/json; charset=utf-8
   Content-Length: 25228
   Etag: W/"628c-XsvaPiL463eJjqicsz9iBEN7YPg"
   Date: Thu, 04 Mar 2021 04:48:21 GMT

  [{"size":"L","color":"red","quantity":50,"number":1,"id":"60402615bf859b00159b381b"},{"size":"XL","color":"red","quantity":40,"number":3,"id":"6040262dbf859b00159b381d"},{"size":"S","color":"black","quantity":15,"number":4,"id":"60402719bf859b00159b381e"},{"size":"M","color":"blue","quantity":152,"number":5,"id":"60402722bf859b00159b381f"}]
  ```

 <!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: images/getbatches.png
