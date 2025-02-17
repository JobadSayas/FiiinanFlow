export const version = "3.0";

export const user = "demo";
// original / demo / client

let selected_URL;

switch (user) {
  case "original":
    selected_URL = 'https://fiiinanflow.visssible.com/backend';
    break;
  case "demo":
    selected_URL = 'https://fiiinanflow-demo.visssible.com/backend';
    break;
  case "sharon":
    selected_URL = 'https://fiiinanflow-client.visssible.com/backend';
    break;
}

export const API_URL = selected_URL;