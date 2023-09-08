import io from "socket.io-client";

export function socketProvider() {
    try {
        // eslint-disable-next-line no-undef
        const BASE_URL = process.env.REACT_APP_API || window?.location?.origin;
        const socket = io(BASE_URL, {
            path: process.env.NODE_ENV === 'development' ? '/ws' : "/api/ws",
            transportOptions: {
                polling: {
                    extraHeaders: {
                        "X-USER-TOKEN": JSON.parse(localStorage.getItem("token")),
                    },
                },
            },
        });

        return {
            addListener: (callback = null) => {
                try {
                    socket.on("events", (data) => {
                        if (callback) callback(data);
                    });
                } catch (err) {
                    console.warn("Socket addListener: ", JSON.stringify(err));
                }
            },
        };
    } catch (err) {
        console.warn("Socket: ", JSON.stringify(err.message));
        return null;
    }
}
