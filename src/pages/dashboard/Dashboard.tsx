import Avatar from 'components/Avatar'
import logo from 'assets/logo.svg'
import Template from 'components/Template'
import { useWalletBalance } from 'utils/actions'
import { formatAmount } from 'utils'

function Dashboard() {
  const { data } = useWalletBalance(
    import.meta.env.VITE_MONNIFY_WALLET_ACCOUNT_NUMBER
  )

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <Template text="Welcome!" />
          </div>
          <div className="mt-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">Wallet Balance</h2>
              <div className="mb-2">
                <p>
                  Available Balance:{' '}
                  {data?.responseBody?.availableBalance
                    ? formatAmount(data?.responseBody?.availableBalance)
                    : 'N/A'}
                </p>
              </div>
              <div className="mb-2">
                <p>
                  Ledger Balance:{' '}
                  {data?.responseBody?.ledgerBalance
                    ? formatAmount(data?.responseBody?.ledgerBalance)
                    : 'N/A'}
                </p>
              </div>

      
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
