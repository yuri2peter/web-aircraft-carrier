FROM node:16.18
WORKDIR /app
COPY . .
RUN cd scripts && sh init.sh && sh build-frontend.sh
# EXPOSE 3000
WORKDIR /app/scripts
CMD ["sh", "start.sh"]