# Guestbook App

## Description
Guestbook App is a full-stack web application that allows users to submit and view messages. Each message includes a name and message text.

## Features
- Display all messages with pagination
- Submit a new message to the database
- Display newest messages first
- Client-side and server-side form validation
- Display of errors on the frontend

## Technologies Used
- **Frontend:** React.js 
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Other:** dotenv, cors, mysql2

## Environment Variables

The project uses a .env file to store sensitive configuration (like database credentials). For security reasons, this file is excluded from version control.

You will find a .env.example file in the backend/ folder. Duplicate and rename it to .env, and fill in your actual database values.
## Getting Started (with VS Code)
It is recommended to open the project in Visual Studio Code (VS Code) for best development experience.

## Prerequisites
- Node.js installed

- MySQL installed and running

- Git (optional, if cloning the repo)

## Setup Instructions

Follow these steps to run the project locally:

### 1. Clone the repository (or download as ZIP) 
```bash
git clone https://github.com/ivanas213/Guestbook.git
cd Guestbook
```
or download it manually as a .zip from this [GitHub repository link](https://github.com/ivanas213/Guestbook), extract it, and open the folder in VS Code.
### 2. Open the project in VS Code:
```bash
code .
```
### 3. Prepare the environment file
```bash
cd backend
```
On Windows:
```bash
copy .env.example .env
```
or on Linux:
```bash
cp .env.example .env
```
### 4. Edit .env and set your real MySQL credentials.

### 5. Set up the database
The easiest way to create the database is via MySQL Workbench.
#### Steps:
1. Open MySQL Workbench and connect to your MySQL server using your saved connection.

2. In the SQL editor, paste and execute the following commands:
```sql
CREATE DATABASE guestbook;
USE guestbook;

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created DATETIME NOT NULL
);
```
3. Make sure the database name (guestbook) matches the value of MY_SQL_DB in your .env file. If you get connection errors in the backend, double-check your .env file values for MY_SQL_HOST, MY_SQL_USER, MY_SQL_PASSWORD, and MY_SQL_DB, and check if mysql is running. You can check it in services. 
### 6. Install and run the backend
```bash
npm install
npm run start
```
### 7. Install and run the frontend
```bash
cd ../frontend
npm install
npm run start
```
### 8. Open the application
Visit the URL displayed in the terminal (usually http://localhost:3000).

