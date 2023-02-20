import { service } from "./api-settings";

export default class Api {
  static async testGetRequest(columnTitle) {
    try {
      return await service({
        url: `/cars/index`,
        method: "GET",
        params: { sort: columnTitle },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
