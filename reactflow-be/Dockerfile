FROM node:20
WORKDIR /app
COPY package.json package-lock.json* ./
# Use latest version of npm
RUN npm i npm@latest -g
RUN npm install --no-optional && npm cache clean --force
COPY . .
RUN npm run build
EXPOSE 3001
CMD [ "node", "nest start" ]
