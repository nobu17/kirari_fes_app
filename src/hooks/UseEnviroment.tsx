export default function useEnviroment() {
  const getEnv = (key: string): string | undefined => {
    return process.env[key];
  };

  return {
    getEnv,
  };
}
