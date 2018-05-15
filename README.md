# Research Prototype

This is a Chrome extension that uses a quiz and leaderboard system to encourage CMU students to be aware of good cybersecurity practices. This repository includes a prototype of the extension with a hardcoded question, leaderboard, and profile.

Upon opening a new tab, students see a daily question that they can answer to earn points for the school they belong to (after signing in through CMU's Shibboleth authentication system).

A new question will be available each day and students can rack up points to compete against other schools which can be viewed on the leaderboard page as either a list or a chart.

There is also a profile page where students can see their total points and question answering history.


## How to Run the Prototype

1. Clone the repository onto your local machine
2. Open Google Chrome
3. Go to chrome://extensions in the address bar
4. Switch on "Developer mode" in the top right corner
5. Click "Load Unpacked" at the top of the screen
6. Select the folder containing the repo files
7. Switch the extension on
8. Open a new tab

## Resetting the Question

If you are running the prototype and want to reset the question so that the previous selected answer doesn't show up each time, right click the page and select "Inspect". Then go to the "Console" tab of the developer tools that open up and type in "localStorage.clear()" and hit "enter".
