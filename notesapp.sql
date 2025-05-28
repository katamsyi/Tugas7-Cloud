-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 27 Bulan Mei 2025 pada 19.13
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
  `id_Catatan` int(11) NOT NULL,
  `Judul_Catatan` varchar(255) NOT NULL,
  `Deskripsi_Catatan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `notes`
--

INSERT INTO `notes` (`id_Catatan`, `Judul_Catatan`, `Deskripsi_Catatan`) VALUES
(3, 'asasaasas', 'hhhhh'),
(4, 'Testests', 'asagsagsagusag'),
(6, 'c', 's'),
(7, 'baru', 'aasasa'),
(9, 'Belajar Cloud Computing', 'Mempelajari konsep dasar Cloud Computing imi'),
(10, 'halo', 'aku tebak kamu milea ya?ddd'),
(11, 'Belajar Cloud Computing', 'Mempelajari konsep dasar Cloud Computing'),
(13, 'wd111', 'wdwsss'),
(14, 'baru', 'ccc'),
(15, 'dddd', 'ddd');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`) VALUES
(1, 'admin', '$2b$10$mZbVDqTWB2ACYubW0uQuKe1z2sJCBKB5DYqCSmvZinckHYOhhpLoe', ''),
(2, 'aaaa', '$2b$10$ISuZ29L8HPr.CibJAwbBkeVIig7pqzhA9qWE6SYdib10K/qIOtmvm', ''),
(3, '12', '$2b$10$JyNJrLKcjx9p5eYp24s7WuodMrnW655RWpkvcbVcq9lefdnQA7YyO', '');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id_Catatan`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `notes`
--
ALTER TABLE `notes`
  MODIFY `id_Catatan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
