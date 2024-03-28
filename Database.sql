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
CREATE TABLE client (
  User_ID INT NOT NULL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Surname VARCHAR(255) NOT NULL,
  User_Role VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Username VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL
);

CREATE TABLE contact_us (
  Contact_ID INT NOT NULL PRIMARY KEY,
  Contact_email VARCHAR(255),
  Contact_number INT,
  Contact_address VARCHAR(255),
  Contact_city VARCHAR(50),
  Contact_postal_code INT
);

CREATE TABLE events (
  Event_ID VARCHAR(255) NOT NULL PRIMARY KEY,
  Event_image TEXT,
  Event_description TEXT,
  Event_date DATE
);

CREATE TABLE event_participants (
  Event_ID VARCHAR(255) NOT NULL,
  User_ID INT NOT NULL,
  PRIMARY KEY (Event_ID, User_ID)
);
