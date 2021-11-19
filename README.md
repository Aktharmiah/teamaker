# INTRO

This small app allows the user to randomly pick a team member, according to the selection criteria as outlined below, to make tea!!

Each member of the team has a skill level of either junior, intermediate or senior. The application allows the user to randomly select the next team member to make the tea during a working day.

**MEMBER SELECTION CRITERIA**

- A junior must be 3 times more likely to make the tea than a senior
- A intermediate must be 2 times more likely to make the tea than a senior
- A team member cannot make the tea 2 times in a row.


======================================================================================

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

1)  `cd` into the `docker` directory and run `./run`. 
    This step can be omitted if you've already run `run --build`

This will launch the Docker containers. Wait for the launch process to finish.

2) Point your browser to http://localhost:8080 to launch the app


**TESTING - BACKEND**

1. From the `docker` directory run `docker exec -it tea_web bash`
2. Once in, `cd` into `/var/www/backend`
3. Finally, run `./manage.py test`


**TESTING - FRONTEND**

1. `cd` into `frontend/dev/js`.
2. Run `npm test`