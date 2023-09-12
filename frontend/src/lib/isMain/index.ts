const isMain = !!(process.env.VERCEL_GIT_COMMIT_REF === `main`);

export default isMain;
