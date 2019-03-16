git pull origin staging
npm install
forever stop server/app.js
forever start server/app.js
