# promo3-node-meetup
A Meetup application using Node, Mustache Template, Bootstrap and a database. 

## Starting The Project

We are going to implement a simple fork of Meetup using Node and the Mustache template engine:

1. create a new repository
2. initialize npm and install `Express`
3. create a new script `index.js` which start a webserver and serves a `public` folder
4. check that the can serve an index page
5. install `Mustache`
6. configure the template engine of `Express` (https://github.com/simplon-lyon/promo3-node-template)
7. create a `template` folder and an `index.html` file in the folder
8. try to serve `template/index.htlm` using the template engine

## Adding Event

We are going to create an in-memory database to store event:

1. edit `index.js` to:
    - create an `events` variable which will store all the events
    - add the `/event/add` handler to add an event to the `events` variable
    - edit the `/` handler to pass the `events` to your template
2. edit `template/index.html` to:
    - add a form to submit an event to `event/add`
    - display all the events on the page (edited)

## Removing Event

We are going to delete information from the database:

1. in `index.js` add the `/event/del` handler to delete an event from the `events` variable
2. in `template/index.html`:
    - add for each event a link to delete the event
    - replace the default reaction of the form by an AJAX request to `/event/add`
    - replace the default reaction of the links by an AJAX request to `/event/del`

## Creating New Template

We are going to add two new templates:

1. create a new file `template/new-event.html` which will contains
the form to create a new `event`:
    - the form should be ready to be pre-fill with data using Mustache
    - it would be better to use AJAX and display a message to the user on form submission (so he is no redirected to `/event/add`)
2. in `index.js` add a `/new-event` handler which serves `template/new-event.html`:
    - the handler must take an URL parameter with an event ID
    - the handler should fill the form if there is an event matching the ID
3. create a new file `template/event.html` which will display detail information on an event
4. in `index.js` add a `/event` handler which serves `template/event.html`:
    - the handler must take an URL parameter with an event ID
    - the handler must fill the template using the event information

## Adding User

We are going to add user to our website:

1. edit `index.js` to:
    - create an `users` variable which will store all the users
    - add the `/user/add` handler to add an user to the `users` variable (user should be an object with at least a name and a pass)
    - add the `/user/del` handler to delete an user from the `users` variable
3. create a new file `template/new-user.html` with a form to POST user to `/user/add`
4. in `index.js` add a `/new-user` handler which serves `template/new-user.html`
5. edit `template/index.html` to add a link to `/new-user`