export function commandResponseToObject(command, response) {
    if (command.indexOf('AT') >= 0) {
        return [obtainATCommandData(command, response)]; //response
    }

    return obtainOBDCommandData(response);
}

/**
 *
 * @param command
 * @param data
 */
function obtainATCommandData(command, data) {
    switch (command) {
        case "AT RV":
            return {
                voltage: data[0].replace('AT RV', '')
            }
    }
}

/**
 *
 */
function obtainOBDCommandData(data) {
    return data.reduce((acc, response) => {
        const bytes = response.split(' ');

        if (bytes.length > 2) {
            const mode = bytes[0];
            const pid = bytes[1];
            const payload = bytes.slice(2);

            switch (mode) {
                case "41":
                    const mode01Data = parseMode01(pid, payload);

                    if (mode01Data) {
                        return [
                            ...acc,
                            mode01Data
                        ];
                    }
                    break;
                case "61":
                    const mode21Data = parseMode21(pid, payload);

                    if (mode21Data) {
                        return [
                            ...acc,
                            mode21Data
                        ];
                    }
                    break;
            }
        }

        return acc;
    }, []);
}

function parseMode01(pid, data) {
    switch (pid) {
        case "05":
            return {
                temperature: parseInt(data[0], 16) - 40
            };
        case "0C":
            return {
                rpm: parseInt(data[0] + data[1], 16) / 4
            };
        case "0D":
            return {
                speed: parseInt(data[0], 16)
            };
        default:
            return null;
    }
}

function parseMode21(pid, data) {
    switch (pid) {
        case "01": {
            if (data.length === 3) {
                return {
                    gear: obtainGear(parseInt(data[0], 16))
                };
            }
        }
    }

    return null;
}

function obtainGear(rawGear) {
    switch (rawGear) {
        case 0:
            return "1";
        case 1:
            return "2";
        case 2:
            return "3";
        case 4:
            return "D";
        case 5:
            return "N";
        case 6:
            return "R";
        case 7:
            return "P";
        default:
            return "E";
    }
}