window.onload = function () {
  window.ui = SwaggerUIBundle({
    url: '/api/swagger',
    dom_id: '#swagger-ui',
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: 'StandaloneLayout',
  });
};
