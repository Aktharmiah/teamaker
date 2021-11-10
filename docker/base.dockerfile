FROM python:3.9.6

RUN apt-get update --fix-missing

RUN apt-get -y install apache2 
RUN apt-get -y install apache2-dev

#should auto enable after installation -- just just in case
RUN apt-get -y install libapache2-mod-wsgi-py3 

#These applications are not necessary but they help in debugging any problems
#inside a running container
RUN apt-get -y install nano
RUN apt-get -y install net-tools
RUN apt-get -y install curl
RUN apt-get -y install iputils-ping

########################Python stuff

#Copy from host computer into the container at the specified path
COPY ./requirements.txt /opt/lmc/requirements.txt

#update the pip module and install the django external dependencies as listed in the requirements.txt file
RUN pip install --upgrade pip
RUN pip install -r /opt/lmc/requirements.txt