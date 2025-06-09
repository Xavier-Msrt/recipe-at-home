FROM node:lts-alpine3.17

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

CMD ["sh", "-c", "pnpm run db:deploy && pnpm run dev"]