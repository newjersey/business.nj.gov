import useSWR from "swr";
import {useContext, useEffect, useState} from "react";
import * as api from "@/lib/api-client/apiClient";
import { postUserData } from "@/lib/api-client/apiClient";
import {UserData, UserDataError} from "@/lib/types/types";
import { AuthContext } from "@/pages/_app";

export const useUserData = (): UseUserDataResponse => {
  const { state } = useContext(AuthContext);
  const [userDataError, setUserDataError] = useState<UserDataError | undefined>(undefined)
  const { data, error, mutate } = useSWR<UserData | undefined>(state.user?.id || null, api.getUserData);

  useEffect(() => {
    console.log(error, userDataError, data)
    if (userDataError === "UPDATE_FAILED") {
      return;
    }

    if (error && data) {
      setUserDataError("CACHED_ONLY")
    } else if (error && !data) {
      setUserDataError("NO_DATA")
    } else if (!error) {
      setUserDataError(undefined)
    }
  }, [error, data])

  const update = async (newUserData: UserData | undefined): Promise<void> => {
    if (newUserData) {
      mutate(newUserData, false);
      return postUserData(newUserData)
        .then(() => {
          console.log('post succeeded')
          setUserDataError(undefined)
          mutate(newUserData);
        })
        .catch(() => {
          setUserDataError("UPDATE_FAILED")
          return Promise.reject();
        })
    }
  };

  console.log(userDataError)

  return {
    userData: data as UserData,
    isLoading: !error && !data,
    error: userDataError,
    update: update,
  };
};

export type UseUserDataResponse = {
  userData: UserData | undefined;
  isLoading: boolean;
  error: UserDataError | undefined;
  update: (newUserData: UserData | undefined) => Promise<void>;
};
