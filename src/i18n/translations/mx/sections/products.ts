import misc from '@/lib/images/misc'

export default {
  title: 'productos',
  titleContent: `Todo lo que necesitas para administrar y compartir de forma segura y sencilla imágenes médicas con pacientes y profesionales de la salud.`,
  items: [
    {
      icon: misc.product_ris,
      name: 'RIS Radiology Information System',
      content:
        'Programa citas, gestiona datos de pacientes, registra resultados y realiza seguimiento del flujo de trabajo de radiología.',
      slug: 'ris-radiology-information-system',
      cta: {
        url: 'https://perennity.io/es/nuestros-productos'
      }
    },
    {
      icon: misc.product_mwl,
      name: 'MWL Modality Worklist',
      content:
        'Automatiza y optimiza el flujo de trabajo entre el RIS y las modalidades, reduce errores manuales en la identificación de estudios.',
      slug: 'mwl-modality-worklist',
      cta: {
        url: 'https://perennity.io/es/nuestros-productos'
      }
    },
    {
      icon: misc.product_portal,
      name: 'Portal para pacientes',
      content:
        'Entrega de estudios, reportes y resultados de laboratorio por mensajería SMS, correo, WhatsApp y código QR.',
      slug: 'portal-para-pacientes',
      cta: {
        url: 'https://perennity.io/es/nuestros-productos'
      }
    },
    {
      icon: misc.product_respaldo,
      name: 'Respaldo y recuperación',
      content:
        'Respaldo VNA DICOM personalizable y automático que además mantiene en operación su sistema en situaciones críticas.',
      slug: 'respaldo-y-recuperacion',
      cta: {
        url: 'https://perennity.io/es/nuestros-productos'
      }
    },
    {
      icon: misc.product_quemador,
      name: 'Quemador de medios',
      content:
        'Creación precisa y eficiente de CD, DVD o archivos en memoria USB desde cualquier PACS.',
      slug: 'quemador-de-medios',
      cta: {
        url: 'https://perennity.io/es/nuestros-productos'
      }
    },
    {
      icon: misc.product_servidores,
      name: 'Servidores y estaciones de trabajo',
      content:
        'Servidores y estaciones de trabajo compactos y de bajo consumo energético.',
      slug: 'servidores-y-estaciones-de-trabajo',
      cta: {
        url: 'https://perennity.io/es/nuestros-productos'
      }
    }
  ]
}
