import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { openLogIn, openSignIn } from '../../app/usersSlice';

export const useHeader = () => {
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const usersState = useAppSelector((state) => state.usersSlice);
  const dispatch = useAppDispatch();

  const handleOpenSignIn = () => {
    dispatch(openSignIn());
  };

  const handleOpenLogIn = () => {
    dispatch(openLogIn());
  };

  return { usersState, dispatch, handleOpenLogIn, handleOpenSignIn };
};
