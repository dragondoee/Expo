# App Mobile - React Native

## Prérequis
- nodejs v22
- compte et projet MongoDB Atlas
- Application mobile Expo


## Installation en local

### API
- `cd api`
- `npm install`
- Ajouter un fichier **.env** avec une variable MONGODB_ENDPOINT

### Client
- `cd my-app`
- `npm install`


## Utilisation en local

### API
1. Lancer l'API : `npm run dev`

### Client
**Attention, vos machines doivent être sur le même réseau internet**

1. Récupérer l'ip de votre machine : 
`ipconfig`

2. Mettre à jour le fichier config.js :
http://{ip}:3000

3. Lancer l'application : 
`npm run start`

4. Ouvrir l'application avec Expo


## Utilisation de la prod

### API : 
https://expo-5afp.onrender.com

### Collection Postman :
Un fichier json se trouve dans le dossier api, téléchargez le pour ajouter la collection dans Postman.

Vous pouvez aussi la retrouver via ce lien :
https://www.postman.com/flight-administrator-51391273/mobiledeveloppement/collection/u2ze7rl/mobilenoteapp?action=share&creator=36766595&active-environment=36766595-a5af2c3d-1f96-4667-94b4-f72419e27e2a