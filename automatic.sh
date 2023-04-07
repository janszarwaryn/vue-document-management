
npm run build

cd build

git pull origin main

rm -R css img js favicon.ico index.html

cd ..

cp -R dist/* build

cd build

git add --all
git commit -m "publikuj$(date +"%Y_%m_%d_%I_%M")"
git push origin main
