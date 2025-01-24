# Hallo kak aku NURHAMSAH 👋🏼
ini adalah manual book untuk menjalankan aplikasi dan juga alur website kursus **JB COURSE**. Saya menggunakan [PGadmin 4](https://www.pgadmin.org/download/) (version 8.2) untuk management databse postgrenya. 
Dalam project ini terdapat 2 folder application **BE-kursus-jb** dan **FE-kursus-jb**. Silahkan buka 2 terminal yang merujuk pada masing masing directory.

# Cara Menjalankan Aplikasi

## Step pada directory BE-kursus-jb
- buat dulu database pada postgres dengan nama "**jago-bahasa-test**". berikut environment DB pada **BE-kursus-jb**

      DB_CONNECTION=pgsql
      DB_HOST=127.0.0.1
      DB_PORT=5000
      DB_DATABASE=jago-bahasa-test
      DB_USERNAME=postgres
      DB_PASSWORD=root
- lalu jalankan perintah berikut : 

      composer run project-nurhamsah
- jika terjadi error atau server tidak jalan bisa melakukan dengan manual :

      composer install
      php artisan migrate
      php artisan db:seed
      php artisan serve   
- jika perintah **php artisan serve** tidak berjalan dengan baik, bisa melakukan cara ini : 
    
      php -S localhost:8000 -t public

**NOTE: EXPETASI PORT SERVER LARAVEL BERJALAN PADA PORT 8000**

## Step pada directory FE-kursus-jb
- untuk bagian ini harusnya simple dan tidak ada configurasi kusus. Aplikasi frontend ini berjalan pada port **5173** berikut terminalnya :
        
      npm run project-nurhamsah

# Alur Kerja Aplikasi

Singkatnya aplikasi ini merupakan aplikasi kursus online. Pengguna bisa melakukan register atau membuat akun baru untuk menerbitkan kursus mereka. 
Di dalam aplikasi kursus ini pengajar hanya bisa membuat materi berformatkan link video youtube dan juga dokumen (jpg, png, pdf). 
Terdapat 2 role dalam aplikasi ini yaitu **ADMIN** dan **CLIENT**.
### ADMIN
- membuat kursus
- membuat kategori kursus
- membuat materi kursus
- menghapus materi
- menghapus kursus
- view daftar kursus

### CLIENT
- view list of kursus
- view detail kursus

pada aplikasi ini saya menerapkan state management menggunakan [Jotai](https://jotai.org/), state management yang sangat simple seperti menggunakan useState pada React, 
dan untuk UI saya menggunakan [shadcn](https://ui.shadcn.com/) agar lebih cepat.
Task yang saya kerjakan pada bagian "Poin Tambahan (Opsional)" yang tertera pada file Challenge, sebagai berikut: 
- Menggunakan JWT.
- menggunakan state management (saya memakai jotai, saya harap ini sudah termasuk)
- Laman Landing Page untuk menampilkan daftar kursus ke customer.
- Menggunakan typescript untuk frontend (ReactJs)

# Screen Shoot (BONUS)
