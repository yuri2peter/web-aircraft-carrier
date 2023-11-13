FROM node:lts-alpine3.18
ENV NODE_ENV=production
WORKDIR /app
LABEL version="v1" description="My App" project="https://github.com/myapp" maintainer="John@github"
COPY ./app /app
CMD ["node", "./dist/main.js"]
