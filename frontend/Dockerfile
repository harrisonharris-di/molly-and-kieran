FROM node:20
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve with a lightweight server
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
