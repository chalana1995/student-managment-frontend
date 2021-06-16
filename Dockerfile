FROM node:latest

# Create a directory where our app will be placed
RUN mkdir -p /app/src

# Change directory so that our commands run inside this new directory
WORKDIR /app/src

# Copy dependency definitions
# COPY package*.json .

# # Install dependecies

# RUN npm install

RUN npm install -g @angular/cli@10.1.1

# Get all the code needed to run the app
COPY . .

# EXPOSE 4220

# # Serve the app
# CMD ["ng", "serve"]


