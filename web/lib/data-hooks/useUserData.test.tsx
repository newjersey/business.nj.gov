import { useUserData, UseUserDataResponse } from "./useUserData";
import { generateUseUserDataResponse, renderWithUser } from "@/test/helpers";
import { BusinessUser } from "@/lib/types/types";
import * as api from "@/lib/api-client/apiClient";
import { generateUser, generateUserData } from "@/test/factories";
import {act, RenderResult} from "@testing-library/react";
import {awaitExpression} from "@babel/types";

jest.mock("@/lib/api-client/apiClient", () => ({
  getUserData: jest.fn(),
  postUserData: jest.fn(),
}));
const mockApi = api as jest.Mocked<typeof api>;

describe("useUserData", () => {

  let subject: RenderResult;

  beforeEach(() => {
    jest.resetAllMocks()
  })

  const setupHook = (currentUser: BusinessUser | undefined): UseUserDataResponse => {
    const returnVal = generateUseUserDataResponse({});
    function TestComponent() {
      Object.assign(returnVal, useUserData());
      return <>
          <div data-testid={`error-${returnVal.error}`}/>
        </>;
    }
    subject = renderWithUser(<TestComponent />, { user: currentUser });
    return returnVal;
  };

  describe("when there is no current user", () => {
    it("does not call to get user data", () => {
      setupHook(undefined);
      expect(mockApi.getUserData).not.toHaveBeenCalled();
    });
  });

  describe("when there is a current user", () => {
    it("uses user id to get user data", () => {
      const currentUser = generateUser({});
      setupHook(currentUser);
      expect(mockApi.getUserData).toHaveBeenCalledWith(currentUser.id);
    });

    it("posts new user data when calling update", async () => {
      const currentUser = generateUser({});
      mockApi.postUserData.mockResolvedValue(generateUserData({}))

      const { update } = setupHook(currentUser);
      const newUserData = generateUserData({});
      await act(() => update(newUserData));
      expect(mockApi.postUserData).toHaveBeenCalledWith(newUserData);
    });

    it('returns NO_DATA error when api call fails with no cache', async () => {
      const currentUser = generateUser({});
      const rejectedPromise = Promise.reject(500)
      mockApi.getUserData.mockReturnValue(rejectedPromise)
      const result = setupHook(currentUser);

      await act(() => rejectedPromise.catch(() => {}))

      expect(result.error).toEqual("NO_DATA")
      expect(result.userData).toEqual(undefined)
    })

    it('returns CACHED_ONLY error when api call fails with cache', async () => {
      const currentUser = generateUser({});

      const resolvedPromise = Promise.resolve(generateUserData({}))
      mockApi.getUserData.mockReturnValue(resolvedPromise)
      const {update} = setupHook(currentUser);
      await act(() => resolvedPromise)

      const rejectedPromise = Promise.reject(500)
      mockApi.getUserData.mockReturnValue(rejectedPromise)

      const newUserData = generateUserData({})
      mockApi.postUserData.mockResolvedValue(newUserData)
      update(newUserData);

      const result = setupHook(currentUser);
      await act(() => rejectedPromise.catch(() => {}))

      expect(result.error).toEqual("CACHED_ONLY")
      expect(result.userData).toEqual(newUserData)
    })

    it('returns UPDATE_FAILED error when update function rejects', async () => {

        const currentUser = generateUser({});
      const rejectedPromise = Promise.reject(400)
      const resolvedPromise = Promise.resolve(generateUserData({}))

      mockApi.getUserData.mockReturnValue(resolvedPromise)
      mockApi.postUserData.mockReturnValue(rejectedPromise)

      const {update} = setupHook(currentUser);
      const newUserData = generateUserData({})
      update(newUserData)

      await act(() => rejectedPromise.catch(() => {}))
      expect(subject.getByTestId("error-UPDATE_FAILED")).toBeInTheDocument()

    })
  });
});
