-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost
-- Üretim Zamanı: 17 Eyl 2023, 01:16:22
-- Sunucu sürümü: 10.4.28-MariaDB
-- PHP Sürümü: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `kolye`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `galeri`
--

CREATE TABLE `galeri` (
  `id` int(11) NOT NULL,
  `session_id` varchar(150) NOT NULL,
  `resimler` text NOT NULL,
  `basliklar` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `galeri`
--

INSERT INTO `galeri` (`id`, `session_id`, `resimler`, `basliklar`) VALUES
(1, 'auth0|64f8e8e213e441aa724df174', '/Images/1694643039308.avif,\r\n/GalleryImages/Default/aslan.avif,\r\n/Images/1694643061433.webp,\r\n/GalleryImages/Default/geyik.avif,\r\n/GalleryImages/Default/tilki.avif,\r\n/GalleryImages/Default/at.avif,\r\n/GalleryImages/Default/at.avif,\r\n/GalleryImages/Default/at.avif,\r\n/GalleryImages/Default/fil.avif,\r\n/GalleryImages/Default/fil.avif,\r\n/GalleryImages/Default/fil.avif,/Images/1694710505428.jpeg', 'deni 2,\r\nResim 2,Converse,\r\nResim 4,\r\nResim 5,\r\nResim 6,\r\nResim 7,\r\nResim 8,\r\nResim 9,\r\nResim 10,\r\nafwafwa,warwarawr');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `genel`
--

CREATE TABLE `genel` (
  `id` int(11) NOT NULL,
  `session_id` varchar(150) NOT NULL,
  `yaziBaslik` varchar(100) NOT NULL,
  `galeriBaslik` varchar(100) NOT NULL,
  `anaResim` text NOT NULL,
  `galeriRengi` varchar(50) NOT NULL,
  `yaziAciklama` text NOT NULL,
  `galeriAciklama` text NOT NULL,
  `tarih` text NOT NULL,
  `saat` text NOT NULL,
  `isTarih` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `genel`
--

INSERT INTO `genel` (`id`, `session_id`, `yaziBaslik`, `galeriBaslik`, `anaResim`, `galeriRengi`, `yaziAciklama`, `galeriAciklama`, `tarih`, `saat`, `isTarih`) VALUES
(1, 'auth0|64f8e8e213e441aa724df174', 'Mektup 1', 'Galeri 2', '1694476309221.png', 'red', 'Lorem ipsum mektup 1', 'Lorem ipsum açıklama 2', '2023-09-14', '22:20', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `mektup`
--

CREATE TABLE `mektup` (
  `id` int(11) NOT NULL,
  `session_id` varchar(150) NOT NULL,
  `yazi` text NOT NULL,
  `yazar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `mektup`
--

INSERT INTO `mektup` (`id`, `session_id`, `yazi`, `yazar`) VALUES
(1, 'auth0|64f8e8e213e441aa724df174', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Deniz Baran');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `url`
--

CREATE TABLE `url` (
  `id` int(11) NOT NULL,
  `session_id` text NOT NULL,
  `url_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `url`
--

INSERT INTO `url` (`id`, `session_id`, `url_id`) VALUES
(1, 'auth0|64f8e8e213e441aa724df174', 'a');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `galeri`
--
ALTER TABLE `galeri`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `genel`
--
ALTER TABLE `genel`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `mektup`
--
ALTER TABLE `mektup`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `url`
--
ALTER TABLE `url`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `galeri`
--
ALTER TABLE `galeri`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `genel`
--
ALTER TABLE `genel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `mektup`
--
ALTER TABLE `mektup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `url`
--
ALTER TABLE `url`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
