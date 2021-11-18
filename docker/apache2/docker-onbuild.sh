 #!/bin/sh


#On initial builds its necessary to do a data migration
if [ "$1" == "--build" ]; then

    echo "Migrating PostGres database tables..."

    #go to the main folder
    cd /var/www/backend

    ./manage.py makemigrations
    ./manage.py migrate

    echo "
    "

    echo "Creating a super user. See the .env file for the credentials.
    "

fi

echo "Starting Apache...."

a2dissite 000-default
a2ensite lmc

apachectl restart

echo 
echo
echo "Apache started"