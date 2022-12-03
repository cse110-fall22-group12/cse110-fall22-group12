# Build a common foundation shared by all development team

## Problem

We have multiple development teams working on different component on the project, but our codes lack consistency.

- How do we make sure the styling in all teams are consistent?
- How do we put every piece together?
- How do we reach a consistent code following an unified direction?

## Considered Options

- more communication across teams
- finding some people to fix styling issue after everything is done
- build a share foundation code, refactor our existing code into the foundation

## Decision Outcome

We decided on building a share foundation code to refactor our existing code into the template. We chose this because it minimizes the effort of adjusting the styling and communication among teams. Simultaneously, with minimal merge conflicts. Additionally, the this reduces the bus factor as everyone is on a common ground.
