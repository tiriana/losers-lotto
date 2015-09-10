# losers-lotto
This repo contains Losers-lotto's frontend code.

## Notes
The fronted will need to talk to our **api**. You can find the docs [here] (http://apidocs.gamevy.com/index.html). You will have access to a stubbed API on our test environment at (https://bornlucky-test.gamevy.com/losers-lotto).

Don't worry about the endpoints titled as *FAKE* this is because those urls won't really exist as they belong to some of our internal services. I've added them so that you could get access to all the endpoints. I would suggest you create a uris map with all these uris so that is easier to replace later on.

Most of our calls require a valid session-token on the header, you will need to use the **guest session** endpoint to get one. 

The stubbed api won't be returning any error but you will need to add errorHandling, I will document all the possible errors triggered.
