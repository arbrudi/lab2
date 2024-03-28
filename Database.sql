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
 
CREATE TABLE favorite_articles (
  User_ID INT NOT NULL,
  Article_ID VARCHAR(50) NOT NULL,
  Article_list_name VARCHAR(255),
  PRIMARY KEY (User_ID, Article_ID)
);

CREATE TABLE favorite_books (
  User_ID INT NOT NULL,
  ISBN INT NOT NULL,
  Book_list_name VARCHAR(255),
  PRIMARY KEY (User_ID, ISBN)
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

ALTER TABLE article_comments
ADD CONSTRAINT FK_article_comments_User_ID FOREIGN KEY (User_ID) REFERENCES client(User_ID)
ALTER TABLE article_comments
ADD CONSTRAINT FK_article_comments_Article_ID FOREIGN KEY (Article_ID) REFERENCES articles(Article_ID);

-- Constraints for table `article_ratings`
ALTER TABLE article_ratings
ADD CONSTRAINT FK_article_ratings_User_ID FOREIGN KEY (User_ID) REFERENCES client(User_ID)
ALTER TABLE article_ratings
ADD CONSTRAINT FK_article_ratings_Article_ID FOREIGN KEY (Article_ID) REFERENCES articles(Article_ID);

-- Constraints for table `book_comments`
ALTER TABLE book_comments
ADD CONSTRAINT FK_book_comments_User_ID FOREIGN KEY (User_ID) REFERENCES client(User_ID)
ALTER TABLE book_comments
ADD CONSTRAINT FK_book_comments_ISBN FOREIGN KEY (ISBN) REFERENCES books(ISBN); 



-- Constraints for table `book_ratings`
ALTER TABLE book_ratings
ADD CONSTRAINT FK_book_ratings_User_ID FOREIGN KEY (User_ID) REFERENCES client(User_ID)
ALTER TABLE book_ratings
ADD CONSTRAINT FK_book_ratings_ISBN FOREIGN KEY (ISBN) REFERENCES books(ISBN);

-- Constraints for table `event_participants`
ALTER TABLE event_participants
ADD CONSTRAINT FK_event_participants_User_ID FOREIGN KEY (User_ID) REFERENCES client(User_ID)
ALTER TABLE event_participants
ADD CONSTRAINT FK_event_participants_Event_ID FOREIGN KEY (Event_ID) REFERENCES events(Event_ID);