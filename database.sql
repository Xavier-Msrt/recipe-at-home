DROP SCHEMA IF EXISTS recipeathome CASCADE;
CREATE SCHEMA recipeathome;

CREATE TABLE recipeathome.recipes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT
);

CREATE TABLE recipeathome.ingredients (
    id SERIAL PRIMARY KEY,
    recipe INT REFERENCES recipeathome.recipes(id),
    name TEXT NOT NULL,
    quantity INT NOT NULL,
    unite TEXT
);

CREATE TABLE recipeathome.steps (
    id SERIAL PRIMARY KEY,
    recipe INT REFERENCES recipeathome.recipes(id),
    description TEXT NOT NULL
);

INSERT INTO recipeathome.recipes (title, description, image) VALUES ('Test 1', 'desc 1', 'img');
INSERT INTO recipeathome.ingredients 
	(recipe, name, quantity, unite) 
VALUES 
	(1, 'Tomate', 6, 'piece'), 
   (1, 'Pate', 500, 'g');
INSERT INTO recipeathome.steps 
	(recipe, description) 
VALUES 
	(1, 'step 1'), 
   (1, 'step 2'), 
   (1, 'step 3');

INSERT INTO recipeathome.recipes (title, description, image) VALUES ('Test 2', 'desc 1', 'img');
INSERT INTO recipeathome.ingredients 
	(recipe, name, quantity, unite) 
VALUES 
	(2, 'Pomme', 6, 'piece'), 
   (2, 'Poire', 500, 'g');
INSERT INTO recipeathome.steps 
	(recipe, description) 
VALUES 
	(2, 'step 1'), 
   (2, 'step 2'), 
   (2, 'step 3');
