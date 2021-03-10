# NodeJS API

Template API - NestJs Clean Architecture
### Structure


```
src
   application
     interfaces
     models
     useCases
       tests
   domain
     exceptions
     models
     shared
   infrastructure
     configs
       cache
       environment
       typeorm
     database
       entities
       migrations
       repositories
     ioc
     rest
       filters
       interceptors
       pipes
     validators
   presentation
     controllers
     dtos
     middlewares
```
```
- test
- docker/api.dockerfile
- .eslintrc.js
- .gitignore
- .prettierrc
- docker-compose.yml
- nest-cli.json
- package.json
- README.md
- tsconfig.json
- tsconfig.build.json


```

### Running

- Run without docker\n
1 - yarn start:dev\n
3 - yarn start:dev\n
- Run with docker
1 - ensure if dev network is created in a docker enviroment\n
2 - docker-compose up -d

## License

This project is licensed under the MIT License - see the [license](license) file for details