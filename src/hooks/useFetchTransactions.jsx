import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '../api';

const useFetchTransactions = () => {
  const { data, isLoading, refetch, isPending } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      return await getTransactions();
    },
    retry: 0,
  });

  return { transactions: data?.data, refetch, isLoading, isPending };
};


export default useFetchTransactions