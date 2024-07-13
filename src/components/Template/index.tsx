type TemplateProps = {
  text?: string
}

const Template = ({ text }: TemplateProps) => {
  return (
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
      {text ? text : 'Default template text'}
    </h1>
  )
}

export default Template
