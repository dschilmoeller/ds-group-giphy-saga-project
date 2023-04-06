CREATE DATABASE "giphy_search_favorites";
-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key
-- Category table
CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);
CREATE TABLE "favorites" (
    "id" SERIAL PRIMARY KEY,
    "src" VARCHAR (1000) NOT NULL,
    "category_id" INTEGER REFERENCES "category"
);
-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'),
    ('cohort'),
    ('cartoon'),
    ('nsfw'),
    ('meme');
-- Dummy data for favorites 
INSERT INTO "favorites" ("src")
VALUES ('https://picsum.photos/seed/picsum/200/300'),
    ('https://picsum.photos/seed/picsum/200/300'),
    ('https://picsum.photos/seed/picsum/200/300');