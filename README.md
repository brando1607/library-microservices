# Library Management System

This project is a Library Management System developed using **NestJS**, **Prisma** with **PostgreSQL**, and a **Microservices Architecture**. It was built to practice and enhance skills in designing and implementing microservices-based applications.

## 📚 Project Overview

The Library Management System allows the creation and management of users and books. The app is structured with a microservices approach, dividing responsibilities between distinct services to handle users, books, and communication between them.

## 🛠️ Technologies Used

- **NestJS**: As the main framework for building the backend.
- **Prisma ORM**: For database management and interaction with PostgreSQL.
- **PostgreSQL**: As the relational database.
- **Microservices**: Implemented using NestJS to distribute functionalities.

## ✨ Features

- User Management: Create, update, and delete users.
- Book Management: Add, update, and delete book records. As well as taking and returning books.
- Microservices Communication: Services interact with each other via communication patterns.

## 📂 Project Structure

The project is divided into multiple microservices, each dedicated to a specific domain:

- **Api-Gateway**: Receives HTTP requests and redirects them to the appropiate service.
- **User Service**: Manages user-related operations.
- **Book Service**: Handles book-related tasks.
