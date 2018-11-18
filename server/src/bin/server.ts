import startServer from 'src/app';
import {initDbConnection} from 'src/db-connection';

export const PORT = 4000;

(function() {
  initDbConnection().then(() => {
    startServer().then(({app, server}) => {
      app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
      });
    });
  });
})();