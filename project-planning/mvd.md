## Minimum Viable Demo
---
### Features
- !User can browse all stories
- !User can create new story
- !Stories are marked as in-progress or finalized
- !User can submit collaboration request to in-progress story
- !Story owner can accept a story collaboration request and merge with rest of story (all others then no longer viewable)
- !Story owner can finalize story (locked to further additions)
- !Users can vote on collaboration requests
- !Users can see vote count for each collaboration request
- !Users cannot add to completed story
- !Users can read a story

## Demo Flow
- Home page -> scroll down, see all stories cards
- Login -> Redirect to dashboard (hard code user id into redirect route)
- ->Browse all stories -> see complete/incomplete status, author name
-> Click on complete story -> view page for story (cannot add contribution - no buttons)
-> back to discover stories
-> click on in-progress story -> view story (see contributions, votes, etc)
-> vote on a contribution
-> Add a contribution (vote for self?)
-> Navbar or dashboard -> Create a new story
-> dashboard -> my stories -> accept a contribution (note appended to story)-> (add final chapter) -> finalize story 

-Book/closed book
