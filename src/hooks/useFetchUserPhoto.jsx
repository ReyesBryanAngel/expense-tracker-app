import { useQuery } from '@tanstack/react-query';
import { getPhoto } from '../api';

const useFetchUserPhoto = () => {
  const { data, isLoading, refetch, isPending } = useQuery({
    queryKey: ['userPhoto'],
    queryFn: getPhoto,
    retry: 0,
  });

  return { userPhoto: data, refetch, isLoading, isPending };
};

export default useFetchUserPhoto;
