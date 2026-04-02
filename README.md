# Hamza Gökalp — Portfolio

Kişisel portfolio ve blog sitesi. Vanilla JS + PHP + MySQL stack.

## Kurulum (XAMPP)

1. ZIP'i aç, `output_sefa` klasörünü `htdocs/hamza` olarak koy
2. phpMyAdmin'de şu DB'yi oluştur:

```sql
CREATE DATABASE hamza_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hamza_portfolio;

CREATE TABLE users (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    first_name    VARCHAR(50)  NOT NULL,
    last_name     VARCHAR(50)  NOT NULL,
    email         VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          ENUM('user','admin') DEFAULT 'user',
    is_active     TINYINT(1) DEFAULT 1,
    last_login    DATETIME,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE remember_tokens (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    token_hash VARCHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE contact_messages (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(120) NOT NULL,
    subject      VARCHAR(200),
    message_type VARCHAR(30),
    message      TEXT NOT NULL,
    ip_address   VARCHAR(45),
    is_read      TINYINT(1) DEFAULT 0,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

3. `backend/php/db.php` dosyasında DB şifreni güncelle (varsayılan boş)
4. Tarayıcıda `http://localhost/hamza/` aç

## Teknolojiler

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** PHP 8+
- **Veritabanı:** MySQL (XAMPP)
- **Auth:** Session tabanlı, bcrypt şifreleme, CSRF koruması

## Dosya Yapısı

```
hamza/
├── index.html
├── pages/
│   ├── login.html
│   ├── register.html
│   ├── about.html
│   ├── skills.html
│   ├── projects.html
│   ├── blog.html
│   ├── services.html
│   └── contact.html
├── backend/php/
│   ├── auth.php
│   ├── db.php
│   ├── session_check.php
│   ├── nav_session.php
│   ├── get_csrf.php
│   └── contact.php
├── admin/
│   └── index.html
└── assets/
    ├── css/
    ├── js/
    └── img/
```
