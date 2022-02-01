INSERT INTO users (name, email, password) VALUES ('Jane', 'jane@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Joe', 'joe@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Sarah', 'sarah@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Mike', 'mike@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Sam', 'sam@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Billy', 'billy@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Larry', 'larry@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Rachel', 'rachel@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Marie', 'marie@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Nick', 'nick@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO stories (creator_id, initial_content) VALUES (1, 'It was a sunny day and I felt like going for a walk. To my surprise, I stumbled upon the most extraordinary sight as I opened my door.');
INSERT INTO stories (creator_id, initial_content) VALUES (2, 'It was a cold, dark and miserable day and I did not feel like going outside. Little did I know that this would be the last day I ever spent at home again.');
INSERT INTO stories (creator_id, initial_content) VALUES (3, 'Tom was a very wise and street-smart cat. He had lived in this alley behind The Royal Hotel all of his life and knew little of the comforts indoor pet cats enjoyed. The day started like every other, looking for scraps to eat from the hotel dumpster, but took a surprising turn when a young girl came running down the alley towards him.');
INSERT INTO stories (creator_id, initial_content) VALUES (4, 'Ten year old twins Ellie and Edward were inseparable, they were each others best friend and shared everything. One day, Ellie woke up feeling sick and could not go to school. Edward went by himself and on the way in, met a new kid who was starting school that day. They were having so much fun all day, Edward did not want to come straight home afterwards. This made Ellie very left out so she tried thinking of a way to split up the new friends.');
INSERT INTO stories (creator_id, initial_content) VALUES (5, 'I just won the lottery! Denise could not believe it, she had been playing on an off over the last 10 years or so and never so much as one a free play, now she was looking at $15 million. First thing, she thought, was to make sure this ticket was kept safe until she could claim her winnings. She began to get nervous as she wondered whether or not anyone knew she had won and where she lived. Right then, she heard a soft knock on the door.');
INSERT INTO stories (creator_id, initial_content) VALUES (6, 'Once upon a time, a little mermaid lived under the sea but longed to walk on sand and experience life outside of the ocean. One day, she was given a choice from an old sea witch that would grant her wish but at the cost of her voice.');

INSERT INTO contributions (contributor_id, story_id, content) VALUES (4, 1, 'There was a huge elephant sitting in my garden with a note taped to the gate saying it was a birthday present from my Uncle Fred.');
INSERT INTO contributions (contributor_id, story_id, content) VALUES (5, 1, 'There was a helicopter coming in to land on the street outside my house. This was unusual to say the least, as I lived in a sleepy little village where nothing interesting ever happened to anyone.');
INSERT INTO contributions (contributor_id, story_id, content) VALUES (7, 1, 'The entire street was packed with reporters and camera crews who came rushing towards me as I stepped outside.');
INSERT INTO contributions (contributor_id, story_id, content) VALUES (5, 2, 'Suddenly, there was an explosion somewhere outside which shook the windows of my apartment. I ran outside and saw a huge cloud of smoke coming from a house down the street. As I walked towards it, there was another explosion which knocked me off my feet. With my ears still ringing and dust in my eyes, I turned around to see my building had turned to rubble.');
INSERT INTO contributions (contributor_id, story_id, content) VALUES (7, 2, 'As I settled down on the couch to watch some TV, there was a loud knock on the front door. I reluctently got up to see who it was. As soon as the door was unlocked, a strange man pushed his way in and said "Come with me if you want to live."');
INSERT INTO contributions (contributor_id, story_id, content) VALUES (8, 2, 'At 10:45 am the phone rang. It was my brother. He was in the neighbourhood and wanted to drop by. This was not good news. Whenever my brother got in touch he always needed something, last time it was to join his dance crew for a national talent show. I did it though. I wonder what it is this time...');

INSERT INTO contribution_votes (voter_id, contribution_id, story_id) VALUES (2, 1, 1);
INSERT INTO contribution_votes (voter_id, contribution_id, story_id) VALUES (3, 2, 1);
INSERT INTO contribution_votes (voter_id, contribution_id, story_id) VALUES (4, 2, 1);
INSERT INTO contribution_votes (voter_id, contribution_id, story_id) VALUES (5, 3, 1);
INSERT INTO contribution_votes (voter_id, contribution_id, story_id) VALUES (5, 4, 2);
INSERT INTO contribution_votes (voter_id, contribution_id, story_id) VALUES (6, 4, 2);
INSERT INTO contribution_votes (voter_id, contribution_id, story_id) VALUES (8, 4, 2);
INSERT INTO contribution_votes (voter_id, contribution_id, story_id) VALUES (1, 5, 2);
INSERT INTO contribution_votes (voter_id, contribution_id, story_id) VALUES (4, 5, 2);
INSERT INTO contribution_votes (voter_id, contribution_id, story_id) VALUES (9, 6, 2);
