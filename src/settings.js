// Detect whether the app is being rendered on the client or on the server
// eslint-disable-next-line no-undef
const creatingBuild = typeof buildSettings !== typeof undefined;
// eslint-disable-next-line no-undef, jsx-control-statements/jsx-jcs-no-undef
const env = creatingBuild ? buildSettings.env : process.env;

export const useServerRendering = false;
export const isServer = !creatingBuild && env.NODE_ENV !== 'test';
export const isClient = !isServer;

// When building static files, this can be set to false
export const isDev = true;
