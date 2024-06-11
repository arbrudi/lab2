create database lab2

use lab2

DROP DATABASE lab2
/*-------------------------------Comics-------------------------------*/
CREATE TABLE Comics (
  Comic_ID VARCHAR(50) NOT NULL PRIMARY KEY,
  Comic_image TEXT,
  Comic_title VARCHAR(255),
  Comic_type VARCHAR(50),
  Comic_Description TEXT
);

CREATE TABLE Comics_Author(
Comics_Author_ID int NOT NULL PRIMARY KEY,
Comic_ID VARCHAR(50) NOT NULL,
Author_Name varchar(50) NOT NULL,
Publisher varchar(50) NOT NULL,
Author_notes varchar(255),
FOREIGN KEY (Comic_ID) REFERENCES Comics(Comic_ID)
)

CREATE TABLE Comics_comments (
  User_ID INT NOT NULL,
  Comic_ID VARCHAR(50) NOT NULL,
  Comic_comments TEXT
);

CREATE TABLE Comic_ratings (
  Comic_rating_ID int Primary key Identity (1,1),
  User_ID INT NOT NULL,
  Comic_ID VARCHAR(50) NOT NULL,
  Comic_Rating INT NOT NULL,
  FOREIGN KEY (Comic_ID) REFERENCES Comics(Comic_ID),
  FOREIGN KEY (User_ID) REFERENCES Users(User_ID) 
);

Select * from Comic_ratings

CREATE TABLE favorite_comics (
  User_ID INT NOT NULL,
  Comic_ID VARCHAR(50) NOT NULL,
  Comic_list_name VARCHAR(255),
  PRIMARY KEY (User_ID, Comic_ID)
);

/*-------------------------------Books-------------------------------*/
CREATE TABLE Books (
  ISBN INT NOT NULL PRIMARY KEY,
  Book_image TEXT,
  Book_title VARCHAR(255) NOT NULL,
  Book_author VARCHAR(255) NOT NULL,
  Book_genre INT,
  FOREIGN KEY(Book_genre) REFERENCES Book_Genre(Book_Genre_ID),
  Book_description TEXT NOT NULL
);

CREATE TABLE Book_Genre(
Book_Genre_ID int NOT NULL PRIMARY KEY,
Genre_Name varchar(50) NOT NULL,
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

CREATE TABLE favorite_books (
  User_ID INT NOT NULL,
  ISBN INT NOT NULL,
  Book_list_name VARCHAR(255),
  PRIMARY KEY (User_ID, ISBN)
);

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

CREATE TABLE contact_us (
  Contact_ID INT NOT NULL PRIMARY KEY,
  Contact_email VARCHAR(255),
  Contact_number INT,
  Contact_address VARCHAR(255),
  Contact_city VARCHAR(50),
  Contact_postal_code INT
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
 
CREATE TABLE news (
  News_ID INT PRIMARY KEY IDENTITY(1,1),
  News_title NVARCHAR(255) NOT NULL,
  News_description NVARCHAR(2000) NOT NULL,
  News_tags NVARCHAR(100) NOT NULL,
  Publishing_date DATE NOT NULL,
  News_image NVARCHAR(MAX) NOT NULL
);

CREATE TABLE partners (
  Partner_ID INT PRIMARY KEY,
  Partner_image NVARCHAR(MAX),
  Partner_name NVARCHAR(255),
  Partner_description NVARCHAR(600)
);

CREATE TABLE reviews (
  Reviews_ID INT PRIMARY KEY,
  Reviewer_Name NVARCHAR(255),
  Reviewer_Surname NVARCHAR(255),
  Reviews_Comment NVARCHAR(600)
);

ALTER TABLE Comics_comments
ADD CONSTRAINT FK_Comic_comments_User_ID FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
ALTER TABLE Comics_comments
ADD CONSTRAINT FK_Comic_comments_Article_ID FOREIGN KEY (Comic_ID) REFERENCES Comics(Comic_ID);

ALTER TABLE Comics_ratings
ADD CONSTRAINT FK_Comic_ratings_User_ID FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
ALTER TABLE Comics_ratings
ADD CONSTRAINT FK_Comic_ratings_Article_ID FOREIGN KEY (Comic_ID) REFERENCES Comics(Comic_ID);

ALTER TABLE Event_participants
ADD CONSTRAINT FK_event_participants_User_ID FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
ALTER TABLE Event_participants
ADD CONSTRAINT FK_event_participants_Event_ID FOREIGN KEY (Event_ID) REFERENCES Events(Event_ID);

ALTER TABLE favorite_comics
ADD CONSTRAINT FK_favorite_comics_User_ID FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
ALTER TABLE favorite_comics
ADD CONSTRAINT FK_favorite_articles_Article_ID FOREIGN KEY (Comic_ID) REFERENCES Comics(Comic_ID);

ALTER TABLE favorite_books
ADD CONSTRAINT FK_favorite_books_User_ID FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
ALTER TABLE favorite_books
ADD CONSTRAINT FK_favorite_books_ISBN FOREIGN KEY (ISBN) REFERENCES Books(ISBN);

/*-------------------------------Queries-------------------------------*/

SELECT * FROM Users
SELECT * FROM User_Book_Status
SELECT * FROM Book_ratings
/* Used to see all table names in our database; used it to debugg Book_ratings*/
SELECT COLUMN_NAME, DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
/* WHERE TABLE_NAME = 'Book_ratings';*/
