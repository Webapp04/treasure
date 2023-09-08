import {socketProvider} from "./providers/socket";

export function syncProvider() {
    return socketProvider();
}
