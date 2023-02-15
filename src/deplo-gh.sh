#! C:\software\Git\bin\bash
npm run docs:build
cd ./src/.vuepress/dist
git config --global user.email "1241236275@qq.com"
git config --global user.name "zql"

git add -A
git commit -m "update"

git push -f https://github.com/Echoidf/mynotes.git
