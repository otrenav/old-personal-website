+++
draft = true
+++

Components

- Context: starting state
- Event: what the user does
- Outcomes: the expected results

E.g. context:

Given the account balance is $100,
and the card is valid,
and the machine conatains enough money.

E.g. event:

When the account holder requests $20.

E.g. outcomes:

Then the cashpoint should dispense $20,
and the account balance should be $80,
and the card should be returned.
