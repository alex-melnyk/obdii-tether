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
    return data.reduce((acc, response) => {
        switch (command) {
            case "AT RV":
                return {
                    ...acc,
                    voltage: response
                }
        }
        return acc;
    }, {});
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
    }

    return null;
}