create database lab2

use lab2

CREATE TABLE articles (
  Article_ID VARCHAR(50) NOT NULL PRIMARY KEY,
  Article_image TEXT,
  Article_title VARCHAR(255),
  Article_type VARCHAR(50),
  Article_Description TEXT
);

CREATE TABLE article_comments (
  User_ID INT NOT NULL,
  Article_ID VARCHAR(50) NOT NULL,
  A_comments TEXT
);

CREATE TABLE article_ratings (
  User_ID INT NOT NULL,
  Article_ID VARCHAR(50) NOT NULL,
  A_Rating INT NOT NULL
);

CREATE TABLE books (
  ISBN INT NOT NULL PRIMARY KEY,
  Book_image TEXT,
  Book_title VARCHAR(255) NOT NULL,
  Book_author VARCHAR(255) NOT NULL,
  Book_genre VARCHAR(255) NOT NULL,
  Book_description TEXT NOT NULL
);

CREATE TABLE book_comments (
  User_ID INT NOT NULL,
  ISBN INT NOT NULL,
  B_comments TEXT
);

CREATE TABLE book_ratings (
  User_ID INT NOT NULL,
  ISBN INT NOT NULL,
  B_Rating INT NOT NULL
);