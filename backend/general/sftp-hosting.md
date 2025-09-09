To host a website on `https://username.hosting/somePage/`:

username - dev
hosting - somewebsite.net
---

### 🔍 Understanding the Environment

* **[https://username.hostingName.net/](https://username.hostingName.net/)** — likely the root of the server.
* **[https://username.hostingName.net/html/](https://username.hostingName.net/html/)** — likely a subfolder (or a folder in the web server’s public directory, e.g. `/var/www/html/html/`).

---

### ✅ To host your website:

1. **Access the server's file system** (ask your colleague for access):

   * If it's a Linux server, you'll likely need **SFTP (secure FTP)** or **SSH access**.
   * Or, there may be a **web-based file manager** (like cPanel or Plesk) installed.

2. **Upload your website files**:

   * HTML, CSS, JS, images, etc.
   * Place them in the `/somePage/` directory of the web root on the server.
   * Example structure:

     ```
     /var/www/somePage/index.html
     /var/www/somePage/style.css
     /var/www/somePage/script.js
     ```

3. **Then you can visit**:

   ```
   https://hsotingPrefix.hsotingName.net/somePage/
   ```

   ...and see your site load.

---

### 🛠️ Tools You May Need

| Tool                   | Purpose               |
| ---------------------- | --------------------- |
| FileZilla or Cyberduck | Upload files via SFTP |
| Terminal / SSH         | Remote server access  |
| Web-based File Manager | Upload/manage files   |

---

For Terminal:

sftp -P PORTNUMBER accountName@hosingPrefix.hostingName.net

add password for accountName account

it opens you on some other directory nested test/home

go outside it to the one that has var (check where you are via pwd and ls)
go inside var
go inside www
mkdir somePage
add your files (put index.html, put styles.css, put some.js)
then opening the `https://username.hosting/somePage/` will render the resources

NB - you have to open the terminal within the directory of the files you want to transfer because it opens an **interactive SFTP session** within your local directory to the remote directory


When you open an **SFTP** or **SSH** connection from your terminal, here's how the **file path context works** for transferring files:

---

### 🔁 Understanding Local vs. Remote Context

When you run:

```bash
sftp -P PORTNUMBER accountName@hostingPrefix.hostingName.net
```

You enter an **interactive SFTP session**. In that session:

* `pwd` → shows the **remote** current directory.
* `lpwd` → shows the **local** (your Mac's) current directory.
* `cd <remote-path>` → changes the **remote** working directory.
* `lcd <local-path>` → changes the **local** working directory.

---

### 📂 Local → Remote File Transfer

To upload a file from your **Mac** to the **server**:

```bash
put index.html
```

This sends `index.html` from your **local current directory (`lpwd`)** to the **remote current directory (`pwd`)**.

You can control both like so:

```bash
lcd ~/Documents/website         # Go to your local folder
cd /var/www/somePage     # Go to the remote web directory (if you have access)
put index.html                 # Upload the file
```

---

### 📥 Remote → Local File Transfer

To download from server to Mac:

```bash
get file.txt
```

Again, this transfers from the **remote `pwd`** to your **local `lpwd`**.

---

### 🧠 Summary

| Command      | Scope          | What it does                        |
| ------------ | -------------- | ----------------------------------- |
| `lcd <path>` | Local          | Set where you pick files from       |
| `cd <path>`  | Remote         | Set where files go to on the server |
| `put <file>` | Local → Remote | Uploads file                        |
| `get <file>` | Remote → Local | Downloads file                      |
| `ls`         | Remote         | List files on server                |
| `lls`        | Local          | List files on your Mac              |
| `pwd`        | Remote         | Shows remote current directory      |
| `lpwd`       | Local          | Shows local current directory       |

---

Let me know if you'd like a step-by-step example using your own files.
