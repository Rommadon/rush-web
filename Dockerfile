FROM  --platform=linux/amd64 node:14.18-alpine

WORKDIR /usr/app

RUN apk add --update tzdata
ENV TZ=Asia/Bangkok

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production=false
COPY . .
RUN yarn run build

EXPOSE 3000

CMD ["npm", "run", "start"]
