DIR="$(dirname ${BASH_SOURCE[0]})"
cd $DIR
cd ..
npm run test
npm shrinkwrap
npm run docs
npm run build
source ./dev/gitano.sh
gitanoaddfiles README.md package.json npm-shrinkwrap.json src/* test/* dist/* dev/*
gitanopush