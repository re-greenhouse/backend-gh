<div align="center">
  <img src="https://i.imgur.com/TeYWJtM.png" alt="Logo" width="256" height="256">
  <h1 align="center">Greenhouse backend</h1>
</div>

## Description

Welcome to the Greenhouse Mushroom Harvest Backend! This repository, built using NestJS, is part of the Greenhouse project aimed at managing mushroom harvests efficiently through microservices architecture within a monorepo setup.

### Features
- **Microservices Architecture:** Leveraging NestJS for building scalable and maintainable microservices.
- **gRPC Communication:** Utilizing gRPC for efficient inter-service communication, ensuring high-performance interactions.
- **Monorepo Structure:** Organized as part of a monorepo, allowing for centralized management and easy collaboration across services.


## Installation

```bash
$ npm install
```

## Docker

```bash
# start databases for services
$ docker compose up -d
```

## Creating proto files
```bash
 protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/[FILENAME].proto
```

## Run services
```bash
# development sample
$ npm run start:dev api-gateway
$ npm run start:dev iam
$ npm run start:dev personas

# watch mode
$ npm run start:dev [app-name]

# production mode
$ npm run start:prod [app-name]
```

### Built With
- NestJS
- TypeORM
- gRPC
- Postgres

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat:Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact
Aleiva - [@aleiva17](https://github.com/aleiva17) - aleiva1700@gmail.com
<br />