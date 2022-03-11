// Specific for DSAL
const fs = require('fs');

const writeFile = fs.writeFile;

const targetPath = './src/environments/environment.ts';

const env = require('dotenv').config();

const envConfigFile = `export const environment = ${JSON.stringify(env.parsed, null, 2)}`;
console.log('The file `environment.ts` will be written with the following content: \n');
console.log(envConfigFile);
writeFile(targetPath, envConfigFile, (err: any) => {
   if (err) {
       throw console.error(err);
   } else {
       console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
   }
});
