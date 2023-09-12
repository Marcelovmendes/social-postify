# 🗓️ Social-Postify

## 📝 Description

"Social Postify" is a web application that allows users to create and schedule posts for multiple social media platforms such as Facebook, Instagram, Twitter, and LinkedIn. Users can craft customized posts with images, headlines, text, and choose specific dates and times for each post. The system supports scheduling multiple posts and provides a clear overview of the scheduled posts.

## Installation

```bash
$ npm install
```

## Environment Setup

Rename one of the files to .env.

Rename the other file to .env.test.

Be sure to modify the variables in the .env file as needed.

Ensure that the .env.test file has its dedicated database configuration.

```bash
#init prima
$ npx prisma migrate dev
$ npx prisma generate
```

## Run the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

#setup test database
$ npm run test:prisma
```

## License

Nest is [MIT licensed](LICENSE).
