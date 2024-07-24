# EAGLE E-commerce

<img alt="Static Badge" src="https://img.shields.io/badge/Reviewed_By-HoundCI-blue?style=flat-square">

The front-end of Eagle E-commerce utilizes React for a modern, user-friendly interface, while Node.js powers its backend, ensuring a seamless shopping experience

[![Maintainability](https://api.codeclimate.com/v1/badges/81fa30232b27b1482f4f/maintainability)](https://codeclimate.com/github/atlp-rwanda/eagles-ec-fe/maintainability)
![Github Actions](https://github.com/atlp-rwanda/eagles-ec-fe/actions/workflows/deploy.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/eagles-ec-fe/badge.svg?branch=dev)](https://coveralls.io/github/atlp-rwanda/eagles-ec-fe?branch=dev)

## Tech Stack

This project was built using the PERN (PostgreSQL, Express.js, React.js, Node.js) stack, additionally with Vite and Typescript.

## How to run the app

To run the app locally, follow these steps:

1. **Clone the repository:**

```bash
   git clone https://github.com/atlp-rwanda/eagles-ec-fe.git
```

2. **Change working dir to cloned repo:**

```bash
cd eagle-ec-fe
```

3. **Install dependencies:**

```bash
npm install
```

4. **Run developmnt server:**

```bash
   npm run dev
```

## How to run test

1. **Run unit test:**

```bash
   npm run test
```

2. \*\*Tun test in watch mode

```bash
  npm run test:watch
```

3. \*\*Generate test coverage

```bash
   npm run test:coverage
```

Write your test by creating a file with .test.tsx extetion under **test** directory.


## Running it with Docker Image

## 1. Pull Docker Image:

   ```bash
   docker pull mugemanebertin/eagle-ec-fe:latest
   ```

   This command downloads the Docker image `mugemanebertin/eagle-ec-fe` from Docker Hub.

## 2. Run Docker Container:

   ```bash
   docker run -d --name eagle-ec-fe-container -p 5173:5173 mugemanebertin/eagle-ec-fe:latest
   ```

   This command starts a Docker container named `eagle-ec-fe-container`, mapping port `5173` on your host to port `5173` in the container. The `-d` flag runs the container in detached mode.

   You can now access the Eagle E-commerce application by navigating to `http://localhost:5173` in your web browser.

