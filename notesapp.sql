-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Bulan Mei 2025 pada 06.52
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notesapp`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `judul_Catatan` varchar(255) NOT NULL,
  `deskripsi_Catatan` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `notes`
--

INSERT INTO `notes` (`id`, `judul_Catatan`, `deskripsi_Catatan`, `createdAt`, `updatedAt`) VALUES
(2, 'aaaa', 'aaaaa', '2025-05-29 04:45:19', '2025-05-29 04:45:19'),
(3, 'aaaaaaa', 'aaaaa', '2025-05-29 04:45:25', '2025-05-29 04:45:25'),
(4, 'aac', 'aaaaaaa', '2025-05-29 04:46:56', '2025-05-29 04:50:34'),
(5, 'bb', 'bb', '2025-05-29 04:50:21', '2025-05-29 04:50:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `createdAt`, `updatedAt`) VALUES
(1, 'userbaru123', 'userbaru123@example.com', '$2b$10$dm7cURkpWmjxqu8ByS.7yONvVDqH2VU.sWeNb6353rzDmCpxTfvQO', '2025-05-29 04:33:23', '2025-05-29 04:33:23'),
(2, 'aa', 'aa', '$2b$10$ozQxomk7/DvIRH7eHUN1mOaU71NlS0.IAL5/I6XSiDZStdIgCZxpC', '2025-05-29 04:44:57', '2025-05-29 04:44:57');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
