FROM node:16.18
ENV NODE_ENV=production
WORKDIR /app
COPY ./dist ./dist
COPY ./html ./html
# EXPOSE 3000
CMD ["node", "./dist/main.js"]