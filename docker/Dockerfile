FROM node:16.18
WORKDIR /app
COPY . .
RUN cd scripts && sh init.sh && sh build-frontend.sh
RUN rm -rf frontend
# EXPOSE 3000
WORKDIR /app/scripts
CMD ["sh", "start.sh"]