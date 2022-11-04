import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import { RootState } from "../index";
export const useMidgard = () => {
  const dispatch = useDispatch();
  const midgardState = useSelector((state: RootState) => state.blog);
  const getTxData = useCallback(
    (params: any) => dispatch(actions.fetchHomeMultidataAction(params)),
    [dispatch]
  );
  return {
    ...midgardState,
    getTxData,
  };
};
