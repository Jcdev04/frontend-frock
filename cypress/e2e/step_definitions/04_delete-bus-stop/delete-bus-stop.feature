Feature: Eliminación de un paradero

  Scenario: El usuario elimina un paradero desde la sección de Paraderos
    Given el usuario ha iniciado sesión con correo "erick@gmail.com" y contraseña "test"
    When accede a la sección de paraderos
    And hace clic en el ícono de eliminar del tercer paradero
    And confirma la eliminación
    Then el paradero debería eliminarse correctamente
