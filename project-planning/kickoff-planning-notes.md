## User Stories

- Describe how a user will interact with our application

**As a ______, I can/cannot _______, because ______**

> Action item: Write user stories for application



---
## Pick out the Nouns
- nouns === resources
- nouns are tables
- **Action item:** Build ERD

users
stories{
  id:
  creator_id:
  contribut
}

contributions{
  id:
  text:
  user_id:
  story_id:
  votes:
}

## Routes to Interact with Resources
- RESTful architecture (make sure we're following naming convention)
>Action item: Create endpoints to interact with all resources

Browse (see all) = GET - /users

Read (see particular) = GET - /users/:id

Edit = POST - /users/:id/users

Add = POST - /users

Delete = POST - /users/:id/delete

## MVP - Minimum Viable Product
- What is the minimum feature set that a user will find useful

Goal here will be MVD - Minimum Viable Demo
- What features can we effectively show off in 5 minutes
- If you're not going to show it, don't build it


## Wireframe/Mockup
- Design the front end
- Anyone on the team can implement the design

## User Registration/Login
- Dont do it





