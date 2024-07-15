import { formatAmount } from 'utils'
import { useTransfers } from 'utils/actions'
import clsx from 'clsx'
import dayjs from 'dayjs'

const Transfers = () => {
  const { data } = useTransfers({
    pageNo: 0,
    pageSize: 5
  })

  const statusColorMap = {
    EXPIRED: 'bg-red-100 text-red-400',
    SUCCESS: 'bg-green-100 text-green-400',
    PENDING_AUTHORIZATION: 'bg-orange-100 text-orange-400'
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-3 font-urbanist">
        Recent Transfers
      </h1>

      <div className="overflow-x-auto p-6  rounded-sm bg-white min-h-96 overflow-y-auto shadow-lg ">
        {data && data.requestSuccessful && (
          <table className="min-w-full w-full whitespace-nowrap text-sm font-urbanist">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-5 text-start">Amount</th>
                <th className="px-4 py-5 text-start">Destination Account</th>
                <th className="px-4 py-5 text-start">Reference</th>
                <th className="px-4 py-5 text-start">Transfer Date</th>
                <th className="px-4 py-5 text-start">Status</th>
              </tr>
            </thead>
            <tbody className="font-semibold">
              {data.responseBody.content.map((transfer, index) => (
                <tr
                  key={transfer.reference}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-4 py-5 text-lg">
                    {formatAmount(transfer.amount)}
                  </td>
                  <td className="px-4 py-5">
                    <span className="block">
                      {transfer.destinationAccountNumber}
                    </span>
                    <span className="block ">
                      ({transfer.destinationBankName})
                    </span>
                  </td>
                  <td className="px-4 py-5 text-sm">{transfer.reference}</td>
                  <td className="px-4 py-5 text-gray-700 ">
                    {dayjs(transfer?.createdOn).format('MMMM D, YYYY hh:mm:ss')}
                  </td>
                  <td className="px-4 py-5">
                    <span
                      className={clsx(
                        'inline-block rounded-md px-3 py-1 text-xs leading-[22px]',
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
        )}
      </div>
    </>
  )
}

export default Transfers
