import { useAppSelector } from '../../app/hooks';

export const useHeader = () => {
  const state = useAppSelector((state) => state.slice);

  return { state };
};
