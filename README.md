# Tucil3_13521094_13521139
Implementasi Algoritma UCS dan A* untuk Menentukan Lintasan Terpendek dengan Javascript dalam bentuk web-based application

## **Table of Contents**
* [General Information](#general-information)
* [Requirements](#requirements)
* [Features](#features)
* [How to Run](#how-to-run)
* [Screenshot](#screenshot)
* [Author](#author)

## **General Information**
Algoritma UCS (Uniform cost search) dan A* (atau A star) dapat digunakan untuk menentukan lintasan terpendek dari suatu titik ke titik lain. Program ini dapat menerima graf yang merepresentasikan peta kemudian mencari lintasan terpendek antara simpul asal dan tujuan menggunakan UCS atau A*.

## **Requirements**
Untuk menggunakan program ini, Anda harus install *npm* pada perangkat yang digunakan. 

## **Features**
* Membaca graf dari file input dengan format sebagai berikut. File test case dapat dilihat pada folder 'test'.
```sh 
8 // Jumlah simpul
0 10 5 -1 -1 -1 -1 -1 // Adjacency matrix
10 0 -1 -1 5 -1 -1 10
-1 -1 0 -1 40 -1 20 -1
30 -1 -1 0 20 -1 -1 -1
-1 5 40 -1 0 -1 5 -1
-1 -1 35 -1 40 0 -1 -1
-1 -1 -1 -1 -1 -1 0 -1
-1 -1 -1 -1 40 -1 20 0
Simpul 1:1 3 // Nama simpul:titik koordinat simpul
Simpul 2:3 5
Simpul 3:12 0
Simpul 4:12 4
Simpul 5:10 4
Simpul 6:5 4
Simpul 7:2 9
Simpul 8:8 6
```
* Menampilkan visualisasi graf
* Mencari lintasan terpendek dengan algoritma UCS dan A*
* Menampilkan lintasan terpendek dan total jarak
* Menampilkan graf dan lintasan pada Google Maps
* Memilih graf dari Google Maps

## **How to Run**
### **Setup**
1. Clone repository <br>
```sh 
$ git clone https://github.com/liviaarumsari/Tucil3_13521094_13521139.git
```
2. Buka repository pada terminal

### **Run**

1. Ganti directory ke aplikasi dengan perintah berikut <br>
```sh 
$ cd src/navaid
```
2. Lakukan instalasi terhadap dependencies aplikasi
```sh 
$ npm install
```
3. Dapatkan API KEY untuk google maps di https://cloud.google.com/

4. Masukkan API KEY anda ke dalam file GoogleMaps.js

5. Jalankan aplikasi
```sh 
$ npm start
```


## **Screenshot**

<img src="doc/fig1.png" width="752" />
<img src="doc/fig2.png" width="752" />
<img src="doc/fig3.png" width="752" />
<img src="doc/fig4.png" width="752" />

## Authors

|  **NIM** |        **Nama**       |
|:--------:|:---------------------:|
| 13521094 | Angela Livia Arumsari |
| 13521139 | Nathania Calista      |