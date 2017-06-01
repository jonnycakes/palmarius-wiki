# Palmarius Wiki
### John Farrelly's Second WDI Project
----

## Entity Relationship Diagram
![ERD](./assets/erd.png)

**Notes on ERD**

- I'm planning my database schema ahead to include authors, categories, and tags in advance.
  - Tags are a reach, and the tags are their join table are set up that I can easily drop the concept if I don't like it.
- I've specifically designed each table to hold just one concept. That means I'm not jamming a category into the article table, because categories are their own thing.
- Using LucidChart again, and the special characters on the lines define the relationship between tables (not just signify that there is one!)

----

## Stories
_(I'm going to move these into Pivotal Tracker)_

- **CHORE** - research and set up materialize-css.
- **CHORE** - set up skelton for grid system (if grid is not includes in materialize)
- **CHORE** - SET UP AUTHORS - Given that I am an admin, I want to seed data about authors (use classmate names) directly to the database.
- **VIEW INDEX** - Given that I am a user, on '/' , I want to see a list of articles. This list should include the article subject, author, and created at date.
- **CLICK ARTICLE ON INDEX** - Given that I am a user, on '/', When I click an article on the list, I want to be taken to that article.
- **CREATE NEW ARTICLE** - Given that I am a user, on '/articles/new', I want to see a form that includes fields to create an article. I also want to see a dropdown for category, author, and select boxes(??) for tags. When I hit save, I want to be brought to the newly created article.
- **VIEW ARTICLE SHOW** - Given that I am a user, on '/articles/:id', I want to see a layout that includes the article, all information related to that.
- **EDIT ARTICLE SHOW** - Given that I am a user, on '/articles/:id/edit', I want to see all fields for new article filled in with the current data. However, author should be replaced with "contributor". When I hit save, I want to be brought back to the article show and see updated information.
- **DELETE ARTICLE** - Given that I am a user, on '/articles/:id/edit', I want to see a delete button. When I click it, I want a "are you sure?" When I hit yes/okay, I want the article to be removed, and returned to the article index.
