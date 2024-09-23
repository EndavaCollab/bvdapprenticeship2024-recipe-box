FROM oven/bun:alpine

# Install dependencies
RUN apk add --no-cache nodejs
RUN bun i -g serve

# Create app folder and move local files
RUN mkdir -p /recipe-box
WORKDIR /recipe-box
COPY src/main/frontend/package.json /recipe-box/
COPY src/main/frontend/src/ /recipe-box/src/
COPY src/main/frontend/.env /recipe-box/
COPY src/main/frontend/public/ /recipe-box/public/
COPY src/main/frontend/tsconfig.json /recipe-box/

# Install project dependencies and build production bundle
RUN bun i

# Port to be exposed when deploying the container + env variable to use on build
EXPOSE 80
ENV REACT_APP_BACKEND_URL=http://localhost:8080
CMD [ "bun", "run", "build", "&&", "serve", "-s", "../../../target", "-l", "80" ]
