type TransfersProps = {
  text?: string
}

const Transfers = ({ text }: TransfersProps) => {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Transfers Page
      </h1>
      <p>{text && text}</p>
    </>
  )
}

export default Transfers
