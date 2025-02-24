FROM node:lts as dependencies
WORKDIR /front
COPY package.json ./
RUN yarn

FROM node:lts as builder
WORKDIR /front
COPY . .
COPY --from=dependencies /front/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /front
ENV NODE_ENV production

COPY --from=builder /front/public ./public
COPY --from=builder /front/package.json ./package.json
COPY --from=builder /front/.next ./.next
COPY --from=builder /front/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]
