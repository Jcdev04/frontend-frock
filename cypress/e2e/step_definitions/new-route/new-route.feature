Feature: Crear nueva ruta

  Scenario: El usuario inicia sesión y crea una nueva ruta
    Given el usuario ha iniciado sesión con correo "erick@gmail.com" y contraseña "test"
    When accede a la sección de rutas
    And selecciona los paraderos inicio y final
    And asigna la duración de la ruta, el precio y la frecuencia de salida
    And Se dará click al boton de continuar
    Then la ruta debería crearse correctamente
