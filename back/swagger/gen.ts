import path from "path";
import sta from "swagger-typescript-api";

sta
  .generateApi({
    url: path.resolve(__dirname, "swagger.yaml"),
    name: "myApi.ts",
  })