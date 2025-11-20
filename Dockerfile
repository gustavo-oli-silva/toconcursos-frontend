FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN apk add --no-cache curl
COPY package.json package-lock.json ./
RUN npm ci --silent
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
