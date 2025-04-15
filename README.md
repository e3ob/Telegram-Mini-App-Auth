# Telegram-Mini-App-Auth
A minimal example to implement user authentication using Telegram's [Mini-App](https://core.telegram.org/bots/webapps) feature.
## Structure
Repo contains two folders, `mini-app` and `nest-app`.
Both are templates and then being worked upon
- mini-app - Template from https://github.com/Telegram-Mini-Apps/nextjs-template
- nest-app - Generated using https://docs.nestjs.com/first-steps
### Instructions for running `nest-app`
- cd into `nest-app` folder
  ```sh
  cd nest-app
  ```
- Copy `.env` file
  ```sh
  cp sample.env .env
  ```
- Fill in your bot token in BOT_TOKEN
- Run `nest-app` in dev mode
  ```sh
  pnpm run start:dev
  ```

> [!Note]
> For running `mini-app`, follow instructions on ReadMe on the folder.
