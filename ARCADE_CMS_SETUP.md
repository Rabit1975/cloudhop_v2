# GameMonetize Arcade CMS Setup Guide

## What You Have
- Downloaded Arcade CMS from GameMonetize.com
- Files in: `C:\Users\rebel\Desktop\cloudhop_v2\public\Arcade_cms_8_5_GameMonetize.com\`

## Part 1: Database Setup

### Prerequisites
You need a database server running. Options:
1. **phpMyAdmin** (easiest for local development)
2. **MySQL/MariaDB** installed locally
3. **Online hosting** (Bluehost, Hostgator, etc.)

### Create a New Database
If using **phpMyAdmin**:
1. Go to http://localhost/phpmyadmin (or your server's phpMyAdmin)
2. Click "New" (left sidebar)
3. Database name: `arcade_cms` (or whatever you want)
4. Collation: `utf8mb4_unicode_ci`
5. Click "Create"

If using **command line**:
```bash
mysql -u root -p
CREATE DATABASE arcade_cms;
EXIT;
```

---

## Part 2: Upload Files to Server

### For Local Testing (Easiest)
1. Extract the "Upload" folder from the CMS download
2. Copy files to your web server root:
   - **XAMPP:** `C:\xampp\htdocs\arcade\`
   - **WAMP:** `C:\wamp\www\arcade\`
   - **MAMP:** `/Applications/MAMP/htdocs/arcade/`

### For Production (Your Server)
1. Extract the "Upload" folder
2. Upload via FTP to your server's public_html folder
3. Example: `/public_html/arcade/`

---

## Part 3: Run Installation

### Step 1: Navigate to Installation Page
Open your browser:
- **Local:** `http://localhost/arcade/` (or `http://localhost/arcade/install/`)
- **Production:** `https://yourdomain.com/arcade/`

### Step 2: Follow the Installation Wizard
The installer will ask for:

1. **Database Information:**
   - Host: `localhost` (for local) or your database host
   - Database Name: `arcade_cms`
   - Database User: `root` (for local) or your username
   - Database Password: (leave blank for local root, or your password)

2. **Admin Account:**
   - Admin Username: (choose one)
   - Admin Email: your@email.com
   - Admin Password: (strong password)

3. **Site Settings:**
   - Site Name: `CloudHop Arcade`
   - Site URL: `http://localhost/arcade/` or `https://yourdomain.com/arcade/`
   - Admin Email: your@email.com

### Step 3: Complete Installation
- Click "Install" or "Finish"
- Wait for database tables to be created
- You should see: "Installation Complete!"

---

## Part 4: Login to Admin Panel

### Access Admin Area
- **URL:** `http://localhost/arcade/admin/` (or `https://yourdomain.com/arcade/admin/`)
- **Username:** The one you created during installation
- **Password:** The one you created during installation

---

## Part 5: Configure and Manage

### Inside Admin Dashboard You Can:

1. **Manage Games**
   - Add/Edit/Delete games
   - Upload game files
   - Set categories
   - Add descriptions and images

2. **Settings**
   - Site name and URL
   - Admin email
   - Game display settings

3. **Ads**
   - Add AdSense codes
   - Configure ad placements
   - Track earnings

4. **Categories**
   - Create game categories
   - Organize games by type

5. **Users** (if enabled)
   - Manage user accounts
   - Set user permissions

---

## Part 6: Import Games from GameMonetize

### Option 1: Auto-Import (If Available)
1. Go to Admin > Import Games (or similar)
2. Select "GameMonetize"
3. Enter API key (if required)
4. Click "Import"

### Option 2: Manual Import
1. Download game files from GameMonetize
2. Go to Admin > Games > Add New
3. Upload game files
4. Fill in details (name, category, description, thumbnail)
5. Save

### Option 3: Use the Database SQL File
The `database.sql` file you have contains all games:
1. In phpMyAdmin or terminal:
2. Go to "Import" tab
3. Select `database.sql`
4. Click "Go"
5. All games will be imported automatically

---

## Troubleshooting

### Error: "Database Connection Failed"
- Check database host/username/password
- Make sure MySQL is running
- Try `localhost` instead of `127.0.0.1`

### Error: "Permission Denied" on upload folder
- Set folder permissions to `755` or `777`
- Command: `chmod -R 755 /path/to/arcade/`

### Error: "Blank Page After Installation"
- Check error logs in `logs/` folder
- Make sure PHP is enabled
- Verify MySQL is running

### Games Not Showing
- Check if games folder has files
- Verify database imported correctly
- Check category assignments

---

## Quick Reference

| Step | What to Do | Where |
|------|-----------|-------|
| 1 | Create database | phpMyAdmin or terminal |
| 2 | Upload files | Your web server |
| 3 | Visit installer | `http://localhost/arcade/install/` |
| 4 | Fill in database info | Installation wizard |
| 5 | Complete setup | Finish button |
| 6 | Login to admin | `http://localhost/arcade/admin/` |
| 7 | Import games | Admin > Import or use SQL |

---

## Next Steps

1. **Create Database** → `arcade_cms`
2. **Upload Files** → Web server root
3. **Run Installer** → Fill in database details
4. **Login** → Admin panel
5. **Import Games** → From database.sql or GameMonetize

That's it! Your arcade will be live.

---

## For Production Deployment

When ready to deploy to cloudhop.cloud:
1. Upload CMS files to your server
2. Create database on your server
3. Configure `config.php` or `.env` with database credentials
4. Visit installer on your domain
5. Complete setup

Then integrate with CloudHop frontend as needed.

---

**Questions?** Check the GameMonetize documentation or the README files included with the CMS download.
