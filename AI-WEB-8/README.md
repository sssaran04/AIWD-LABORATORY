# Event Registration System

A full-stack Event Registration application built with Node.js, Express, and MySQL as per the instructions.

## Overview
This application allows users to register for a maximum of three events. It enforces both client-side and server-side validation to prevent duplicate registrations and limits the selection to a maximum of 3 events. It also includes an administrative search functionality to retrieve registered details via a Register Number.

## Prerequisites
- Node.js installed on your machine.
- MySQL Server installed and running locally.

## Step-by-Step Setup

### 1. Install Dependencies
Open your terminal in this directory and install the required dependencies:

```powershell
npm install express mysql2
```

### 2. Configure MySQL Credentials
By default, the `server.js` file is set to connect to MySQL on `localhost` with the username `root` and password `Siddharth@18122015`. If your MySQL password is different, please update the `password` field on line 16 of `server.js`.

*Note: The application will automatically create the `eventdb` database and the `registrations` table upon connection if they do not exist. You don't need to manually run any SQL to build the schema.*

### 3. Start the Application
Open your project folder in your terminal and start the server:

```powershell
node server.js
```
The server will connect to MySQL, verify the tables, and will be available at:
👉 **http://localhost:3000**

### 4. How to use
- Visit **http://localhost:3000** to register for up to 3 events. If you attempt to register with an existing Register Number, an error message will be displayed.
- Visit **http://localhost:3000/admin.html** (or click the Admin Panel link) to search for registrations. Enter a Register Number and hit Search to view the details (Register Number, Name, Events). If the number does not exist, an appropriate message is displayed.

### 5. Manual Database Setup (Optional)
If you prefer to set up the database manually, you can execute the following SQL commands in your MySQL client:
```sql
CREATE DATABASE eventdb;
USE eventdb;
CREATE TABLE registrations (
  regno VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100),
  events TEXT
);
```
