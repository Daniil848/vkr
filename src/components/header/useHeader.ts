import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { openLogIn, openSignIn } from '../../app/mainSlice';

export const useHeader = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  const handleOpenSignIn = () => {
    dispatch(openSignIn());
  };

  const handleOpenLogIn = () => {
    dispatch(openLogIn());
  };

  return { state, dispatch, handleOpenLogIn, handleOpenSignIn };
};
