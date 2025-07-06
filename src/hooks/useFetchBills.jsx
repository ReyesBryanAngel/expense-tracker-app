import { useQuery } from '@tanstack/react-query'
import { getBills } from '../services/bills';

const useFetchBills = () => {
  const { data, isLoading, refetch, isPending } = useQuery({
    queryKey: ['bills'],
    queryFn: async () => {
      return await getBills();
    },
    retry: 0,
  });

  return { bills: data?.data, refetch, isLoading, isPending };
};


export default useFetchBills