FROM oven/bun:alpine as build

# Install nodejs
RUN apk add --no-cache nodejs

# Move local files
WORKDIR /recipe-box
COPY src/main/frontend/package.json /recipe-box/
COPY src/main/frontend/src/ /recipe-box/src/
COPY src/main/frontend/.env /recipe-box/
COPY src/main/frontend/public/ /recipe-box/public/
COPY src/main/frontend/tsconfig.json /recipe-box/

# Install project dependencies
RUN bun i

# Set env variable to bundle backend link into build
ENV REACT_APP_BACKEND_URL=http://localhost:8080
RUN bun run build

FROM oven/bun:alpine as deploy

RUN apk add --no-cache nodejs
RUN bun i -g serve

COPY --from=build /target/ /recipe-box
EXPOSE 80
CMD [ "serve", "-s", "/recipe-box/", "-l", "80" ]
