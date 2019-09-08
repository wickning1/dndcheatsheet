# dndcheatsheet
A quick little display-only app that converts JSON character info into a printable sheet

## Usage
`docker-compose up --build` then visit `http://localhost?c=example`

Other query parameters are available:
* `&novice` shows some basic actions and reactions that all characters can do. Advanced players will not need these.
* `&yml` specifies that the character file is in YAML format instead of JSON.

You can make as many characters as you like in the `public/data` directory. They don't get checked in to git unless they begin with "example".
