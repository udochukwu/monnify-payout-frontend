import { useWalletBalance } from 'utils/actions'
import { formatAmount } from 'utils'
import Transfers from 'pages/transfer/pageComponents/Transfers'
import WalletBalanceIcon from 'components/icons/WalletIcon'

function Dashboard() {
  const { data } = useWalletBalance(
    import.meta.env.VITE_MONNIFY_WALLET_ACCOUNT_NUMBER
  )

  return (
    <div className="relative overflow-hidden p-3 pb-10" id="dashboardPage">
      <h1 className="mb-4 font-urbanist text-xl font-bold tracking-wide text-gray-700 dark:text-white sm:text-2xl">
        Dashboard
      </h1>

      <div className="mb-14 flex flex-col gap-4 font-urbanist sm:mb-14 sm:flex-row">
        <div className="flex w-full gap-3 rounded bg-white px-7 py-11 shadow-lg dark:bg-dark lg:w-1/2">
          <WalletBalanceIcon />
          <div>
            {' '}
            <p className="text-sm tracking-widest text-gray-500 dark:text-gray-400">
              Available Balance
            </p>
            <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
              {data?.responseBody?.availableBalance
                ? formatAmount(data?.responseBody?.availableBalance)
                : formatAmount(0)}
            </h4>
          </div>
        </div>
      </div>

      <Transfers />
    </div>
  )
}

export default Dashboard
