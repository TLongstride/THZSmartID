// Zigbee2MQTT device definition for THZSmartID
// This file is used to define the device's capabilities, exposes, and converters.

// Version: 1.0 - 03/11/2025 - Initial release
// Version: 1.1 - 10/11/2025 - Added list of supported commands

// License: Creative Commons BY-NC 4.0
// Author: THED&Co


import {access, presets} from "zigbee-herdsman-converters/lib/exposes";
import {bind} from "zigbee-herdsman-converters/lib/reporting";

const fzLocal = {
    THZRead: {
        cluster: "genMultistateValue",
        type: ["attributeReport", "readResponse"],
        convert: (model, msg, publish, options, meta) => {
            let data = msg.data.stateText;
            if (typeof data === "object") {
                let bHex = false;
                let code;
                let index;
                for (index = 0; index < data.length; index += 1) {
                    code = data[index];
                    if (code < 32 || code > 127) {
                        bHex = true;
                        break;
                    }
                }
                if (!bHex) {
                    data = data.toString("latin1");
                } else {
                    // data = [...data];
                    data = Buffer.from(data).toString("ascii");
                }
            }

            // Si `data` est une chaîne JSON, on la parse
            let parsedData;
            try {
                parsedData = JSON.parse(data);
            } catch {
                meta.logger.debug(`Failed to parse data: ${data}`);
            }

            // Retourne les propriétés spécifiques
            return {
                tag: parsedData.tag,
                type: parsedData.type,
                uid: parsedData.uid,
            };
        },
    },
};

const tzLocal = {
    THZWrite: {
        key: ["action", "command"],
        convertSet: async (entity, key, value, meta) => {
            if (!value) {
                return;
            }
            const payload = {14: {value, type: 0x42}};
            for (const endpoint of meta.device.endpoints) {
                const cluster = "genMultistateValue";
                if (endpoint.supportsInputCluster(cluster) || endpoint.supportsOutputCluster(cluster)) {
                    await endpoint.write(cluster, payload);
                    return;
                }
            }
            await entity.write("genMultistateValue", payload);
        },
    },
};

export default {
    zigbeeModel: ["THZSmartID"],
    model: "THZSmartID",
    vendor: "THEDandCo",
    description: "RFID reader for alarm systems",
    fromZigbee: [fzLocal.THZRead],
    toZigbee: [tzLocal.THZWrite],
    exposes: [
        presets.binary("tag", access.STATE, true, false).withDescription("Tag present status (e.g., true, false)"),
        presets.text("type", access.STATE).withDescription("Type of the read RFID tag"),
        presets.text("uid", access.STATE).withDescription("UID of the read RFID tag"),
        presets.enum("command", access.STATE_SET, ["OFF", "ACCEPTED", "REFUSED", "ACCEPTED_MUTED", "REFUSED_MUTED", "ARMING", "ARMED", "PARTIAL", "DISARMED"]).withDescription("Send command to device"),

    ],
    configure: async (device, coordinatorEndpoint, definition) => {
        const endpoint = device.getEndpoint(1);

        if (endpoint) {
            await bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await endpoint.read("genBasic", ["modelId", "swBuildId", "powerSource"]);
        }
    },
};
