/** Datos Speech — importados desde vendedores-config.js */

export const SPEECH = {
  title: 'Tu guía de ventas',
  titleBefore: 'Tu guía de ',
  titleAccent: 'ventas',
  subtitle:
    'Scripts y marcos listos para que sepas qué vendes, cómo presentarlo y cómo cerrar. Adáptalos a tu estilo.',
  copyButtonLabel: 'Copiar script',
  copyButtonCopied: '¡Copiado!',
  copyFeedbackMs: 2000,
  tabs: [
    {
      id: 'entiende',
      label: 'Entiende lo que vendes',
      categories: [
        {
          id: 'web',
          name: 'Páginas y Presencia Digital',
          queEs:
            'Construimos la vitrina digital del negocio — desde una página simple de venta hasta una tienda online completa. Diseñada para que quien llegue, actúe.',
          paraQuien:
            'Cualquier negocio que no tiene presencia online o tiene una página que no convierte.',
          problema:
            'El negocio existe pero nadie lo encuentra, o lo encuentra y no compra porque no genera confianza.',
          analogia:
            'Es como abrir un local en la calle más transitada de internet — bien diseñado, con los precios claros y la puerta abierta 24/7.',
        },
        {
          id: 'auto',
          name: 'Automatización',
          queEs:
            'Configuramos sistemas que responden, califican y hacen seguimiento por WhatsApp e Instagram sin que nadie tenga que estar pegado al celular.',
          paraQuien:
            'Negocios que reciben mensajes todo el día y no pueden responder a tiempo, o que pierden leads por falta de seguimiento.',
          problema:
            'Clientes que escriben y nunca reciben respuesta. Leads que se enfrían porque nadie hace seguimiento.',
          analogia:
            'Es como tener un vendedor que trabaja 24/7, nunca se cansa, nunca olvida hacer seguimiento y nunca pide aumento.',
        },
        {
          id: 'ia',
          name: 'Inteligencia Artificial',
          queEs:
            'Integramos IA directamente en el negocio — en la web, en WhatsApp o en la operación. Atiende, califica y cierra sin intervención humana.',
          paraQuien:
            'Negocios con alto volumen de consultas repetitivas que consumen tiempo del equipo sin generar valor.',
          problema:
            'El equipo pierde horas respondiendo siempre las mismas preguntas en vez de enfocarse en cerrar ventas.',
          analogia:
            'Es como contratar al mejor empleado del mundo — nunca duerme, nunca se equivoca en el protocolo, atiende a 100 personas al mismo tiempo y no cobra salario.',
        },
        {
          id: 'voz',
          name: 'Bots de Voz',
          queEs:
            'Agentes de voz que llaman, recuerdan citas, califican prospectos y atienden llamadas fuera de horario — sin intervención humana.',
          paraQuien:
            'Negocios donde el teléfono es el canal principal — clínicas, consultorios, servicios locales, inmobiliarias.',
          problema:
            'Llamadas perdidas fuera de horario, pacientes que no llegan a su cita, prospectos que nunca reciben seguimiento por teléfono.',
          analogia:
            'Es como tener una recepcionista que trabaja de noche, los fines de semana y nunca deja una llamada sin responder.',
        },
        {
          id: 'sistemas',
          name: 'Sistemas y Plataformas',
          queEs:
            'Construimos la infraestructura digital del negocio — CRM, dashboards, portales de clientes, comunidades y plataformas de membresía.',
          paraQuien:
            'Negocios que ya venden bien pero operan en caos — sin visibilidad de sus números, sin control de sus clientes, sin procesos claros.',
          problema:
            'El dueño no sabe cuánto vendió, cuántos clientes tiene activos, qué está funcionando ni qué no.',
          analogia:
            'Es como pasarle al negocio el sistema nervioso central que le faltaba — todo conectado, todo visible, todo bajo control.',
        },
        {
          id: 'apps',
          name: 'Apps Móviles',
          queEs:
            'Desarrollamos apps con la marca del cliente para iOS y Android — con membresías, contenido exclusivo y acceso premium.',
          paraQuien:
            'Negocios que quieren llevar su marca al celular de sus clientes y crear una experiencia exclusiva.',
          problema:
            'El negocio depende de plataformas de terceros (Instagram, WhatsApp) que pueden cambiar las reglas en cualquier momento.',
          analogia:
            'Es como tener tu propio canal directo con tus clientes — sin algoritmos, sin competencia, sin intermediarios.',
        },
        {
          id: 'software',
          name: 'Software Personalizado',
          queEs:
            'Desarrollamos herramientas o plataformas completamente a medida — exactamente como el negocio lo necesita.',
          paraQuien:
            'Negocios con procesos únicos que ninguna herramienta del mercado resuelve bien.',
          problema:
            'El negocio pierde tiempo y dinero adaptándose a herramientas genéricas que no encajan con su operación.',
          analogia:
            'Es como mandarle a hacer un traje a medida en vez de comprar uno en una tienda — queda perfecto porque fue diseñado específicamente para ese negocio.',
        },
      ],
    },
    {
      id: 'presentar',
      label: 'Cómo presentarlo',
      scripts: [
        {
          id: 'frio-general',
          title: 'Apertura en frío — General',
          context:
            'Úsalo en el primer contacto por WhatsApp, DM de Instagram o en una llamada de prospección. El objetivo no es vender — es abrir la conversación.',
          script:
            'Hola [nombre], te escribo porque trabajo con negocios como el tuyo ayudándoles a construir su sistema digital — páginas, automatizaciones e inteligencia artificial. No es consultoría, es ejecución: entregamos todo construido y funcionando. He visto negocios en tu mismo sector duplicar sus leads en el primer mes. ¿Tienes 10 minutos esta semana para contarte cómo?',
          notes: [
            'No menciones precios en el primer contacto',
            'Si preguntan cuánto cuesta, responde: "Depende de lo que necesites — por eso quiero entender tu caso primero"',
            'Si no responden en 48h, haz seguimiento: "¿Pudiste ver mi mensaje? Solo quería saber si te interesa"',
          ],
        },
        {
          id: 'speech-web',
          title: 'Speech Páginas y Presencia Digital',
          context: 'Úsalo cuando el prospecto no tiene página web o tiene una que no convierte.',
          script:
            '¿Cuántos clientes potenciales te están buscando en Google ahora mismo y no te encuentran? O peor — te encuentran pero lo que ven no genera confianza y se van. Nosotros construimos páginas diseñadas para convertir visitas en clientes desde el primer clic. No es solo diseño bonito — es una máquina de ventas que trabaja mientras tú duermes. ¿Te gustaría ver ejemplos de lo que hemos hecho para negocios como el tuyo?',
        },
        {
          id: 'speech-auto',
          title: 'Speech Automatización',
          context:
            'Úsalo con negocios que reciben muchos mensajes o que pierden leads por falta de respuesta rápida.',
          script:
            'Pregunta rápida — ¿cuántos mensajes de WhatsApp o Instagram recibe tu negocio al día que no pueden responder a tiempo? Cada mensaje sin respuesta es un cliente que se va a la competencia. Nosotros configuramos un sistema que responde en segundos, califica al prospecto y te entrega solo los que están listos para comprar. Tu equipo deja de perder tiempo en mensajes y se enfoca en cerrar. ¿Cuántos leads crees que estás perdiendo ahora mismo por tiempo de respuesta?',
        },
        {
          id: 'speech-ia',
          title: 'Speech Inteligencia Artificial',
          context:
            'Úsalo con negocios que tienen equipo respondiendo siempre las mismas preguntas o con alto volumen de atención al cliente.',
          script:
            '¿Cuántas horas al día pierde tu equipo respondiendo las mismas preguntas — horarios, precios, disponibilidad? Eso es tiempo que podría estar cerrando ventas. Nosotros integramos inteligencia artificial directamente en tu negocio — atiende a tus clientes 24/7, responde todo lo que necesitan saber y los califica antes de pasártelos. Es como contratar a tu mejor vendedor, que nunca se cansa y nunca pide vacaciones. ¿Te interesa ver cómo funciona en vivo?',
        },
        {
          id: 'speech-voz',
          title: 'Speech Bots de Voz',
          context:
            'Úsalo con clínicas, consultorios, inmobiliarias o cualquier negocio donde el teléfono sea el canal principal.',
          script:
            '¿Cuántas llamadas pierde tu negocio fuera de horario o cuando la línea está ocupada? Cada llamada perdida es un cliente que llamó a tu competencia. Nosotros instalamos un agente de voz que atiende las 24 horas — responde preguntas, agenda citas y califica prospectos mientras tu equipo descansa. El lunes por la mañana llegas y tienes la agenda llena. ¿Cuántas citas crees que estás perdiendo cada semana por llamadas sin responder?',
        },
        {
          id: 'speech-sistemas',
          title: 'Speech Sistemas y Plataformas',
          context: 'Úsalo con dueños de negocio que operan sin visibilidad ni control de sus números.',
          script:
            'Pregunta directa — ¿sabes exactamente cuánto vendiste este mes, cuáles son tus clientes más valiosos y qué parte de tu operación está fallando? La mayoría de dueños de negocio manejan todo de memoria o en hojas de Excel. Nosotros construimos el sistema nervioso de tu negocio — un dashboard que te muestra todo en tiempo real, un CRM que gestiona cada cliente y procesos automatizados que eliminan el caos operativo. ¿Quieres tomar decisiones con datos o seguir tomándolas con intuición?',
        },
        {
          id: 'speech-apps',
          title: 'Speech Apps Móviles',
          context: 'Úsalo con negocios que tienen comunidad o base de clientes fidelizados.',
          script:
            '¿Tu negocio depende de que Instagram o WhatsApp no cambien sus reglas mañana? Cada vez que Meta actualiza su algoritmo, los negocios que no tienen canal propio pierden alcance. Nosotros construimos tu propia app con tu marca — tus clientes la descargan, acceden a contenido exclusivo y tú tienes comunicación directa con ellos sin depender de nadie. ¿Cuánto vale para ti tener a tus mejores clientes en un canal que nadie te puede quitar?',
        },
      ],
    },
    {
      id: 'cerrar',
      label: 'Cómo cerrar',
      scripts: [
        {
          id: 'kit-entrada',
          title: 'Speech Kit Entrada',
          context:
            'Para prospectos con presupuesto limitado o que quieren arrancar con algo probado antes de invertir más.',
          script:
            'Para arrancar sin riesgo, tenemos el Kit Entrada — una landing page profesional más un bot de WhatsApp que captura y responde leads automáticamente. Es la base que necesita cualquier negocio para tener presencia digital y no perder más clientes por falta de respuesta. La inversión es [tu precio]. Con dos o tres clientes nuevos que lleguen por la página ya se paga solo. ¿Arrancamos con esto y en 30 días vemos los resultados?',
        },
        {
          id: 'sistema-completo',
          title: 'Speech Sistema Completo ⭐',
          featured: true,
          context: 'El combo estrella — úsalo como primera propuesta para la mayoría de prospectos.',
          script:
            'El paquete que más resultados está generando ahora mismo es el Sistema Completo — landing page con tus productos y precios, bot de WhatsApp y bot de Instagram funcionando los tres al mismo tiempo. Desde el día 1 tienes tres canales captando y respondiendo leads sin que tengas que estar pendiente. Los negocios que lo implementan ven resultados en las primeras dos semanas. La inversión es [tu precio]. ¿Le entramos?',
        },
        {
          id: 'stack-ia',
          title: 'Speech Stack IA',
          context:
            'Para prospectos que ya tienen web y redes pero quieren automatización inteligente encima.',
          script:
            'Ya tienes la presencia digital — ahora el siguiente nivel es poner inteligencia artificial a trabajar. El Stack IA incluye un chatbot en tu web que atiende clientes 24/7, un agente de ventas por WhatsApp que califica y cierra solo, y un analizador de métricas que te dice exactamente qué está funcionando en tu negocio. No tienes que reconstruir nada — se instala sobre lo que ya tienes. La inversión es [tu precio]. ¿Cuándo quieres que lo activemos?',
        },
        {
          id: 'clinicas',
          title: 'Speech Sistema Clínicas y Consultorios',
          context:
            'Para médicos, odontólogos, psicólogos, estéticas y cualquier consultorio.',
          script:
            'Para clínicas y consultorios tenemos un sistema completo — página web con tus especialidades, bot de WhatsApp que agenda citas automáticamente, calendario online con confirmaciones, y un agente de voz que llama al paciente para recordarle su cita el día antes. Se acabaron los no-shows y las llamadas perdidas fuera de horario. La inversión es [tu precio]. ¿Cuántas citas perdidas por semana justifican esta inversión?',
        },
        {
          id: 'restaurantes',
          title: 'Speech Sistema Restaurantes y Servicios Locales',
          context:
            'Para restaurantes, peluquerías, spas, talleres y negocios locales.',
          script:
            'Para negocios como el tuyo donde los mensajes no paran, tenemos el sistema perfecto — página web con tu menú o servicios, bot de WhatsApp que toma pedidos y reservas automáticamente, bot de Instagram para los que te escriben por ahí, y sistema de reservas online. El negocio sigue funcionando aunque no estés pendiente del celular. La inversión es [tu precio]. ¿Cuánto tiempo al día pierdes respondiendo mensajes que un bot podría manejar solo?',
        },
        {
          id: 'coaches',
          title: 'Speech Sistema Coaches e Infoproductores',
          context:
            'Para coaches, mentores, consultores y creadores de cursos online.',
          script:
            'Para coaches e infoproductores que quieren escalar sin trabajar más horas, tenemos el combo completo — landing page de tus programas, automatización de mensajería, plataforma para entregar tu curso o membresía y guión de video de ventas para tu lanzamiento. Todo lo que necesitas para vender mientras duermes. La inversión es [tu precio]. ¿Cuándo es tu próximo lanzamiento?',
        },
        {
          id: 'hoteleria',
          title: 'Speech Sistema Hotelería y Glamping',
          context:
            'Para hoteles boutique, glamping, fincas y alojamientos turísticos.',
          script:
            'Para alojamientos turísticos tenemos un sistema que trabaja 24/7 — página con tus experiencias y precios, bot de WhatsApp que responde disponibilidad y toma reservas, calendario online con confirmaciones automáticas y recordatorios al huésped antes de su llegada. Más reservas directas sin pagar comisión a plataformas de terceros. La inversión es [tu precio]. ¿Cuántas reservas directas recibes ahora vs las que llegan por Booking o Airbnb?',
        },
        {
          id: 'ecosistema',
          title: 'Speech Ecosistema Digital',
          context:
            'Para negocios que quieren escalar en serio y están listos para una inversión mayor.',
          script:
            'Para negocios que quieren el sistema completo — landing, automatización total de mensajería, inteligencia artificial en web y WhatsApp, y CRM para gestionar cada cliente — tenemos el Ecosistema Digital. Es básicamente el equipo de ventas y atención que necesitarías contratar, pero sin nómina, sin vacaciones y trabajando 24/7. La inversión es [tu precio]. Los negocios que lo implementan dejan de operar manualmente en menos de 30 días. ¿Agendamos una llamada para mostrarte todo en detalle?',
        },
      ],
      objections: {
        title: 'Manejo de objeciones',
        context:
          'Respuestas listas para las objeciones más comunes. Adapta el tono a la conversación.',
        items: [
          {
            id: 'caro',
            objection: 'Está muy caro',
            script:
              'Entiendo. Pero pensémoslo diferente — ¿cuánto vale un cliente nuevo para tu negocio? Si el sistema te trae 3 clientes nuevos en el primer mes, ¿ya se pagó? La mayoría de negocios que implementan esto recuperan la inversión en las primeras semanas. La pregunta real no es si es caro — es cuánto te está costando NO tenerlo.',
          },
          {
            id: 'pagina',
            objection: 'Ya tengo página web',
            script:
              'Perfecto. La pregunta es — ¿esa página te está trayendo clientes ahora mismo o solo existe? Hay una diferencia enorme entre tener una página y tener un sistema que convierte. ¿Cuántos leads te llegaron el mes pasado a través de tu página?',
          },
          {
            id: 'pensar',
            objection: 'Necesito pensarlo',
            script:
              'Claro, tiene todo el sentido. ¿Qué parte te genera más duda — el costo, lo que incluye o cómo funciona el proceso? Con eso te doy información más precisa y la decisión se vuelve fácil.',
          },
          {
            id: 'quien',
            objection: '¿Quién hace el trabajo?',
            script:
              'Hay un equipo técnico especializado que ejecuta todo. Yo coordino el proceso contigo — tú me das la información del negocio y yo te entrego todo construido y funcionando. No tienes que hablar con desarrolladores ni diseñadores.',
          },
          {
            id: 'tiempo',
            objection: '¿Cuánto tiempo tarda?',
            script:
              'Depende del paquete — los combos de entrada están listos en menos de una semana. Los ecosistemas completos entre 2 y 4 semanas. Mientras más rápido arrancamos, más rápido el negocio empieza a ver resultados.',
          },
          {
            id: 'funcione',
            objection: 'No sé si funcione para mi negocio',
            script:
              'Eso es exactamente lo que necesito entender yo también. Cuéntame cómo funciona tu negocio ahora — cómo consigues clientes, cómo los atiendes y cuál es el mayor cuello de botella. Con eso te digo exactamente qué necesitas y qué resultado puedes esperar.',
          },
        ],
      },
    },
  ],
};
