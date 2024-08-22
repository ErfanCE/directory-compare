const { shallow, deep } = require('./compare');
const [, , format, firstDirPath, secondDirPath] = process.argv;

const main = async () => {
  if (format === '--shallow' || format === '-s') {
    console.info(await shallow(firstDirPath, secondDirPath));
  } else if (format === '--deep' || format === '-d') {
    console.info(await deep(firstDirPath, secondDirPath));
  } else {
    console.log('use --shallow(-s) or --deep(-d) command for comparing');
  }
};

main().catch((err) => {
  if (format === '--shallow' || format === '-s') {
    const errorMessage = err.message.replace('{%FORMAT%}', 'SHALLOW');
    console.error(errorMessage);
  } else if (format === '--deep' || format === '-d') {
    const errorMessage = err.message.replace('{%FORMAT%}', 'DEEP');
    console.error(errorMessage);
  } else {
    console.error(err.message);
  }
});
