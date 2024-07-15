import Avatar from 'components/Avatar'
import logo from 'assets/logo.svg'
import Template from 'components/Template'
import { useWalletBalance } from 'utils/actions'
import { formatAmount } from 'utils'
import Transfers from 'pages/transfer/Transfers'

function Dashboard() {
  const { data } = useWalletBalance(
    import.meta.env.VITE_MONNIFY_WALLET_ACCOUNT_NUMBER
  )

  return (
    <div className="relative overflow-hidden p-3 pb-10">
      <h1 className="text-2xl font-bold tracking-wide text-gray-700 sm:text-2xl mb-4 font-urbanist">
        Dashboard
      </h1>

      <div className="flex gap-4 font-urbanist flex-col sm:flex-row mb-4 sm:mb-14">
        <div className="w-full bg-white dark:bg-darkblack-600 px-7 py-11 rounded shadow-lg flex gap-3 lg:w-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
          >
            <circle
              cx="28.6428"
              cy="28.9905"
              r="28.6428"
              fill="#E3F1EC"
            ></circle>
            <path
              d="M27.8519 11.4883L12.7349 19.4446V22.6272H42.969V19.4446L27.8519 11.4883ZM12.7349 44.9049H42.969V40.1311H12.7349V44.9049Z"
              fill="url(#paint0_linear_22466_91730)"
            ></path>
            <rect
              x="15.9126"
              y="25.8047"
              width="5.09206"
              height="11.4571"
              fill="url(#paint1_linear_22466_91730)"
            ></rect>
            <rect
              x="24.8237"
              y="25.8047"
              width="5.09206"
              height="11.4571"
              fill="url(#paint2_linear_22466_91730)"
            ></rect>
            <rect
              x="33.7349"
              y="25.8047"
              width="5.09206"
              height="11.4571"
              fill="url(#paint3_linear_22466_91730)"
            ></rect>
            <defs>
              <linearGradient
                id="paint0_linear_22466_91730"
                x1="22.5"
                y1="14.8516"
                x2="43"
                y2="45.3516"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#00B8C2"></stop>
                <stop offset="1" stop-color="#005F7D"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_22466_91730"
                x1="18.2931"
                y1="20.7787"
                x2="27.8298"
                y2="27.5268"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F0AA22"></stop>
                <stop offset="1" stop-color="#F05822"></stop>
              </linearGradient>
              <linearGradient
                id="paint2_linear_22466_91730"
                x1="27.2042"
                y1="20.7787"
                x2="36.7409"
                y2="27.5268"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F0AA22"></stop>
                <stop offset="1" stop-color="#F05822"></stop>
              </linearGradient>
              <linearGradient
                id="paint3_linear_22466_91730"
                x1="36.1154"
                y1="20.7787"
                x2="45.6521"
                y2="27.5268"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F0AA22"></stop>
                <stop offset="1" stop-color="#F05822"></stop>
              </linearGradient>
            </defs>
          </svg>
          <div>
            {' '}
            <p className="text-gray-500 tracking-widest text-sm">
              Available Balance
            </p>
            <h4 className="font-bold text-2xl">
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
