# THZSmartID

Ce dépôt contient toutes les ressources pour le **THZSmartID** (Lecteur d'alarme RFID et Zigbee).

## Mode d'emploi

Le mode d'emploi pour THZSmartID est disponible dans les langues suivantes :

- **Français** : [Mode d'emploi](docs/fr/Mode_d_emploi.md)

## Contenu du dépôt

- **Mode d'emploi**: Documentation utilisateur pour l'installation, la configuration et l'utilisation de THZSmartID.
- **External Converter pour Zigbee2MQTT**: Fichier de convertisseur externe pour l'intégration de THZSmartID avec Zigbee2MQTT ([Zigbee2MQTT/THZSmartID.js](Zigbee2MQTT/THZSmartID.js)).  

## Utilisation du convertisseur externe Zigbee2MQTT

Pour intégrer THZSmartID avec Zigbee2MQTT :

1. Copiez le fichier [`Zigbee2MQTT/THZSmartID.js`](Zigbee2MQTT/THZSmartID.js) dans le dossier `external_converters` de votre installation Zigbee2MQTT.
2. Redémarrez Zigbee2MQTT.

Pour l'addon Zigbee2MQTT de Home Assistant :

1. Accédez au répertoire `config/zigbee2mqtt`.
2. Créez un dossier nommé `external_converters` s'il n'existe pas déjà.
3. Copiez le fichier `THZSmartID.js` dans le dossier `external_converters`.
4. Copiez le fichier `THZSmartID.png` dans le dossier `device_icons` si vous souhaitez utiliser des icônes de périphérique personnalisées.
5. Redémarrez Zigbee2MQTT.
6. Dans l'onglet **Paramètres**, entrez `device_icons/THZSmartID.png` dans le champ **icône** pour définir l'icône de périphérique personnalisée.

## Where to Buy

You can purchase THZReader on [my Webshop](https://(https://thedandco.ovh/)).

<a href="https://thedandco.ovh/"><img src="https://thedandco.ovh/wp-content/uploads/2025/06/Logo_Fond_Clair.png" alt="I sell on my Webshop" width="200" height="55"></a>

## Images

Vous trouverez des images de produit et d'utilisation dans le dossier [docs/images](docs/images).

## Video

Regardez le clavier en action sur [YouTube](https://www.youtube.com/@THEDandCo).

## About

- **Manufacturer**: THED&Co
- **Description**: Zigbee-connected ISO 14443 et ISO 15693 RFID Reader for alarm systems.

## Useful Links

- [Zigbee2MQTT Documentation](https://www.zigbee2mqtt.io/)
- [ISO 15693 RFID Standard](https://en.wikipedia.org/wiki/ISO/IEC_15693)

---

Pour toute question ou suggestion, n'hésitez pas à ouvrir un problème ou à nous contacter à [contact@thedandco.ovh](mailto:contact@thedandco.ovh).

