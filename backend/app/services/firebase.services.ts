import appRootPath from "app-root-path";
import path from "path";
import admin from "firebase-admin";

const rootDir = appRootPath.path;

const serviceAccount = path.join(
  rootDir,
  "app",
  "configs",
  "firebase-admin.json"
);

const firebaseAdminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default firebaseAdminApp;