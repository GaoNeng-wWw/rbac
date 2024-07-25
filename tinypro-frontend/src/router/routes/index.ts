const modules:Record<string, any> = import.meta.glob('./modules/*.ts', { eager: true });
const appRoutes: any[] = [];

Object.keys(modules).forEach((key) => {
  const defaultModule = modules[key].default;
  if (!defaultModule) return;
  const moduleList = Array.isArray(defaultModule)
    ? [...defaultModule]
    : [defaultModule];
  appRoutes.push(...moduleList);
});

export default appRoutes;
