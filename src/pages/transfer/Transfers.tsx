import { formatAmount } from 'utils'
import { useTransfers } from 'utils/actions'
import clsx from 'clsx'
import dayjs from 'dayjs'

const Transfers = () => {
  const { data, isLoading } = useTransfers({
    pageNo: 0,
    pageSize: 5
  })

  const statusColorMap = {
    EXPIRED: 'bg-red-200 text-red-500',
    SUCCESS: 'bg-green-200 text-green-500',
    PENDING_AUTHORIZATION: 'bg-orange-200 text-orange-500'
  }

  const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
    <tr
      key={index}
      className={
        index % 2 === 0
          ? 'bg-white dark:bg-dark'
          : 'bg-gray-50 dark:bg-[#23262B]'
      }
    >
      <td className="px-4 py-5">
        <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
      </td>
      <td className="px-4 py-5">
        <div className="mb-2 h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
      </td>
      <td className="px-4 py-5">
        <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
      </td>
      <td className="px-4 py-5">
        <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
      </td>
      <td className="px-4 py-5">
        <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
      </td>
    </tr>
  ))

  return (
    <>
      <h1 className="mb-3 font-urbanist text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
        Recent Transfers
      </h1>

      <div className="min-h-96 overflow-auto rounded-sm bg-white p-6 shadow-lg dark:bg-dark">
        {isLoading ? (
          <table className="w-full min-w-full whitespace-nowrap font-urbanist text-sm text-black dark:text-white">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#23262B]">
                <th className="px-4 py-5 text-start">Amount</th>
                <th className="px-4 py-5 text-start">Destination Account</th>
                <th className="px-4 py-5 text-start">Reference</th>
                <th className="px-4 py-5 text-start">Transfer Date</th>
                <th className="px-4 py-5 text-start">Status</th>
              </tr>
            </thead>
            <tbody className="font-semibold">{skeletonRows}</tbody>
          </table>
        ) : (
          data &&
          data?.requestSuccessful && (
            <table className="w-full min-w-full whitespace-nowrap font-urbanist text-sm text-black dark:text-white">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#23262B]">
                  <th className="px-4 py-5 text-start">Amount</th>
                  <th className="px-4 py-5 text-start">Destination Account</th>
                  <th className="px-4 py-5 text-start">Reference</th>
                  <th className="px-4 py-5 text-start">Transfer Date</th>
                  <th className="px-4 py-5 text-start">Status</th>
                </tr>
              </thead>
              <tbody className="font-semibold">
                {data?.responseBody.content.map((transfer, index) => (
                  <tr
                    key={transfer.reference}
                    className={
                      index % 2 === 0
                        ? 'bg-white dark:bg-dark'
                        : 'bg-gray-50 dark:bg-[#23262B]'
                    }
                  >
                    <td className="px-4 py-5 text-lg">
                      {formatAmount(transfer.amount)}
                    </td>
                    <td className="px-4 py-5">
                      <span className="block text-black dark:text-white">
                        {transfer.destinationAccountNumber}
                      </span>
                      <span className="block text-gray-500 dark:text-gray-400">
                        ({transfer.destinationBankName})
                      </span>
                    </td>
                    <td className="px-4 py-5 text-sm">{transfer.reference}</td>
                    <td className="px-4 py-5 text-gray-700 dark:text-gray-400">
                      {dayjs(transfer?.createdOn).format(
                        'MMMM D, YYYY hh:mm:ss'
                      )}
                    </td>
                    <td className="px-4 py-5">
                      <span
                        className={clsx(
                          'inline-block rounded-md px-3 py-1 text-xs leading-[22px] tracking-wider',
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
          )
        )}
      </div>
    </>
  )
}

export default Transfers
