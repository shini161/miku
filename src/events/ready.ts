import { Event } from "../structures/Event";
import { client } from "..";

export default new Event("ready", () => {
  client.user.setStatus("online");
  console.log(`${client.user.tag} is ready!`);

  client.user.setPresence({
    activities: [
      {
        name: "/help",
        type: "PLAYING",
      },
    ],
  });
});
