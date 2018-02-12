FROM  microsoft/dotnet:2.0.0-runtime

# install nginx
RUN apt-get update
RUN apt-get install -y nginx
RUN mkdir -p /run/nginx

# copy custom nginx config
RUN rm /etc/nginx/nginx.conf
ENV CONFIG_PATH "./docker/nginx.conf"
COPY ${CONFIG_PATH} /etc/nginx
# copy site
COPY ./src/frontend /var/www/html

# copy backend
RUN mkdir -p /app
COPY ./src/backend/Codit.ConnectedCar.API ./app

# copy startup script
ENV STARTUPSCRIPT_PATH "./docker/startup.sh"
COPY ${STARTUPSCRIPT_PATH} .

ENV ASPNETCORE_URLS http://+:5000
EXPOSE 80 443 5000

CMD ["sh", "startup.sh"]