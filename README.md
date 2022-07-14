# TF_Chatbot
Threefold chatbot was created to be used as an easy to ship chatbot in any of our projects.

## Serve app
```sh
git clone git@github.com:threefoldtech/tf_chatbot.git
cd tf_chatbot
yarn install
yarn dev
```

## Build app
```sh
yarn build
```

## Use Chatbot in an external project
1. Build project
2. Move **tf_chatbot.js** in `/public/build/` into your project
3. Import **tf_chatbot.js**
```html
<script defer src="/tf_chatbot.js"></script>
```
4. Use `<tf-chatbot></tf-chatbot>` inside your html anywhere.