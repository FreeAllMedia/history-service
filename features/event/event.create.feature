Feature: create a new event

  Scenario: a create event request is received; return status code "ok"
    When a valid create event request is received
    Then respond with a blank body
      And http status code "ok"

  # Scenario: a create event request is received without designating json as the content type; return status code "bad request"
  #   When a create event request is received without designating json as the content type
  #   Then respond with a blank body
  #     And http status code "bad request"
  #
  # Scenario: a create event request is received, but the body is not valid json; return status code "bad request"
  #   When a create event request is received with invalid json in the body
  #   Then respond with a blank body
  #     And http status code "bad request"
