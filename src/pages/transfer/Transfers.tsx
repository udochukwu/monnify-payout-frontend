import { formatAmount } from 'utils'
import { useTransfers } from 'utils/actions'
import clsx from 'clsx'
import dayjs from 'dayjs'

type TransfersProps = {
  text?: string
}

const Transfers = ({ text }: TransfersProps) => {
  const { data } = useTransfers({
    pageNo: 0,
    pageSize: 10
  })

  const statusColorMap = {
    EXPIRED: 'bg-red-50 text-red-400',
    SUCCESS: 'bg-green-50 text-green-400',
    PENDING_AUTHORIZATION:  'bg-orange-50 text-orange-400',
  }

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Recent Transfers 
      </h1>
      <p>{text && text}</p>
      {data && data.requestSuccessful && (
        <div className="mt-8 overflow-x-auto p-6 shadow-sm border border-gray-200 rounded-sm bg-white">
          <table className="min-w-full  w-full whitespace-nowrap text-sm">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-4 py-5 border-b text-start">Amount</th>
                <th className="px-4 py-5 border-b  text-start">Created On</th>
                <th className="px-4 py-5 border-b text-start">
                  Destination Account
                </th>
                <th className="px-4 py-5 border-b text-start">Reference</th>
                <th className="px-4 py-5 border-b text-start">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.responseBody.content.map((transfer) => (
                <tr key={transfer.reference} className="hover:bg-blue-50">
                  <td className="px-4 py-5 border-b">
                    {formatAmount(transfer.amount)}
                  </td>
                  <td className="px-4 py-5 border-b">
                    {dayjs(transfer?.createdOn).format('MMMM D, YYYY hh:mm:ss')}
                  </td>
                  <td className="px-4 py-5 border-b">
                    {transfer.destinationAccountNumber}
                  </td>
                  <td className="px-4 py-5 border-b">{transfer.reference}</td>
                  <td className="px-4 py-5 border-b">
                    <span
                      className={clsx(
                        'inline-block rounded-md px-4 py-1.5 text-xs  leading-[22px]',
                        statusColorMap[transfer.status]
                      )}
                    >
                      {transfer.status}
                    </span>
                  </td>
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
