Feature: Registro de usuario

  Scenario: El usuario se registra correctamente
    Given el usuario está en la página de registro
    When completa todos los campos requeridos con datos válidos
    And selecciona el rol "Gestor de empresa de transporte"
    And hace clic en el botón de registro
    Then debería ver un mensaje de bienvenida
