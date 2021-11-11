 #!/bin/sh

echo "Shutting down running docker containers...."
docker-compose down



#Check for the --build flag. If it is provided then build the main docker image (the one with django in it)
#This is intened for inital (setup runs)
if [ "$1" == "--build" ]; then

    echo "Building/rebuilding the main docker image .... 
    "
    docker build -f base.dockerfile -t lmc/base .   

fi


#launch the containers
echo "Building docker containers ....
"
docker-compose up -d

if [ "$1" == "--build" ]; then

    #run on build script inside the main container
    docker exec -it lmc_web bash -c "/docker-onbuild.sh --build"

else

    #run on build script inside the main container
    docker exec -it lmc_web bash -c "/docker-onbuild.sh"

fi



#restart postgres
#echo "Starting postgres on port "$PGPORT
#docker exec lmc_db bash -c "pg_ctl restart -w"