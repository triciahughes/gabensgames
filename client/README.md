# Gaben's Game Gallery

## Summary

Gaben's Game Gallery is a wonderful source of modern video games and some of the studios which develop them. The Games page will display a list of 20 titles along with their genres, metacritic score, and ESRB rating. The user can click on the "Save Game" button to save it to their My Saved Games page. In the My Saved Games page, the user can add, edit, and delete their saved games. There is also a Developer page which displays popular developers and their popular titles.

## Starting Up

In the project directory, run:

### `npm install`

Installs dependencies.

### `json-server --watch db.json`

Hosts db.json on http://localhost:3000/games. \
Contains user saved game data.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3001) to view it in your browser.


## File Structure

### App.js

Fetches video game data and developer data from https://rawg.io/apidocs. \
Fetches user saved data from JSON server at http://localhost:3000/games. \
Filters games based off of search bar. \
Filters games based off of selected category. 

Parent of NavBar, Games, Developers, SavedGames & EditGame.

### DeveloperItem.js

Item containing developer information.

Child of Developers.

### Developers.js

Container component for DeveloperItem.

Child of App. \
Parent of DeveloperItem.

### EditGame.js

Allows user to edit saved games.

Child of App.

### GameItem.js

Item containing video game information.

Child of Games

### Games.js

Container component for GameItem. 

Child of App. \
Parent of GameItem.

### NavBar.js

Navigation Bar.

Child of App.

### SavedGames.js

Displays user's saved games.

Child of App.

