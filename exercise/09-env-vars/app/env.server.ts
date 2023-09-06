import invariant from "tiny-invariant";

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}

export const getEnv = () => {
  invariant(process.env.ADMIN_EMAIL, "ADMIN_EMAIL is not set");

  return {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  };
};

export type ENV = ReturnType<typeof getEnv>;
