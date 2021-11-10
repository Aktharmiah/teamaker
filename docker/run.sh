 #!/bin/sh


#Check if the docker base image exists. If not then create it

 echo "Shutting down postgres on host machine..."
 sudo service postgresql stop


docker-compose down

#Check for the --build flag. If it is provided then build the main docker image (the one with django in it)
#This is intened for inital (setup runs)
if [ "$1" == "--build" ]; then

    echo "Building/rebuilding the main docker image .... 
    "
    docker build -f base.dockerfile -t lmc/base .   


else
    echo "Using existing docker images
    "
    docker-compose up -d
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

