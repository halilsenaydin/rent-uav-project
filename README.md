# UAV Rental Project

This project is an application for renting unmanned aerial vehicles (UAVs). The backend is developed using Django with a RESTful architecture, while the frontend is built using Angular in a modular structure.

## Table of Contents
- [Preview The Project Used](#preview-the-project)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Dependencies](#project-dependencies)
- [App Images Dependencies](#app-images)

## Preview The Project

[Preview Angular for Rent UAV Project](https://uav-angular.kulabuz.com/swagger)

[Preview Swagger Documentation for Rent UAV Project](https://uav.kulabuz.com/swagger)

**Login can be done with username and password.**

- For personnel login: [uav-angular.kulabuz.com/auth/login](http://uav-angular.kulabuz.com/auth/login)
- For super user: [uav.kulabuz.com/admin](http://uav.kulabuz.com/admin)

| Kullanıcı          | Şifre      | Takım        |
|-------------------|------------|---------------|
| halilsenaydin     | 270913     | root          |
| kanat_user_one    | 741963qwe  | Kanat Takımı  |
| kanat_user_two    | 741963qwe  | Kanat Takımı  |
| govde_user_one    | 741963qwe  | Gövde Takımı  |
| montaj_user_one   | 741963qwe  | Montaj Takımı |

## Technologies Used

- **Backend:**
  - Django
  - PostgreSQL
  - Django REST Framework
  - JWT (JSON Web Token) for authentication

- **Frontend:**
  - Angular

- **Others:**
  - Docker and Docker Engine
  - ORM
  - SOLID Software Principles
  - Observable Pattern
  - Decorator Pattern
  - Swagger API Documentation

## Installation

### Prerequisites

Ensure you have the following software installed on your machine:

- [Docker Desktop](https://www.docker.com/get-started)
- [npm Package Manager](https://www.npmjs.com/) and [Angular CLI](https://v17.angular.io/cli) `This dependencies need to for Angular project`

### Install Project Dependencies

#### Install NVM
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

Close and reopen your terminal to start using nvm or run the following to use it now:
```bash
exportNVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

#### Install Npm
```bash
nvm install node
nvm install --lts
```

#### Install Angular CLI
```bash
npm install -g @angular/cli
```

#### Check Version
```bash
npm -v
ng --version
```

### Cloning the Project

Clone the project from GitHub:

```bash
git clone https://github.com/halilsenaydin/rent-uav-project.git
cd rent-uav-project
```

## Running the Project

### Running the Django Server

The project can be viewed at `localhost:8000`

```bash
cd baykar_iha
docker-compose up --build
```

### Running the Angular Client

The project can be viewed at `localhost:4200`

```bash
cd baykar-iha-angular
npm i
ng serve --open
```

### API Documentation

Access the Swagger-generated API documentation by visiting `http://localhost:8000/swagger/` in your browser.

## Project Dependencies

- [Docker and Docker Engine](https://www.docker.com/)
- [Django](https://www.djangoproject.com/)
- [Angular](https://angular.dev/)
- [PostgreSQL](https://www.postgresql.org/)

## App Images

### Auth Images
![Home](app-images/sign-in/1.%20Login.png)

### Assembly User Images
![Home](app-images/montaj_user/1.%20Home.png)
![Produced Pieces](app-images/montaj_user/2.%20Produced-pieces.png)
![Produced Pieces Permission 1](app-images/montaj_user/3.%20Produced-pieces%20Permission-1.png)
![Produced IHA Stock](app-images/montaj_user/4.%20Produced-iha-stock.png)
![Produce Piece](app-images/montaj_user/5.%20Produce-piece.png)
![Produce IHA](app-images/montaj_user/6.%20Produce-iha.png)
![Produce IHA Permission 1](app-images/montaj_user/7.%20Produce-iha%20Permission-1.png)
![Produce IHA Success](app-images/montaj_user/8.%20Produce-iha%20success.png)
![Produce IHA Stock](app-images/montaj_user/9.%20Produce-iha-stock.png)
![Produce IHA Stock Permission 1](app-images/montaj_user/10.%20Produce-iha%20stock%20Permission-1.png)
![Produce IHA Add New Piece](app-images/montaj_user/11.%20Produce%20iha%20add%20new%20ppiece.png)

### Wind User Images
![Home](app-images/kanat_user/1.%20Home.png)
![Stocks](app-images/kanat_user/2.%20Stocks.png)
![Permission 1](app-images/kanat_user/3.%20Permission-1.png)
![Permission 2](app-images/kanat_user/4.%20Permission-2.png)
![Produce Stock](app-images/kanat_user/5.%20Produce-stock.png)
![Produce IHA Stock](app-images/kanat_user/6.%20Produce-iha-stock.png)
![Produce Piece Success](app-images/kanat_user/7.%20Produce-piece-success.png)
![Produce Piece Permission 1](app-images/kanat_user/8.%20Produce-piece%20Permission-1.png)
![Produce IHA](app-images/kanat_user/9.%20Produce-iha.png)
