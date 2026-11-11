export const routes = [
  { path: '/', label: 'Inicio', title: 'Tus métricas. Tu crecimiento. Tu potencial.', description: 'Stryvexa conecta creadores y marcas para organizar campañas y consultar métricas autorizadas. Descubre la plataforma y sus demostraciones visuales.' },
  { path: '/platform', label: 'Plataforma', title: 'Plataforma de métricas, videos y campañas', description: 'Conoce el perfil de creador, las estadísticas, los videos y las campañas de Stryvexa. Demostraciones con datos ficticios claramente identificados.' },
  { path: '/creators', label: 'Para creadores', title: 'Métricas y colaboraciones para creadores', description: 'Organiza la información de tus colaboraciones, consulta tus métricas disponibles y conoce cómo autorizar tu cuenta en Stryvexa.' },
  { path: '/brands', label: 'Para marcas y agencias', title: 'Campañas para marcas y agencias', description: 'Conoce el espacio de marca de Stryvexa para organizar campañas y consultar información de colaboraciones autorizadas.' },
  { path: '/how-it-works', label: 'Cómo funciona', title: 'Cómo conectar tu cuenta y consultar tus métricas', description: 'Conoce el recorrido de Stryvexa: conectar una cuenta, autorizar los permisos y consultar las estadísticas disponibles.' },
  { path: '/faq', label: 'Preguntas frecuentes', title: 'Preguntas sobre acceso, TikTok y privacidad', description: 'Respuestas sobre Stryvexa, autorización de TikTok, métricas, campañas, privacidad y disponibilidad de acceso.' },
  { path: '/contact', label: 'Contacto', title: 'Contacto y soporte', description: 'Contacta con Stryvexa para información de producto, soporte, colaboraciones o solicitudes sobre tus datos.' },
  { path: '/privacy', label: 'Privacidad', title: 'Política de privacidad', description: 'Consulta la política de privacidad de Stryvexa: información recopilada, usos, seguridad y eliminación de datos.' },
  { path: '/terms', label: 'Términos', title: 'Términos de servicio', description: 'Consulta las condiciones de uso de Stryvexa, cuentas, campañas, plataformas externas y responsabilidades.' },
] as const;

export type PublicRoute = (typeof routes)[number]['path'];
