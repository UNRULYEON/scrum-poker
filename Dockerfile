# FROM node:12

# WORKDIR /app

# # Copy server
# COPY package.json .
# COPY yarn.lock .
# COPY tsconfig.json .
# COPY *.ts ./
# RUN mkdir build
# RUN mkdir build/frontend

# # Install server packages
# RUN yarn global add typescript
# RUN yarn install --prod

# # Build server
# RUN yarn build

# # Copy client
# RUN mkdir /client
# COPY client/package.json /client
# COPY client/yarn.lock /client
# COPY client/tsconfig.json /client
# COPY client /client

# # Install client packages
# WORKDIR /app/client
# RUN yarn install --prod

# # Build client
# ENV GENERATE_SOURCEMAP=false
# RUN yarn build:docker
# COPY build /app/build/frontend
# WORKDIR /app

# ENV NODE_ENV=production

# EXPOSE 5000

# CMD [ "yarn", "start:prod" ]

FROM node:12

WORKDIR /app

# Copy server
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY *.ts ./
RUN mkdir build
RUN mkdir build/frontend

# Copy client
COPY client client

# Install server packages
RUN yarn global add typescript
RUN yarn install --prod

# Install client packages
ENV GENERATE_SOURCEMAP=false
RUN yarn --cwd client install --prod

# Build server
RUN yarn build

# Build client
RUN yarn --cwd client build:docker

ENV NODE_ENV=production

EXPOSE 5000

CMD [ "yarn", "start:prod" ]