import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { contract } from "@repo/api-client";

const initTsr = initTsrReactQuery(contract, {
  baseUrl: "http://localhost:8000",
});

export default initTsr;
