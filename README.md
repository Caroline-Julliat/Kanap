# Construisez un site e-commerce en JavaScript  

Cinquième projet du parcours dévelopeur web chez OpenClassrooms. 
L'objectif est __l’implémentation de manière dynamique de site e-commerce__ nommé "Kanap".    

Le CSS, le HTML et le back-end étaient fournis. Il était demandé d'intégrer dynamiquement les divers éléments aux pages, grâce à JavaScript et l'API. 

## Scénario du projet

Votre client est Kanap, une marque de canapés qui vend ses produits depuis sa boutique exclusivement. Aujourd’hui, celle-ci souhaiterait avoir une plateforme de e-commerce en plus de sa boutique physique pour vendre ses produits sur Internet.  

Dans le cadre de cette mission, vous travaillez avec une équipe constituée de :  
- Corinne, le CTO de l’agence  
- Frank, le développeur front-end qui s’est chargé d’intégrer la maquette statique du site  
- Bilal, le développeur back-end qui implémente l’API à laquelle est connecté le front-end 

Corinne vous envoie un e-mail pour vous briefer sur la mission :  

>__De__ : Corinne
>__À__ : Vous
>__Objet__ : Site e-commerce Kanap 
>
>Hello !  
>
>Comme on en a discuté hier, voici les informations pour que tu puisses démarrer l’implémentation du site de Kanap de manière dynamique. Voici les différentes tâches que tu vas devoir mener à bien :  
>
>- Unifier les travaux déjà réalisés par l’équipe en intégrant dynamiquement les éléments de l’API dans les différentes pages web avec JavaScript. Le code du front-end et de l’API est disponible sur [ce repo.](https://github.com/OpenClassrooms-Student-Center/P5-Dev-Web-Kanap)
>- Mettre en place un plan de test d’acceptation.
>
>Pour plus de précisions, réfère-toi aux spécifications techniques et fonctionnelles du projet. Tu pourras y trouver tous les détails de celui-ci, les attentes pour chaque page du site web et les détails de l’API. 
>
>Bonne journée,
>
>Corinne


## Spécifications fonctionnelles et techniques

### API

__Routes GET__  
Url pour la réccupération de tout les produits de l'API: `http://localhost:3000/api/products`  
Url pour la réccupération d'un seul produit de l'API: `http://localhost:3000/api/products/{product-ID}`  

__Route POST__
`http://localhost:3000/api/products/order`  

L’API n’est actuellement que dans sa première version. La requête post qu’il faudra formuler pour passer une commande ne prend pas encore en considération la quantité ni la couleur des produits achetés.  

*Corps de la demande prévue*: Requête JSON contenant un objet de contact et un tableau de produits.  
*Réponse*: Retourne l'objet contact, le tableau produits et orderId (string).  

l’objet contact envoyé au serveur doit contenir les champs firstName, lastName, address, city et email. Le tableau des produits envoyé au back-end doit être un array de strings product-ID. Les types de ces champs et leur présence doivent être validés avant l’envoi des données au serveur.  


### Architecture générale  

L’application web est composée de 4 pages :

__La page d’accueil__  
Cette page présente l’ensemble des produits retournés par l’API. Pour chaque produit, il faudra afficher l’image de celui-ci, ainsi que son nom et le début de sa description. En cliquant sur le produit, l’utilisateur sera redirigé sur la page du produit pour consulter celui-ci plus en détail.

__La page produit__  
Cette page présente un seul produit. Elle aura un menu déroulant permettant à l'utilisateur de choisir une option de personnalisation, ainsi qu’un input pour saisir la quantité. Ces éléments doivent être pris en compte dans le panier.

__La page panier__
Sur cette page, l’utilisateur va pouvoir modifier la quantité d’un produit de son panier. Les inputs des utilisateurs doivent être analysés et validés pour vérifier le format et le type de données avant l’envoi à l’API. Il ne serait par exemple pas recevable d’accepter un prénom contenant des chiffres, ou une adresse e-mail ne contenant pas de symbole “@”. En cas de problème de saisie, un message d’erreur devra être affiché en dessous du champ correspondant.

__La page confirmation__  
Sur cette page, l'utilisateur doit voir s’afficher son numéro de commande


### Prérequis pour le fonctionnement du back-end
- Node.js et npm doivent être installé  
- À partir du back-end executer la commande `npm install`
- Démarrer le serveur avec la commande `node server`
- Le serveur doit fonctionner sur `localhost` avec le port par défaut `3000`

