# Event Registration System (MongoDB)

This is an Event Registration System implemented using Node.js, Express, and **MongoDB**. This application demonstrates how to use a NoSQL document database.

## Prerequisites
- **Node.js**: Make sure you have Node.js installed.
- **MongoDB**: You need a local MongoDB server running. If you don't have it installed yet, follow the installation guide below.

## How to Install MongoDB on Windows 

If you do not already have MongoDB installed, follow these steps to get it set up on your machine:
1. **Download the Installer**: Go to the [MongoDB Community Server Download Page](https://www.mongodb.com/try/download/community). Select **Windows** as your platform and download the `.msi` package.
2. **Run the Installer**: Double-click the downloaded `.msi` file to start the installation wizard.
3. **Choose Setup Type**: Select the **"Complete"** setup type when prompted.
4. **Service Configuration**: Ensure the box for **"Install MongoDB as a Service"** is checked. Leave the other settings on this screen as their defaults (Run service as Network Service user). This ensures MongoDB automatically starts when you boot up your computer.
5. **MongoDB Compass**: Ensure the box to **"Install MongoDB Compass"** is checked (this is a helpful graphical UI for viewing your databases). Click Next, then Install.
6. **Verify Installation**: Once finished, MongoDB will be running in the background automatically on port `27017`. You can open **MongoDB Compass** and click the big green **"Connect"** button to visually confirm your databases are accessible locally.

## Step-by-Step Setup Instructions

### Step 1: Initialize the Project
First, open your terminal (Command Prompt or PowerShell) and navigate to the project directory:

```bash
cd .\AI-WEB-9
```

Then, initialize a new Node project. This creates a `package.json` file which tracks our dependencies.

```bash
npm init -y
```

### Step 2: Install Required Packages
We need to install the Express framework for the web server and the MongoDB driver for Node.js to interact with the database.
Run the following command:

```bash
npm install express mongodb
```

### Step 3: Run the Local MongoDB Server
Ensure your MongoDB service is running in the background. On Windows, you can start it from services.msc or the MongoDB shell. If it's already running on `localhost:27017`, you're good to go. The Node app will automatically create the `eventdb` database and `registrations` collection on insertion.

### Step 4: Start the Web Server
We have created `server.js` which houses the server configuration.
Run the server using Node:

```bash
node server.js
```

You should see output in the terminal saying:
```
Server running at http://localhost:3000
Connected successfully to MongoDB server
Unique index on regno ensured.
```

### Step 5: Test the Application
Open your web browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

1. **Test Registration Form Validation:**
   - Leave fields blank and submit.
   - Try to select 0 events, you'll be blocked.
   - Try selecting more than 3 events, the UI will restrict you, and the backend verifies it too.
2. **Register a User:**
   - Enter `23CS101`, `Arun Kumar`, and pick 3 events (e.g., Coding Challenge, Quiz Competition, Web Design).
   - Click "Register Now". You should see a success message.
3. **Test Duplicates:**
   - Try registering `23CS101` again with a different name. You will see an error preventing duplicate registrations.
4. **Admin Search functionality:**
   - From the main page, click the "Admin Panel ->" link at the bottom (or navigate to `http://localhost:3000/admin.html`).
   - Search for `23CS101`, and the expected details will be fetched and displayed.
   - Search for an invalid number like `23CS999` to verify proper error rendering.

## Project Structure
- `public/`
  - `index.html`: The user registration form.
  - `admin.html`: The search form for administrators.
  - `style.css`: The styling file used to make the application beautiful.
- `server.js`: The Express backend and MongoDB logic.
- `package.json`: Contains project metadata and dependencies.
