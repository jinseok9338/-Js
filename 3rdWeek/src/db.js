import mongoose from "mongoose";

export default {
  connect: () => {
    // docker-compose 파일에서 environment를 통해 정의된 DB_HOST와 DB를 사용할 수 있습니다.
    mongoose
      .connect(
        `mongodb://${process.env.DB_HOST || "localhost"}:27017/${
          process.env.DB
        }`
      )
      .catch(console.log);
  },
};
