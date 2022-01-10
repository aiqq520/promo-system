const DOMAIN = {
  dev: '//47.110.67.16',
  test: '//47.110.67.16',
  prod: '//47.110.67.16'
}

// const prePath = '/v2/api-docs';
const serverHost = `${DOMAIN[process.env.UMI_ENV]}`
export default serverHost;
