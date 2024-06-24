# Requerimientos 4 y 5

## Requerimiento 4

### Setup

1. Clonar el repositorio de GitHub con el siguiente enlace: [Decurnex_Martinez_BDNR](https://github.com/frandecu/Decurnex_Martinez_BDNR.git)
2. Levantar Docker.
3. Abrir el código en un editor de texto y abrir una terminal en el directorio del requerimiento 4 (`req_4`).
4. En la terminal, ejecutar el comando:
   ```bash
   ./cassandra-setup.sh
   ```
5. Permitir que pasen al menos 5 intentos, a veces demora en levantar la instancia en Docker. Generalmente se levanta en el intento 7.
6. Levantar la aplicación con:
   ```bash
   yarn start
   ```

### Modelo de Datos en Apache Cassandra

#### Tabla: user_activity

| Campo         | Tipo de Datos   | Descripción                                                          |
| ------------- | --------------- | -------------------------------------------------------------------- |
| user_id       | UUID            | Identificador único del usuario (PRIMARY KEY, PARTITION KEY).        |
| game_id       | UUID            | Identificador único del juego (PRIMARY KEY, CLUSTERING KEY).         |
| timestamp     | timestamp       | Fecha y hora de la actividad (PRIMARY KEY, CLUSTERING KEY).          |
| activity_type | text            | Tipo de actividad (ej: "playtime", "achievement", "level_unlocked"). |
| activity_data | map<text, text> | Datos específicos como tiempo de juego, logros, niveles, etc.        |

Implementamos las funcionalidades de crear una actividad de usuario, las cuales se almacenan en una base de datos no relacional Cassandra. También se pueden buscar todas las actividades de un usuario, así como buscar actividades por ID de usuario y juego.

## Requerimiento 5

### Registro y Perfil de Usuarios

#### Setup

1. Clonar el repositorio de GitHub con el siguiente enlace: [Decurnex_Martinez_BDNR](https://github.com/frandecu/Decurnex_Martinez_BDNR.git)
2. Levantar Docker.
3. Abrir el código en un editor de texto y abrir una terminal en el directorio de `users` (`Req_5/users`).
4. En la terminal, ejecutar el comando:
   ```bash
   ./mongodb-setup.sh
   ```
5. Levantar la aplicación con:
   ```bash
   yarn start
   ```

### Modelo de Datos en MongoDB

```typescript
export interface User extends Document {
  email: string;
  password: string;
  username: string;
  profileImage: string;
  bio: string;
  friends: any[];
  wishlist: any[];
  privacySettings: PrivacySettings;
  securitySettings: SecuritySettings;
  gameLibrary: any[];
  badges: any[];
  inventory: any[];
  screenshots: any[];
  videos: any[];
  workshopItems: any[];
  reviews: any[];
  guides: any[];
  artwork: any[];
}
```

Decidimos utilizar este modelo porque proporciona una estructura completa y detallada que abarca todos los aspectos relevantes del perfil de un usuario en una plataforma de videojuegos. Esto incluye datos personales, configuraciones de privacidad y seguridad, y elementos relacionados con la experiencia del usuario. Esto nos permite una gestión eficiente de todos los datos. La aplicación cuenta con las funcionalidades CRUD para un usuario: Crear, Buscar por ID, Buscar todos, Editar y Eliminar.

### Privacidad

#### Setup

1. Clonar el repositorio de GitHub con el siguiente enlace: [Decurnex_Martinez_BDNR](https://github.com/frandecu/Decurnex_Martinez_BDNR.git)
2. Levantar Docker.
3. Abrir el código en un editor de texto y abrir una terminal en el directorio de `privacy` (`Req_5/privacy`).
4. En la terminal, ejecutar el comando:
   ```bash
   ./cassandra-setup.sh
   ```
5. Levantar la aplicación con:
   ```bash
   yarn start
   ```

### Modelo de Datos en Cassandra

#### Tabla: user_permissions

| Campo           | Tipo de Datos | Descripción                                                           |
| --------------- | ------------- | --------------------------------------------------------------------- |
| user_id         | UUID          | Identificador único del usuario.                                      |
| item_type       | text          | Tipo de elemento (perfil, mensaje, comunidad, etc.).                  |
| item_id         | UUID          | Identificador del elemento específico.                                |
| permission_type | text          | Tipo de permiso (ver, editar, enviar mensajes, etc.).                 |
| allowed_users   | set<UUID>     | Conjunto de usuarios a los que se les permite la acción especificada. |

Este modelo es flexible y eficiente para almacenar y consultar permisos de usuario en tiempo real, lo cual es fundamental para las características de privacidad y permisos en la aplicación. Con esta estructura y organización, la aplicación cumple con los requisitos de permitir la inserción, almacenamiento y visualización de datos relacionados con los permisos de usuario utilizando Cassandra como base de datos. La aplicación es escalable, mantenible y optimizada para consultas rápidas y eficientes.
