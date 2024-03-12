import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { openLogIn, openSignIn } from '../../app/articlesSlice';

export const useHeader = () => {
  const articlesState = useAppSelector((state) => state.articlesSlice);
  const dispatch = useAppDispatch();

  const handleOpenSignIn = () => {
    dispatch(openSignIn());
  };

  const handleOpenLogIn = () => {
    dispatch(openLogIn());
  };

  return { articlesState, dispatch, handleOpenLogIn, handleOpenSignIn };
};
