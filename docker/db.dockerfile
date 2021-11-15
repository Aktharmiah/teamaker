FROM postgis/postgis:10-2.5

#Create a non-privilaged user, non interactively
RUN useradd common