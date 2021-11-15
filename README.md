# LiveMore React/Django Task

The test is to create a small web based app that uses an API using Django Rest Framework and a Javascript Framework. Regularly commit to the repo and write tests.

## Requirements - Tea making selection
Produce a web application that has a team with a list of members. Each member of the team must have a skill level of either junior, intermediate or senior. The application must allow the user to randomly select the next team member to make the tea during a working day. The tea making selection algorithm must use these rules.

- A junior must be 3 times more likely to make the tea than a senior
- A intermediate must be 2 times more likely to make the tea than a senior
- A team member cannot make the tea 2 times in a row.

Please provide documentation on how to run the application.



===========================================================================================

**ASSUMPTIONS**

1) You are running Linux
2) You are happy to free up port 5432 (default PostGres port). The `run.sh` script comman will attempt to do with and you may be prompted for your `sudo` password


**REQUIREMENTS**

1) Docker ^20.10.10
2) Docker-compose ^1.29.2 


**INSTALLATION INSTRUCTIONS**

1)  `cd` into the `docker` directory and run `./run --build` to build docker images for the first time.
    It may be necessary to `cd` into the `docker` directory and run `chmod 755 ./run.sh` 

**RUNNING THE APP**

1)  `cd` into the docker directory and run `./run`. 
    This step can be omitted if you've already run `run --build`

This will launch the Docker containers. Wait for the launch process to finish.

2) Point your browser to http://localhost:8080 to launch the app


**TESTGIN**

Backend testing:

From the `docker` directory run `docker exec -it lmc_web bash`
Cd into `/var/www`
Run `./manage.py test`


Frontend testing:

Ensure that you have all the necessary NPM packages. To do this `cd` into `jsdev`.
Then run `npm install`. This will install all necssary packages, as listed in `package.json`

Run `npm test`