import useSWR from "swr";
import { useContext } from "react";
import * as api from "@/lib/api-client/apiClient";
import { postUserData } from "@/lib/api-client/apiClient";
import { UserData } from "@/lib/types/types";
import { AuthContext } from "@/pages/_app";

export const useUserData = (): UseUserDataResponse => {
  const { state } = useContext(AuthContext);
  const { data, error, mutate } = useSWR<UserData | undefined>(state.user?.id || null, api.getUserData);

  const update = async (newUserData: UserData | undefined): Promise<void> => {
    if (newUserData) {
      mutate(newUserData, false);
      await postUserData(newUserData);
      mutate(newUserData);
    }
  };

  return {
    userData: data as UserData,
    isLoading: !error && !data,
    isError: error,
    update: update,
  };
};

export type UseUserDataResponse = {
  userData: UserData | undefined;
  isLoading: boolean;
  isError: boolean;
  update: (newUserData: UserData | undefined) => Promise<void>;
};
