Feature: Eliminación de rutas

  Scenario: El usuario elimina una ruta existente
    Given el usuario ha iniciado sesión con correo "erick@gmail.com" y contraseña "test"
    When accede a la sección de rutas
    And hace clic en el icono de eliminar de la ruta
    And confirma la eliminación
    Then la ruta debería desaparecer de la lista
