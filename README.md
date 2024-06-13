
# Practica Angular + Backend en Spring Boot

Practica frontend con Angular backend en Spring Boot.

### Funciones
- Entrar en una sesión o loguearse. Usuario por defecto:  
   
| Parametro | Valor    
| :-------- | :------- |
| **`Usuario`**       | admin |
| **`Contraseña`**       | admin |



- Consultar lista de usuarios.

- Editar usuarios por medio del botón editar en la lista.

- Modificar todos campos de los usuarios, excepto el rol, este campo no fue implementado en el backend. Todos los demás son funcionales.

- Crear nuevo usuario. Solo un admin puede hacerlo. Tampoco se puede seleccionar rol. Por defecto es recepcionista.

- Eliminar usuario. Acción permanente, respaldo no implementado en backend.

## Iniciar

 - Iniciar el proyecto backend de Java Spring Boot.
 - Escribir por consola **npm install** por consola en la ruta del angular frontend.
 - Escribir por consola **ng serve** por consola en la ruta del angular frontend.


## Comentarios

#### Pueden existir errores por migracion

El proyecto fue iniciado en Angular 14 y Angular Material 14 por estar más familiarizado por los cursos.  
Realice la migración desde la versión 14 a la versión 18 de forma correcta, corregí los errores que surgieron a partir de esto, tanto visuales como de funcionalidad.  

Aunque esto lo realice como practica y revise que todo funcionara correctamente, podrían haber pasado por alto cosas que no surgieron en mis pruebas.

#### Docker

Por falta de tiempo no he implementado Docker pues en mis prácticas de Spring Boot surgieron problemas que no pude resolver y deje pendientes para realizar esta práctica. Tomaré cursos para conocer más sobre esta tecnología.

