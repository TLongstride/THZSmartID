# 📘 Manuel d’utilisation — THZSmartID
Clavier d'alarme RFID Zigbee  
by THED&Co

## Description

Le clavier d'alarme RFID THZSmartID est un lecteur de badges RFID compatible Zigbee, conçu pour une intégration facile avec les systèmes domotiques tels que Home Assistant via Zigbee2MQTT ou ZHA. Il permet de détecter la présence de badges RFID conformes aux normes ISO14443 et ISO15693, offrant ainsi une solution simple et efficace pour la gestion de l'alarme.

Il comporte 3 voyants pour indiquer la présence de tag, la validation de la lecture ou le refus, ainsi qu'un buzzer pour un retour sonore qui peut être activé ou désactivé selon les besoins.

Il est également doté de 3 voyants pour indiquer l'état de l'alarme (armé, désarmé, partiel) et peut être configuré pour interagir avec le système d'alarme via des automatisations dans Home Assistant.
La partie contrôle du badge et retour est gérée par Home Assistant, ce qui permet une grande flexibilité dans la gestion des accès et des scénarios d'alarme.

---

## 📦 Contenu du colis

- 1× Clavier d'alarme RFID THZSmartID

---

## ⚙️ Spécifications techniques

- **Protocole** : Zigbee
- **Norme RFID supportée** : ISO14443 et ISO15693
- **Portée de lecture** : 0-7 cm
- **Alimentation** : 5V via USB Type-C
- **Consommation** : typique 50 mA (alimentation USB 5 V)  
- **Boîtier** : PLA
- **Compatibilité** : Zigbee2MQTT, ZHA, Home Assistant
- **Dimensions lxLxh** : 78.2 × 63.2 × 23.0 mm
- **Matériel** :  
   - RFID : puce NXP PN5180A  
   - Zigbee : puce Ebyte CC2530  
   - Microcontrôleur principal : Espressif ESP32-C3

---

## 🧱 Installation physique

1. Choisissez un emplacement adapté : installez le THZSmartID dans un lieu dégagé, sec et à l’abri des interférences électromagnétiques.
3. Fixation : le module peut être fixé au mur à l’aide de vis ou de ruban adhésif double-face, un pied de support est également disponible en option.
4. Branchement : connectez l’alimentation. Une LED s’allume brièvement pour indiquer la mise sous tension.
5. Démarrage : attendez 5 secondes pour le démarrage complet du module.
6. Lectures : la lecture d'un badge prend entre 200 ms et 1200 ms.

---

## 🔗 Procédure d’appairage Zigbee

1. Activez l’inclusion Zigbee dans votre coordinateur.
2. Branchez le module : une LED clignote lentement indiquant qu’il est prêt à s’appairer.
3. Le module apparaît sous le nom **THZSmartID** dans l’interface Zigbee2MQTT.

En cas de nécessité, vous pouvez réinitialiser le module en appuyant sur le bouton de réinitialisation via le petit trou situé sur le dessous du boitier pendant 10 secondes. Cela effacera tous les paramètres et le module sera prêt à être appairé à nouveau.

---

## 🏠 Intégration dans Home Assistant via Zigbee2MQTT
Pour l’addon Zigbee2MQTT de Home Assistant :

1. Accédez au répertoire `config/zigbee2mqtt`.
2. Créez un dossier nommé `external_converters` s’il n’existe pas déjà.
3. Copiez le fichier `THZSmartID.js` dans le dossier `external_converters`.
4. (Optionnel) Copiez le fichier `THZSmartID.png` dans le dossier `device_icons` si vous souhaitez utiliser une icône personnalisée pour l’appareil.
5. Redémarrez Zigbee2MQTT.

Une fois intégré via Zigbee2MQTT, deux entités sont automatiquement créées :

        exposes.binary('tag', ea.STATE, true, false).withDescription('Tag present status (e.g., true, false)'),
        exposes.text('type', ea.STATE).withDescription('Type of the read RFID tag'),
        exposes.text('uid', ea.STATE).withDescription('UID of the read RFID tag'),
        exposes.text('action', ea.SET).withDescription('Send command to device'),

- `binary_sensor.THZSmartID_presence` : détecte la présence ou l’absence d’un badge/tag RFID.
- `sensor.THZSmartID_uid` : expose l’UID du badge RFID détecté.
- `sensor.THZSmartID_type` : expose le type du badge RFID détecté.
- `text.THZSmartID_action` : permet d’envoyer des commandes au dispositif.

Utilisez ces entités dans vos automatisations Home Assistant :

- Déclencher des scénarios d’arrivée/départ.
- Déverrouiller une porte ou désactiver une alarme.
- Envoyer des notifications personnalisées.

Liste des commandes disponibles via l’entité `text.THZSmartID_action` :

- ACCEPTED : Valide la lecture avec retour sonore et visuel.
- REFUSED : Refuse la lecture avec retour sonore et visuel. 
- ACCEPTED_MUTED : Valide la lecture avec retour visuel uniquement.
- REFUSED_MUTED : Refuse la lecture avec retour visuel uniquement.
- ARMING : Active le voyant d’alarme en cours d’armement.  
- ARMED : Active le voyant d’alarme armée.
- PARTIAL : Active le voyant d’alarme partielle.
- DISARMED : Active le voyant d’alarme désarmée.
- OFF : Éteint les voyants d’alarme.

---

#### Fonctionnalités :
- Détection de présence ou d’absence d’un badge.
- Exécution d’automatisations personnalisées basées sur l’UID du badge.

#### Importation du Blueprint :
1. Cliquez sur le bouton ci-dessous pour importer directement le blueprint dans votre instance Home Assistant.
2. Configurez les paramètres selon vos besoins.

[![Import Blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https://github.com/TLongstride/THZSmartID/blob/main/blueprints/fr/THZSmartID_Alarmo_Connector.yaml)

## ⚠️ Conseils de sécurité et bonnes pratiques

- Ne pas exposer le module à l’eau ou à une forte humidité.
- Ne pas démonter le module lorsqu’il est alimenté.
- Évitez toute présence d’éléments métalliques entre le badge et le capteur.
- Ne pas exposer le module à des températures extrêmes (inférieures à -10°C ou supérieures à 40°C).
- Le module est conçu pour une utilisation en intérieur. Pour une utilisation en extérieur, placez-le dans un boîtier étanche et résistant aux intempéries.

---

## 🔒 Responsabilité de l’utilisateur

Le THZSmartID est un lecteur de badges RFID sans action propre. Il se limite à détecter la présence d’un tag RFID compatible (conforme à aux normes ISO14443 et ISO15693) et à transmettre les informations au système domotique ou informatique auquel il est connecté.  
**La conformité aux normes ISO14443 et ISO15693 ne garantit pas l’infaillibilité du système ou la sécurité absolue des accès.**

Toute action déclenchée suite à la lecture d’un tag (ex. : ouverture de porte, activation d’un appareil, modification d’un état logiciel) dépend entièrement de la configuration mise en place par l’utilisateur ou son intégrateur.

En conséquence, l’utilisateur est seul responsable :
- des scénarios ou automatismes liés à la lecture des tags,
- de la sécurisation des accès ou des dispositifs commandés,
- de la gestion des droits d’accès associés à chaque tag.

**THED&Co** ne saurait être tenue responsable des conséquences d’une mauvaise configuration ou d’un usage inapproprié du THZSmartID dans des systèmes critiques ou de sécurité.

---

## 📞 Support & documentation

- 📧 contact@thedandco.ovh
- 🔗 [github.com/TLongstride](https://github.com/TLongstride)

---

Produit imaginé, conçu et fabriqué avec soin par **THED&Co** — France 🇫🇷
Copyright © 2025 THED&Co. Tous droits réservés.