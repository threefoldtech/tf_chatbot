/* Append font awesome url in head so it works with web components */
const iconsLink = document.createElement("link");
iconsLink.rel = "stylesheet";
iconsLink.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css";
document.head.append(iconsLink);

/* Import the entry chat component */
import "./Chatbot.svelte";
