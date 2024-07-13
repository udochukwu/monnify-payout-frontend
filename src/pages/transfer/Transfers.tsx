import { formatAmount } from 'utils'
import { useTransfers } from 'utils/actions'

type TransfersProps = {
  text?: string
}

const Transfers = ({ text }: TransfersProps) => {
  const { data } = useTransfers({
    pageNo: 0,
    pageSize: 10
  })

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Transfers Page
      </h1>
      <p>{text && text}</p>
      {data && data.requestSuccessful && (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Amount</th>
                <th className="px-4 py-2 border-b">Created On</th>
                <th className="px-4 py-2 border-b">Destination Account</th>
                <th className="px-4 py-2 border-b">Reference</th>
                <th className="px-4 py-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.responseBody.content.map((transfer) => (
                <tr key={transfer.reference}>
                  <td className="px-4 py-2 border-b">
                    {formatAmount(transfer.amount)}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(transfer.createdOn).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {transfer.destinationAccountNumber}
                  </td>
                  <td className="px-4 py-2 border-b">{transfer.reference}</td>
                  <td className="px-4 py-2 border-b">{transfer.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Transfers
