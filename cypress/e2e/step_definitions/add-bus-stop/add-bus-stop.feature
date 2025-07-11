Feature: Crear nuevo paradero

  Scenario: El usuario inicia sesión y crea un nuevo paradero exitosamente
    Given el usuario inicia sesión con correo "erick@gmail.com" y contraseña "test"
    When accede a la sección de paraderos
    And hace clic en el botón "Nuevo Paradero"
    And completa el formulario de paradero con datos válidos
    And selecciona la región, provincia y distrito
    And envía el formulario
    Then debería ver el nuevo paradero creado correctamente
