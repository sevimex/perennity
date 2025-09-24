import { FloatingWhatsApp } from 'react-floating-whatsapp'

interface Props {
  i18n: Record<string, string>
  company: string
  phone: string
  message: string
  avatar: string
}

const WhatsAppWidget: React.FC<Props> = ({
  i18n,
  company,
  phone,
  message,
  avatar
}) => (
  <FloatingWhatsApp
    phoneNumber={phone}
    accountName={company}
    chatMessage={message}
    avatar={avatar}
    statusMessage={i18n.statusMessage}
    placeholder={i18n.placeholder}
    allowClickAway={true}
  />
)

export default WhatsAppWidget
