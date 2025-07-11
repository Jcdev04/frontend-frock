Feature: Edición de nombre de empresa

  Scenario: El usuario inicia sesión y edita el nombre de su empresa correctamente
    Given el usuario inicia sesión con correo "erick@gmail.com" y contraseña "test"
    When hace clic en la tarjeta inferior de editar información de empresa
    And hace clic en editar
    And borra y escribe "PruebaClase" en el campo nombre de empresa
    And hace clic en el botón de guardar cambios
    Then debería ver un cambio visual en la interfaz
