'use strict';
const findUp = require('./find-up');
const sync = cwd => findUp.sync('package.json', {cwd});

export default cwd => findUp('package.json', {cwd});
export { sync }
