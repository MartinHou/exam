import { useCallback } from "react"
import { useCustomFetch } from "src/hooks/useCustomFetch"
import { RequestByEmployeeParams, SetTransactionApprovalParams} from "src/utils/types"
import { TransactionPane } from "./TransactionPane"
import { SetTransactionApprovalFunction, TransactionsComponent } from "./types"

export const Transactions: TransactionsComponent = ({ transactions }) => {
  const { fetchWithoutCache, loading, clearCacheByParams, clearCacheByEndpoint } = useCustomFetch()

  const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
    async ({ transaction, newValue }) => {
      await fetchWithoutCache<void, SetTransactionApprovalParams>("setTransactionApproval", {
        transactionId: transaction.id,
        value: newValue,
      })
      clearCacheByParams<RequestByEmployeeParams>('transactionsByEmployee',{
        employeeId: transaction.employee.id,
      })
      clearCacheByEndpoint(['paginatedTransactions'])
    },
    [fetchWithoutCache,clearCacheByEndpoint,clearCacheByParams]
  )

  if (transactions === null) {
    return <div className="RampLoading--container">Loading...</div>
  }

  return (
    <div data-testid="transaction-container">
      {transactions.map((transaction) => (
        <TransactionPane
          key={transaction.id}
          transaction={transaction}
          loading={loading}
          setTransactionApproval={setTransactionApproval}
        />
      ))}
    </div>
  )
}
