# Tournament Assembly

## Project Description

Tournament Assembly was created with the intent streamlining tournament creation & upkeep and scoreboard upkeep. Our project aims to create a free open source variant compared to other tournament creation applications that currently exist.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Features](#features)
6. [License](#license)
7. [Acknowledgments](#acknowledgments)
8. [Contact Information](#contact-information)
9. [Code of Conduct](#code-of-conduct)
10. [Troubleshooting](#troubleshooting)

## Getting Started

Instructions for how to setup and run the application

## Prerequisites

List any prerequisites or dependencies that users need to have installed before using your application. Include specific versions if necessary.

## Installation

Provide detailed installation instructions. Include any setup scripts or commands required. This section should guide users through the process of getting your application up and running.

## Usage

The application is designed to be intuitive and easy to use and we have taken that in to consideration during the development. From the main page you can start creating tournaments quickly by selecting "create tournament as guest" or you can sign up and create your account in order to save created tournaments.

## Features

List of Tournament Assembly features:

- Tournament creation (Groups, Playoffs & Leaague)
- Tournament upkeep
- Scoreboard for other games/sports

## License

Specify the license under which your project is released. Include a brief description of the license terms and a link to the full license text.

## Acknowledgments

If your project uses third-party libraries, APIs, or tools, acknowledge them and provide links to their documentation or repositories.

## Contact Information

Jani Haakana, AA4087@student.jamk.fi
Mikko Hämäläinen, AB7778@student.jamk.fi
Nikolas Orava, AA3171@student.jamk.fi
Eemi Salonen, AB6905@student.jamk.fi
Teemu Vorho, AB7380@student.jamk.fi

## Code of Conduct

Consider adding a code of conduct to encourage a welcoming and inclusive community around your project.

## Troubleshooting

Q: I accidentally refreshed the page as a guest user, do I have to create my tournament all over again?

A: No worries, we took that in to considiration and made a cache that saves users changes, however caching works only on one tournament at the time. For example if you make a playoff bracket and go to make a scoreboard, the playoff bracket won't be saved. Only the most recent tournament type will be saved into the cache as a guest user.


Q: The wrong player advanced to the next round in the playoffs, can I undo this?

A: Yes you can, there is an "undo match"-button in every round in the playoffs excluding the starting round. Let's say the wrong player advanced to the semi-finals from the quarterfinals, you just click the "undo match" button and add th right match up there.


Q: In the groups, do I have to create a match schelude on my own?

A: No, there is a button dedicated to that "Generate a match schelude", click that and our software will create a round of games for that group. If you want play multiple rounds, just press the same button again when the ongoing round is finished. 
