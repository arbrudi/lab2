create database lab2

use lab2

DROP DATABASE lab2

TRUNCATE TABLE Users

/*-------------------------------Users-------------------------------*/
CREATE TABLE Users (
  User_ID INT NOT NULL PRIMARY KEY IDENTITY(100, 1),
  Name VARCHAR(255) NOT NULL,
  Surname VARCHAR(255) NOT NULL,
  User_Role VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Username VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL
);

/*-------------------------------Comics-------------------------------*/

CREATE TABLE Comics_Author(
Comics_Author_ID int NOT NULL PRIMARY KEY,
Author_Name varchar(50) NOT NULL,
Author_notes varchar(255),
);

CREATE TABLE Comics (
  Comic_ID VARCHAR(50) NOT NULL PRIMARY KEY,
  Comic_image TEXT,
  Comic_title VARCHAR(255),
  Comic_type VARCHAR(50),
  Comic_Description TEXT,
  Comics_Author_ID int NOT NULL,
  FOREIGN KEY (Comics_Author_ID) REFERENCES Comics_Author(Comics_Author_ID)
);

CREATE TABLE Comic_ratings (
  Comic_rating_ID int Primary key Identity (1,1),
  User_ID INT NOT NULL,
  Comic_ID VARCHAR(50) NOT NULL,
  Comic_Rating INT NOT NULL,
  FOREIGN KEY (Comic_ID) REFERENCES Comics(Comic_ID),
  FOREIGN KEY (User_ID) REFERENCES Users(User_ID) 
);

CREATE TABLE favorite_comics(
  Favorite_Comic_Id int Primary key Identity (1,1),
  User_ID INT NOT NULL,
  Comic_ID VARCHAR(50) NOT NULL,
  FOREIGN KEY (Comic_ID) REFERENCES Comics(Comic_ID),
  FOREIGN KEY (User_ID) REFERENCES Users(User_ID) 
);

/*-------------------------------Books-------------------------------*/

CREATE TABLE Book_Genre(
Book_Genre_ID int NOT NULL PRIMARY KEY,
Genre_Name varchar(50) NOT NULL,
);

CREATE TABLE Books (
  ISBN INT NOT NULL PRIMARY KEY,
  Book_image TEXT,
  Book_title VARCHAR(255) NOT NULL,
  Book_author VARCHAR(255) NOT NULL,
  Book_genre INT,
  FOREIGN KEY(Book_genre) REFERENCES Book_Genre(Book_Genre_ID),
  Book_description TEXT NOT NULL
);

CREATE TABLE Book_Status(
  Book_Status_ID INT PRIMARY KEY,
  Book_state varchar(25) NOT NULL,
  CONSTRAINT b_state check(Book_state IN ('Read', 'Going to read', 'Dropped', 'Finished'))
)

INSERT INTO Book_Status(Book_Status_ID, Book_state)
VALUES(1,'Read')
INSERT INTO Book_Status(Book_Status_ID, Book_state)
VALUES(2,'Going to read')
INSERT INTO Book_Status(Book_Status_ID, Book_state)
VALUES(3,'Dropped')
INSERT INTO Book_Status(Book_Status_ID, Book_state)
VALUES(4,'Finished')

CREATE TABLE User_Book_Status (
  User_Book_Status_ID INT IDENTITY(1,1) PRIMARY KEY,
  ISBN INT NOT NULL,
  Book_Status_ID INT NOT NULL,
  User_ID INT NOT NULL,
  FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
  FOREIGN KEY (Book_Status_ID) REFERENCES Book_Status(Book_Status_ID),
  FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
);

CREATE TABLE Book_ratings(
	Book_rating_ID INT PRIMARY KEY IDENTITY(1,1),
	User_ID int NOT NULL,
	ISBN int NOT NULL,
	Book_rating INT NOT NULL,
	FOREIGN KEY(User_ID) REFERENCES Users(User_ID),
	FOREIGN KEY(ISBN) REFERENCES Books(ISBN)
);

CREATE TABLE Favorite_books (
  Favorite_Book_ID int Primary Key Identity(1,1),
  User_ID INT NOT NULL,
  ISBN INT NOT NULL,
  FOREIGN KEY (User_ID) REFERENCES Users(User_ID),
  FOREIGN KEY (ISBN) REFERENCES Books(ISBN)
);

/*-------------------------------Events-------------------------------*/
CREATE TABLE Events (
  Event_ID VARCHAR(255) NOT NULL PRIMARY KEY,
  Event_image TEXT,
  Event_description TEXT,
  Event_date DATE
);

CREATE TABLE Event_participants (
  Event_ID VARCHAR(255) NOT NULL,
  User_ID INT NOT NULL,
  PRIMARY KEY (Event_ID, User_ID)
);

/*-------------------------------Queries-------------------------------*/

SELECT * FROM Users
SELECT * FROM User_Book_Status
SELECT * FROM Book_ratings
/* Used to see all table names in our database; used it to debugg Book_ratings*/
SELECT COLUMN_NAME, DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
/* WHERE TABLE_NAME = 'Book_ratings';*/