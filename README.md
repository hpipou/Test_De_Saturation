# TEST DE SATURATION

## INSTALLATION
- [x]  `npm install`
- [x]  Veuillez insérer les informations de votre API REST à tester dans le fichier `.env`
- [x]  Lancez l'application avec la commande `node index.js`

## Fonctionnalités réalisées :
- [x]  Test de saturation, Envoie de requêtes en masse
- [x]  Calculer le temps que met le serveur à répondre
- [x]  Taux de requetes "success/failed"
- [x]  Enregistrement des logs dans le fichier text `logs.txt`

### Pour avoir un HARD STRESS TEST, il faut installer l'application des des instances EC2 dans le cloud d'AWS. 100 instances EC2 qui envoient 10000 requetes. Pour analyser le résultat du HARD STRESS TEST, il suffit de consulter les logs ou de récolter les répenses de chaque instances qui sera au format JSON de ce type :
<br>

```js
{
"status": "Simulation completed",
"nb_request": 1000,
"success": 950,
"error": 50
}
```

<br>
<div align="center">
  <img src="https://github.com/hpipou/reservation_hotel_backend/blob/main/SCREENSHOT_MYSQL_BDD.png"/><br>
</div>

## @LAMINE 😉
