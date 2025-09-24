export default {
  title: 'elige la mejor solución para ti',
  titleContent: `Encuentra la solución que más se adapte a tus necesidades y aprovecha todas las funciones incluidas.`,
  cards: [
    {
      title: 'Essential Suite',
      content: 'Plataforma en la nube para almacenar y compartir información médica desde cualquier dispositivo. Ideal para profesionales del sector salud.',
      items: [
        {
          title: 'Gestión',
          items: [
            {
              label: 'PACS (Sistema de Archivo y Comunicación de Imágenes)',
              check: true,
              optional: false
            },
            {
              label: 'RIS (Sistema de Información Radiológica)',
              check: false,
              optional: false
            },
            {
              label: 'MWL (Lista de Trabajo de Modalidades)',
              check: false,
              optional: false
            }
          ]
        },
        {
          title: 'Diagnóstico',
          items: [
            {
              label: 'Visor DICOM MedDream™ certificado',
              check: false,
              optional: true
            },
            { label: 'Generador de reporte', check: false, optional: true }
          ]
        },
        {
          title: 'Visualización',
          items: [{ label: 'Visor DICOM Lite', check: true, optional: false }]
        },
        {
          title: 'Exportación',
          items: [
            {
              label: 'Mensajería instantánea WhatsApp™',
              check: false,
              optional: false
            },
            { label: 'Código QR', check: false, optional: false },
            { label: 'Mensajería SMS', check: false, optional: false },
            { label: 'Correo electrónico', check: true, optional: false }
          ]
        },
        {
          title: 'Compartir',
          items: [
            {
              label: 'Transferencia de archivos segura',
              check: true,
              optional: false
            },
            { label: 'Portal para paciente', check: false, optional: false }
          ]
        },
        {
          title: 'Publicación',
          items: [
            { label: 'Grabador (CD/DVD/Blu-ray™)', check: false, optional: true },
            { label: 'Almacenamiento USB', check: false, optional: true }
          ]
        },
        {
          title: 'Seguridad',
          items: [
            { label: 'Copias de seguridad Lite', check: true, optional: false },
            {
              label: 'Copias de seguridad automáticas',
              check: false,
              optional: true
            },
            { label: 'Recuperación de datos', check: false, optional: true }
          ]
        },
        {
          title: 'Soporte',
          items: [
            { label: 'Asistencia al cliente', check: true, optional: false },
            { label: 'Soporte técnico', check: true, optional: false }
          ]
        }
      ],
    },
    {
      title: 'Advanced Suite',
      content: 'Plataforma de gestión integral de información médica todo en uno. Perfecta para equipos que colaboran en el sector salud.',
      items: [
        {
          title: 'Gestión',
          items: [
            {
              label: 'PACS (Sistema de Archivo y Comunicación de Imágenes)',
              check: true,
              optional: false
            },
            {
              label: 'RIS (Sistema de Información Radiológica)',
              check: true,
              optional: false
            },
            {
              label: 'MWL (Lista de Trabajo de Modalidades)',
              check: true,
              optional: false
            }
          ]
        },
        {
          title: 'Diagnóstico',
          items: [
            {
              label: 'Visor DICOM MedDream™ certificado',
              check: true,
              optional: true
            },
            { label: 'Generador de reporte', check: true, optional: true }
          ]
        },
        {
          title: 'Visualización',
          items: [{ label: 'Visor DICOM Lite', check: true, optional: false }]
        },
        {
          title: 'Exportación',
          items: [
            {
              label: 'Mensajería instantánea WhatsApp™',
              check: true,
              optional: true
            },
            { label: 'Código QR', check: true, optional: false },
            { label: 'Mensajería SMS', check: true, optional: false },
            { label: 'Correo electrónico', check: true, optional: false }
          ]
        },
        {
          title: 'Compartir',
          items: [
            {
              label: 'Transferencia de archivos segura',
              check: true,
              optional: false
            },
            { label: 'Portal para paciente', check: true, optional: false }
          ]
        },
        {
          title: 'Publicación',
          items: [
            { label: 'Grabador (CD/DVD/Blu-ray™)', check: true, optional: true },
            { label: 'Almacenamiento USB', check: true, optional: true }
          ]
        },
        {
          title: 'Seguridad',
          items: [
            { label: 'Copias de seguridad Lite', check: true, optional: false },
            {
              label: 'Copias de seguridad automáticas',
              check: true,
              optional: true
            },
            { label: 'Recuperación de datos', check: true, optional: true }
          ]
        },
        {
          title: 'Soporte',
          items: [
            { label: 'Asistencia al cliente', check: true, optional: false },
            { label: 'Soporte técnico', check: true, optional: false }
          ]
        }
      ]
    }
  ]
}
