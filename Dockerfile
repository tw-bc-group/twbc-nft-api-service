FROM node:16-alpine as common-build-stage

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

ENV NODE_ENV development

EXPOSE 3000

RUN chmod +x ./commands/boot.sh
RUN npx prisma generate

CMD ["./commands/boot.sh"]
