# AlgorithmazeAI Hosting Guide: cPanel Deployment

This guide outlines the step-by-step process to host your Vite React frontend, Express Node.js backend, and MySQL database on a cPanel environment.

---

## Architecture Overview

*   **Frontend**: Single Page React App built with Vite. Compiles into static HTML/CSS/JS. Served by Apache from `public_html/`.
*   **Backend**: Node.js Express server running via cPanel's **Setup Node.js App** (Phusion Passenger) listening on the `/api` path.
*   **Database**: cPanel MySQL.
*   **Routing**: The `.htaccess` file in `public_html/` handles client-side routing fallback for React Router and lets `/api` traffic pass through to Node.js.

---

## Step 1: Build the Frontend (Local Machine)

Before deploying, build the static files for the React frontend:

1.  **Configure Environment Variables (Build-Time)**:
    Create a file named `.env` in the root directory of your project (same level as `package.json`) and add your Razorpay Key ID:
    ```env
    VITE_RAZORPAY_KEY_ID=rzp_test_SpwGiScfdP3s0a
    ```
    > [!IMPORTANT]
    > Vite embeds variables starting with `VITE_` into your frontend code at **build time**. If this file is missing or contains the wrong key, your Razorpay modal will throw an `Oops! Something went wrong` / `Payment Failed` error because of key-mismatches with the backend!
    
2.  Open your project directory in the terminal.
3.  Run the build command:
    ```bash
    npm run build
    ```
    This compiles the TS/React code and saves it to the `dist/` directory.
4.  Go to the `dist/` directory and compress all its contents (files and folders directly inside `dist`) into a ZIP file (e.g., `dist.zip`).
    > [!IMPORTANT]
    > Zip the *contents* of the `dist` directory, not the `dist` folder itself. When extracted, `index.html` should be in the root of the ZIP file.

---

## Step 2: Set Up the MySQL Database (cPanel)

Your backend can run using MySQL for production. Set up the database in cPanel:

1.  Log in to your **cPanel Dashboard**.
2.  Search for **MySQL Database Wizard** under the *Databases* section.
3.  **Create a Database**: Enter a database name (e.g., `username_algorithmaze`) and click *Next Step*.
4.  **Create a User**: Enter a username (e.g., `username_admin`) and generate a strong password. Save the password securely. Click *Create User*.
5.  **Add User to Database**: Check the box for **ALL PRIVILEGES** to link the user to the database, then click *Make Changes*.
6.  Keep a note of these details:
    *   **DB Name**: `username_algorithmaze`
    *   **DB User**: `username_admin`
    *   **DB Password**: `your_strong_password`
    *   **DB Host**: `localhost`

---

## Step 3: Deploy the Backend (cPanel)

cPanel hosts Node.js applications using **Setup Node.js App** (Phusion Passenger).

### 1. Upload Backend Code
1.  In cPanel, open the **File Manager**.
2.  Go to your home directory `/home/username/` (outside `public_html` is recommended for security).
3.  Create a new folder named `backend` (e.g., `/home/username/backend`).
4.  Upload the contents of the `server/` directory (from your local codebase) into this folder.
    *   *Do NOT upload the `node_modules` directory.* It will be installed on the server.
    *   *Include*: `index.js`, `db.js`, `schema.sql`, `migrate.js`, `package.json`, `package-lock.json`, and any JSON database fallbacks (`courses.json`, etc.).

### 2. Configure Node.js App in cPanel
1.  Go back to cPanel Home and open **Setup Node.js App** (under *Software* section).
2.  Click **Create Application**.
3.  Fill in the form:
    *   **Node.js version**: Select `18.x` or `20.x`.
    *   **Application mode**: `Production`.
    *   **Application root**: `backend` (relative to `/home/username/`).
    *   **Application URL**: Select your domain (e.g., `algorithmazeai.com`) and write `api` in the text box next to it.
        *   This maps `https://algorithmazeai.com/api` directly to your Express server.
    *   **Application startup file**: `index.js`.
4.  Scroll down to **Environment variables** and add the following keys:
    *   `DB_HOST` = `localhost`
    *   `DB_USER` = `username_admin` (Created in Step 2)
    *   `DB_PASSWORD` = `your_strong_password` (Created in Step 2)
    *   `DB_NAME` = `username_algorithmaze` (Created in Step 2)
    *   `RAZORPAY_KEY_ID` = `your_razorpay_production_key_id`
    *   `RAZORPAY_KEY_SECRET` = `your_razorpay_production_key_secret`
    *   `EMAIL_USER` = `algorithmazeai@gmail.com`
    *   `EMAIL_PASS` = `your_gmail_app_password` *(Note: Must be a 16-character App Password, not your regular Gmail password)*
5.  Click **Create** (at the top right).
6.  Once created, click the **Run npm install** button to install the backend dependencies automatically.

### 3. Run Database Migrations
To import the tables and default course/user configurations into the MySQL database:
1.  Copy the virtual environment command path shown at the top of your Node.js App configuration page (looks like `source /home/username/nodevenv/...`).
2.  Open **Terminal** in cPanel (or connect via SSH).
3.  Paste and run the copied `source` command to enter the Node.js environment.
4.  Change directory to your backend folder:
    ```bash
    cd ~/backend
    ```
5.  Run the migration script:
    ```bash
    node migrate.js
    ```
    This script will automatically read `schema.sql` to create all MySQL tables, import the users from `users.json`, courses/internships from `courses.json`, and any current messages/applications into MySQL.

---

## Step 4: Deploy the Frontend (cPanel)

Now, upload the compiled static React app.

1.  In cPanel, open **File Manager**.
2.  Navigate to your domain's document root directory:
    *   Usually `public_html` (for main domain) or `public_html/subfolder` (for addon domains).
3.  Upload the `dist.zip` (containing the frontend files) you created in Step 1.
4.  Right-click `dist.zip` and select **Extract**. Extract files directly into `public_html`.
5.  Make sure the `.htaccess` file is present in `public_html`.
    *   If you don't see it, click **Settings** (top-right of File Manager) and check **Show Hidden Files (dotfiles)**.
    *   If it is missing, create a new file named `.htaccess` in `public_html` and write the following:
        ```apache
        <IfModule mod_rewrite.c>
          RewriteEngine On
          RewriteBase /
          RewriteRule ^index\.html$ - [L]
          # Exclude API endpoints from React SPA routing
          RewriteCond %{REQUEST_URI} !^/api
          RewriteCond %{REQUEST_FILENAME} !-f
          RewriteCond %{REQUEST_FILENAME} !-d
          RewriteCond %{REQUEST_FILENAME} !-l
          RewriteRule . /index.html [L]
        </IfModule>
        ```

---

## Step 5: Verification & Testing

Verify that both frontend and backend are working together:

1.  **Check the Backend API**:
    *   Visit `https://yourdomain.com/api`.
    *   It should render a page showing:
        ```html
        API is running
        DB Connected: true
        ```
    *   If `DB Connected: false`, check your Node.js App environment variables and check your database settings.
2.  **Check the Frontend**:
    *   Visit `https://yourdomain.com`.
    *   Your React landing page should load.
    *   Navigate around. React Router links (e.g. `/courses`, `/amaiadmin`) should work. Try refreshing the page on a sub-route; the `.htaccess` rules should redirect to the home bundle properly without a 404.
3.  **Test Admin Access**:
    *   Visit `https://yourdomain.com/amaiadmin`.
    *   Log in using your admin credentials (default credentials defined in `server/index.js` or `users.json`).
4.  **Test Forms & Actions**:
    *   Fill out a contact form to ensure Gmail notifications work.
    *   Try a test checkout/payment order creation to ensure the Razorpay integration is successful.
