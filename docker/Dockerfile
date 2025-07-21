FROM node:latest

ENV PORT=10000
ENV MAX_OUTPUT_TOKENS=2000
ENV DATABASE_URL='postgresql://neondb_owner:npg_rd2LvBSm4bRn@ep-twilight-surf-a1x2qkhc-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
ENV GEMINI_MODEL_NAME "gemini-2.5-flash"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "start" ]