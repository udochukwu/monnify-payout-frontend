type TransferProps = {
  text?: string
}

const Transfer = ({ text }: TransferProps) => {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Transfer Page
      </h1>
      <p>{text && text}</p>
    </>
  )
}

export default Transfer
