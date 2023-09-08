import {AVALANCHE_NETWORK_PARAMS} from "../constant/blockchain";
import { Buffer } from 'buffer'
import * as IPFS from "ipfs-core";

export const hexToNumber = (hexString) => parseInt(hexString, 16);
export const hexDateToUnixNumber = (hexString) => parseInt(hexString, 18);
export const numberToHex = (num) => num.toString(16);
export const convertBigIntToNumber = (value) => parseInt(value) / Math.pow(10, 18);

export const isAvalancheChain = (chainId) => chainId?.toLowerCase() === AVALANCHE_NETWORK_PARAMS?.chainId?.toLowerCase();

export const getIpfsClient = async () => {
    const auth =
        "Basic " +
        Buffer.from(process.env.REACT_APP_IPFS_PROJECT_ID + ":" + process.env.REACT_APP_IPFS_KEY).toString("base64");

    return IPFS.create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
            authorization: auth,
        },
    });
};
