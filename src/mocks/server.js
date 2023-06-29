/** @format */

import { setupServer } from "msw/node";
import { handlers, handlerEpisode } from "./handler";

//setupServer is a fn create request interception layer in node js

// this configure a request mocking with the given request handlers
export const server = setupServer(...handlers, ...handlerEpisode);
